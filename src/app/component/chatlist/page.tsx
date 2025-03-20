'use client'

import React, { useEffect, useState } from 'react'
import UserChat from '../userChat/page'
import AiChat from '../aiChat/page'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'

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
               
               <div className='font-bold font-sans text-4xl flex items-center justify-center'> How can I help you today?</div>
            </div>
        )
    }
  return (
    <div className='min-h-[100vh-160px] max-h-fit flex-1 overflow-x-auto flex-wrap w-[96vw]   overflow-auto mt-[80px] mb-[80px]'>
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