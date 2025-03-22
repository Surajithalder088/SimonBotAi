'use client'

import Image from "next/image";
import Navbar from "./component/navbar/page";
import Chatlist from "./component/chatlist/page";
import MessageBox from "./component/mesageBox/page";
import { Provider, useSelector } from "react-redux";
import { store } from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";


export default function Home() {
  const id:any=useSelector((state:any)=>state.users.id)
  useEffect(() => {
   console.log("id:",id);
   
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
