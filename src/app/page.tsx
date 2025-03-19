'use client'

import Image from "next/image";
import Navbar from "./component/navbar/page";
import Chatlist from "./component/chatlist/page";
import MessageBox from "./component/mesageBox/page";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

export default function Home() {
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
