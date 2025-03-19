'use client'

import Chatlist from '@/app/component/chatlist/page'
import MessageBox from '@/app/component/mesageBox/page'
import Navbar from '@/app/component/navbar/page'
import { useParams } from 'next/navigation'
import React from 'react'
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

type Props = {}

const Chat = (props: Props) => {
    const {id}=useParams()
  return (
    <Provider store={store}>
    <div className="w-[100vw] flex flex-col justify-between items-stretch">
    <Navbar/>
    <Chatlist/>
    <MessageBox/>
  </div>
  </Provider>
  )
}

export default Chat