'use client'

import Image from "next/image";
import Navbar from "./component/navbar/page";
import Chatlist from "./component/chatlist/page";
import MessageBox from "./component/mesageBox/page";

export default function Home() {
  return (
    <div className="w-[100vw] flex flex-col justify-between items-stretch">
      <Navbar/>
      <Chatlist/>
      <MessageBox/>
    </div>
  );
}
