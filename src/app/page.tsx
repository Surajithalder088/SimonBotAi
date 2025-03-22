'use client'

import Image from "next/image";
import Navbar from "./component/navbar/page";
import Chatlist from "./component/chatlist/page";
import MessageBox from "./component/mesageBox/page";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { clearMessages, removeChat } from "@/lib/features/messagesSlice";


export default function Home() {
  const id:any=useSelector((state:any)=>state.users.id)
  const dispatch=useDispatch()
  useEffect(() => {
   console.log("id:",id);
   
   dispatch(clearMessages())
   dispatch(removeChat())
  }, [])
  
  return (
    <Provider store={store}>
    <div className="w-[100vw] flex flex-col justify-between items-stretch">
      
      <Navbar/>
      <Chatlist/>
      <MessageBox/>
      
    </div>
    </Provider>
  );
}
