'use client'

import Chatlist from '@/app/component/chatlist/page'
import MessageBox from '@/app/component/mesageBox/page'
import Navbar from '@/app/component/navbar/page'
import { useParams } from 'next/navigation'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Provider, useDispatch } from "react-redux";
import { store } from "@/lib/store/store";
import { allMessages } from '@/api/messagesApi'
import { Message } from '@prisma/client'
import toast, { Toaster } from 'react-hot-toast'
import { addNewMessage, initChat } from '@/lib/features/messagesSlice'

type Props = {}

const Chat = (props: Props) => {
    const {id}=useParams()
const chatid:string|any=(id)
const dispatch=useDispatch()

const [messages,setMessages]=useState< Message[]|undefined>(undefined)

    const fetchingMesages=async(chatid:string)=>{
      try {
         const res=await allMessages(chatid)
        console.log(res);
        if(res.status!==200){
          toast.error("Failed to get messages")
          return
        }
       const list = res.messages
        console.log("messages are:",list);
        list?.map(item=>{
          console.log(item);
          dispatch(addNewMessage({author:item.sender,content:item.body,time:Date.now().toString()}))
          
        })
       
        
      } catch (error) {
        toast.error("Error")
        console.log(error);
        
      }
      
        
    }

  


    useEffect(() => {
   console.log(chatid);
   dispatch(initChat({chatid:id}))
    
      fetchingMesages(chatid)
    
      
    }, [])
    
  return (
    <Provider store={store}>
    <div className="w-[100vw] flex flex-col justify-between items-stretch">
    <Navbar/>
    <Toaster position='top-left'/>
    <Chatlist/>
    <MessageBox/>
  </div>
  </Provider>
  )
}

export default Chat