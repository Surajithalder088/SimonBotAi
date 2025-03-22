'use client'

import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Shape from './shape'
import { generateCreativePrompt } from '@/api/aiHandle'
import { useDispatch,useSelector } from 'react-redux'
import { addNewMessage, clearMessages, initChat } from '@/lib/features/messagesSlice'
import { RootState } from '@/lib/store/store'
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition"
import toast, { Toaster } from 'react-hot-toast'
import { newChat, newMessage } from '@/api/messagesApi'

type Props = {}

const MessageBox = (props: Props) => {
    const[mode,setMode]=useState<"voice"|"text">('voice')
    const[isSpeaking,setIsSpeaking]=useState(false)
    const[searchMessage,setSearchMessage]=useState<string |any>("")
    const dispatch=useDispatch()
    const chatid:string=useSelector((state:any)=>state.messages?.chatid)
    const userid:string=useSelector((state:any)=>state.users.id)
   
    

    const {transcript,listening,resetTranscript,browserSupportsSpeechRecognition}=useSpeechRecognition()

    const startVoice=async()=>{
        setIsSpeaking(true)
        const audio=new Audio('/noti-ring.mp3')
        await audio.play()
        if(!browserSupportsSpeechRecognition)
            {
                alert("your browser does not suport sppech recognition")
                return
            }
            resetTranscript()
            SpeechRecognition.startListening({continuous:true})
        
        
    }

const inputhandle=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setSearchMessage(e.target.value)
}


const sendHalder=async(search:string)=>{

console.log("user:",userid);

    dispatch(addNewMessage({author:"user",content:search,time:Date.now().toString()}))
    if(chatid==="" ||userid===""){
        console.log('chat id:',chatid);
        
       const res= await newChat({userid,title:search})
       if(res.status!==201){
        toast.error("Authentication error")
        dispatch(clearMessages())
        console.log("chat res:",res);
        return
       }
       console.log("chat res:",res);
       
        dispatch(initChat(res.chat?.id))
        

    }
    
    let chid:any=chatid
    const res=await newMessage({chatid:chid,sender:"user",body:search})
    if(res.status!==200){
        console.log("chat id",chatid);
        
        console.log(res);
        
        toast.error("Failed to save ,try again")
        dispatch(clearMessages())
        return
    }
    console.log(res);
    
     setSearchMessage("")

try {
    const response= await generateCreativePrompt(search)
   
    if(!response){
        toast.error("ai is nuable to respond")
        return
    }
       
       console.log(response);
       const resText=response.jsonData
       dispatch(addNewMessage({author:"ai",content:resText,time:Date.now().toString()}))
       const res=await newMessage({chatid:chid,sender:"ai",body:resText})
    if(res.status!==200){
        console.log(chatid);
        
        console.log(res);
        
        toast.error("Failed to save message in database")
        
        return
    }
    console.log(res);


} catch (error) {
    setSearchMessage("")
    console.log(error);
    
}
       
  }

  const stopVoice=()=>{
    SpeechRecognition.stopListening();
    resetTranscript()
    setIsSpeaking(false)
  }

  const savedToText=async()=>{
   if(!transcript){
    toast.error("voice not get")
    return
   }
    console.log(transcript);
 if(transcript===""){
    console.log("voice is not read",transcript);
    resetTranscript()
    setIsSpeaking(false)
    return
 }
 setIsSpeaking(false)
   await sendHalder(transcript)
   resetTranscript()
   
  }
    
  return (
    
   
    <div className='bg-cyan-50 bottom-0 left-0 fixed w-full h-[80px] border-t rounded-t-lg'>
        <Toaster position='top-left'/>

       {
        mode==='voice'?(
            <div className='flex items-center justify-around'>
                {
                    isSpeaking===true? <button className='p-3 mt-2' onClick={stopVoice}><img className='w-8 h-8' src='/delete.png'/></button>:
                    <button className='p-3 mt-2' onClick={()=>setMode('text')}><img className='w-8 h-8' src='/text-editor.png'/></button>
                }
               
              {
              isSpeaking?  <div className='w-18 h-18' onClick={()=>setMode('text')}>
                <Canvas>
          <Shape/>
        </Canvas>
                </div>:<div className='w-8 h-8 bg-blue-800 rounded-full'><img src='/speaker.png'/></div>}

                {
                    isSpeaking===false?<button className='p-3 mt-2' onClick={()=> startVoice()}><img className='w-8 h-8' src='/voice-recorder.png'/></button>
                    :<button className='p-3 mt-2' onClick={savedToText}><img className='w-8 h-8' src='/send (1).png'/></button>
                }
                
            </div>
        ):(
            <div className='flex items-center justify-between'>
           
            <textarea className='w-[100%] m-2 p-2 outline-none focus:outline focus:ring-2'
            value={searchMessage} onChange={inputhandle}
            placeholder='Write a message..'></textarea>
            
            <div className='flex items-center justify-between'>
                <button className='m-2 p-2 bg-blue-400 w-10 h-8 flex items-center justify-center rounded-md' onClick={()=>setMode('voice')}>
             <img className='w-6 h-6' src='/microphone.png'/>
             
                </button>
                <button
                onClick={()=>sendHalder(searchMessage)}
                className='m-2 p-2 bg-blue-400 w-10 h-8 flex items-center justify-center rounded-md'><img className='w-6 h-6' src='/send.png'/></button>
            </div>

        </div>
        )
       }

        
    </div>
    
  )
}

export default MessageBox