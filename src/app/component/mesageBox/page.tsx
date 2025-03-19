'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Shape from './shape'
import { generateCreativePrompt } from '@/api/aiHandle'
import { useDispatch,useSelector } from 'react-redux'
import { addNewMessage, clearMessages } from '@/lib/features/messagesSlice'
import { RootState } from '@/lib/store/store'

type Props = {}

const MessageBox = (props: Props) => {
    const[mode,setMode]=useState<"voice"|"text">('text')
    const[isSpeaking,setIsSpeaking]=useState(false)
    const[searchMessage,setSearchMessage]=useState("")
    const dispatch=useDispatch()
    const messages=useSelector((state:RootState)=>state.messages)

    const startSound=()=>{
        setIsSpeaking(true)
        dispatch(clearMessages())
        const audio=new Audio('/noti-ring.mp3')
        audio.play()
    }
const inputhandle=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setSearchMessage(e.target.value)
}


const sendHalder=async()=>{


    dispatch(addNewMessage({author:"user",content:searchMessage,time:Date.now().toString()}))

try {
    const response= await generateCreativePrompt(searchMessage)
       setSearchMessage("")
       console.log(response.jsonData.response);
       const resText=response.jsonData.response
       dispatch(addNewMessage({author:"ai",content:resText,time:Date.now().toString()}))
} catch (error) {
    setSearchMessage("")
    console.log(error);
    
}
       
  }
    
  return (
    
    <div className='bg-cyan-50 bottom-0 left-0 fixed w-full h-[80px] border-t rounded-t-lg'>

       {
        mode==='voice'?(
            <div className='flex items-center justify-around'>
                {
                    isSpeaking===true? <button className='p-3 mt-2' onClick={()=>setIsSpeaking(false)}><img className='w-8 h-8' src='/delete.png'/></button>:
                    <button className='p-3 mt-2' onClick={()=>setMode('text')}><img className='w-8 h-8' src='/text-editor.png'/></button>
                }
               
              {
              isSpeaking?  <div className='w-18 h-18' onClick={()=>setMode('text')}>
                <Canvas>
          <Shape/>
        </Canvas>
                </div>:<div className='w-8 h-8 bg-blue-800 rounded-full'><img src='/speaker.png'/></div>}

                {
                    isSpeaking===false?<button className='p-3 mt-2' onClick={()=> startSound()}><img className='w-8 h-8' src='/voice-recorder.png'/></button>
                    :<button className='p-3 mt-2' onClick={()=>setIsSpeaking(false)}><img className='w-8 h-8' src='/send (1).png'/></button>
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
                onClick={sendHalder}
                className='m-2 p-2 bg-blue-400 w-10 h-8 flex items-center justify-center rounded-md'><img className='w-6 h-6' src='/send.png'/></button>
            </div>

        </div>
        )
       }

        
    </div>
  )
}

export default MessageBox