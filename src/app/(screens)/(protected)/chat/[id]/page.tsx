'use client'

import Chatlist from '@/app/component/chatlist/page'
import MessageBox from '@/app/component/mesageBox/page'
import Navbar from '@/app/component/navbar/page'
import { useParams } from 'next/navigation'
import React, {  useEffect} from 'react'
import { Provider, useDispatch } from "react-redux";
import { store } from "@/lib/store/store";
import { allMessages } from '@/api/messagesApi'

import toast, { Toaster } from 'react-hot-toast'
import { addNewMessage, clearMessages, initChat } from '@/lib/features/messagesSlice'



const Chat = () => {
    const {id}=useParams()
const chatid:string|any=(id)
const dispatch=useDispatch()



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
        list?.forEach(item=>{
          
          console.log(item,item.id);
          dispatch(addNewMessage({author:item.sender,content:item.body,time:Date.now().toString()}))
          
        })
       
        
      } catch (error) {
        toast.error("Error")
        console.log(error);
        
      }
      
        
    }

  


    useEffect(() => {
   console.log(chatid);
   dispatch(clearMessages())
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