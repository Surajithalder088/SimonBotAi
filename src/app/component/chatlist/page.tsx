'use client'

import React, { useEffect, useRef, useState } from 'react'
import UserChat from '../userChat/page'
import AiChat from '../aiChat/page'
import { useSelector } from 'react-redux'

import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

  /* eslint-disable
@typescript-eslint/no-explicit-any
*/

interface Message {
  author:"user"|"ai",
  content:any
  time:string
}

const Chatlist = () => {
  const[messageList,setMesageList]=useState([])
  const divRef=useRef<HTMLDivElement |null>(null)
  const bottomRef=useRef<HTMLDivElement |null>(null)


    
    const messages:Message[] |any=useSelector((state:any)=>state.messages.messages)
    const isGenerating=useSelector((state:any)=>state.messages.isGenerating)

    const scrollToBottom=()=>{
      if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:'smooth'})
      }
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
               
               <div className='font-bold font-sans p-5 text-4xl flex flex-col items-center justify-center text-gray-600'> How can I help you today?
                <span className='m-2'>
                  <ol className='font-normal text-2xl text-gray-400'>
                    <li>I can draw image</li>
                    <li> I can receive voice message</li>
                    <li>I store our previous conversations</li>
                  </ol>
                </span>
               </div>
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
      
      { isGenerating&&<div className='bg-gray-200 w-50 h-30 rounded-b-3xl rounded-r-3xl ml-3'>
        <Loader2 className='animate-spin text-gray-800' size={30}/>
        </div>}
     
       <div ref={bottomRef}/>
      </div>
    </div>
  )
}

export default Chatlist