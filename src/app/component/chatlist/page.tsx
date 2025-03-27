'use client'

import React, { useEffect, useRef, useState } from 'react'
import UserChat from '../userChat/page'
import AiChat from '../aiChat/page'
import { useDispatch, useSelector } from 'react-redux'

import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { clearMessages } from '@/lib/features/messagesSlice'
import Speech from "../speech/page"


  /* eslint-disable
@typescript-eslint/no-explicit-any
*/

interface Message {
  author:"user"|"ai",
  content:string,
  time:string
}

const Chatlist = () => {
  const[messageList,setMesageList]=useState<Message[]>([])
  const divRef=useRef<HTMLDivElement |null>(null)
  const bottomRef=useRef<HTMLDivElement |null>(null)
 const navigate=useRouter()
 const dispatch=useDispatch()

    
    const messages:Message[] =useSelector((state:any)=>state.messages.messages)
    const isGenerating=useSelector((state:any)=>state.messages.isGenerating)

    const scrollToBottom=()=>{
      if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:'smooth'})
      }
    }

    const newChat=()=>{
      toast.success("Start new conversation")
      dispatch(clearMessages())
      navigate.push('/')
    }
    useEffect(()=>{
      setMesageList(messages)
     console.log(messages);
     
     
    },[messages])

if(isGenerating){
      scrollToBottom()
     }

     /* eslint-disable
@typescript-eslint/no-explicit-any
*/

    if(messageList.length===0){
        return(
            <div className=' min-h-[100vh-160px] flex-1 flex-wrap items-center overflow-auto mt-[80px] mb-[80px]'>
               <div className='font-bold  font-sans p-5 text-3xl flex gap-4 items-center justify-center text-gray-600'>
                Hii,I am Simon <img className='w-8 h-8' src='/icon.png'/>
                </div>
               <div className='font-bold font-sans p-5 text-2xl flex flex-col gap-4 items-center justify-center text-gray-600'>
                <div className='flex gap-2 items-center'><img className='w-7 h-7' src='/star-fill.png'/> How can I asist you today?</div>
                <span className='m-2'>
                  <ol className='font-normal sm:text-[15px] text-xl sm:text-sm text-gray-400'>
                    <li className='flex items-center gap-2 '>*I can draw image <img className='w-7 h-7' src='/photo.png'/></li>
                    <li className='flex items-center gap-1'>*You can send me voice message <img className='w-7 h-7' src='/speaking.png'/></li>
                    <li className='flex items-center gap-1'>*I store our previous conversations <img className='w-7 h-7' src='/file.png'/></li>
                  </ol>
                </span>
               </div>
               <div className='z-50 ml-2 mt-[10%] text-center text-bold'><Speech/></div>
            </div>
        )
    }
  return (
    <div className='min-h-[100vh-160px] max-h-fit flex-1 overflow-x-auto flex-wrap w-[96vw] pb-[50px]  overflow-auto mt-[80px] mb-[120px]'
     
    >
      <Toaster position='top-left'/>
     
      <button className=' fixed bg-gray-200 w-12 flex items-center justify-center  h-12 rounded-full z-50 bottom-20 ml-[45%]'
      onClick={scrollToBottom}
      >
        <img className='w-8 h-8' src='/arrow-down-line.png'/>
      </button>
      <button className=' fixed bg-gray-50 w-30 border-2 flex items-center justify-center  h-12 rounded-full z-50 bottom-20 ml-[1%]'
      onClick={newChat}
      >
       new chat <img className='w-8 h-8' src='/new-chat.png'/>
      </button>
      <div className='max-w-[96%] overflow-scroll'
     ref={divRef}
      >
        {
          messageList.map((item:Message)=>(
          <div className='max-w-[96%]' key={item.time}>
           { item.author==="user" ?<UserChat content={item.content} time={item.time}/>:
           <AiChat content={item.content} time={item.time}/>}
          
            </div>
           
            )
          )
         
        }
      
      { isGenerating&&<div className='bg-gray-200 w-50 h-30 rounded-b-3xl p-5 rounded-r-3xl ml-3'>
        <Loader2 className='animate-spin text-gray-800 ' size={30}/>
        </div>}
     
       <div ref={bottomRef}/>
      </div>
    </div>
  )
}

export default Chatlist