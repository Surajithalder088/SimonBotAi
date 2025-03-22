'use client'

import React, { useEffect, useState } from 'react'
import UserChat from '../userChat/page'
import AiChat from '../aiChat/page'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'
import { Toaster } from 'react-hot-toast'

type Props = {}

interface Message {
  author:"user"|"ai",
  content:string
  time:string
}

const Chatlist = (props: Props) => {
  const[messageList,setMesageList]=useState([])
    
    const messages:Message[] |any=useSelector((state:any)=>state.messages.messages)
    useEffect(()=>{
      setMesageList(messages)
     console.log(messages);
     
    },[messages])


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
    <div className='min-h-[100vh-160px] max-h-fit flex-1 overflow-x-auto flex-wrap w-[96vw]   overflow-auto mt-[80px] mb-[80px]'>
      <Toaster position='top-left'/>
      <div className='max-w-[96%]'>
        {
          messageList.map((item:Message)=>(
          <div className='max-w-[96%]' key={item.time}>
           { item.author==="user" ?<UserChat content={item.content} time={item.time}/>:
           <AiChat content={item.content} time={item.time}/>}
            </div>
            )
          )
        }
      
       
       
      </div>
    </div>
  )
}

export default Chatlist