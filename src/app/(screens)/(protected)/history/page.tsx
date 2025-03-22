'use client'

import { AllChats } from '@/api/messagesApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Chat } from '@prisma/client'

type Props = {}
type obj={id:number,string:string}
const arr:obj[]=[
  {id:1,string:"react native styling 1"},
  {id:2,string:"react native styling 2"},
  {id:3,string:"react native styling 3"},
  {id:4,string:"react native styling 4"},
  {id:5,string:"react native styling 5"},
  {id:6,string:"react native styling 6"}]

const History = (props: Props) => {
  
  const navigate=useRouter()
  const[search,setSearch]=useState("")
  const [chats,setChats]=useState<any>([])
 
  const id:string=useSelector((state:any)=>state.users.id)

  const fetchingChats=async(userId:string)=>{
    try{
        const res=await AllChats(userId)
  console.log(res);
  setChats(res.chats)
    }catch(err){
      console.log();
      toast.error("failed to load all chatlists")
    }
   
  }

  useEffect(() => {
   console.log("id:",id);
   if(id===""){
    navigate.push('/login')
   }
  let userId=id
  fetchingChats(userId)
   
  }, [])
  const searchhandle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }
  const filterArray=search===""?chats:chats.filter(item=>item.title?.includes(search))
  
  return (
    <div>
    <Toaster position='top-right'/>
      <div className='flex items-center justify-around w-full top-0 fixed h-[80px] bg-white'>
        <div className='flex items-center bg-gray-200 p-2 rounded-xl'>
          <img src='/search-line.png'/>
          <input className='outline-none p-4' value={search} onChange={searchhandle} placeholder='search...'/>
        </div>
        <div className='' onClick={()=>navigate.push('/')}><img src='/home-2-fill.png'/></div>
      </div>
      <div className='p-3 flex flex-col items-center gap-3 mt-[80px] h-screen '>
    {
      filterArray.map(i=>< div key={i.id} className='bg-gray-200 w-full p-4'
      onClick={()=>navigate.push(`/chat/${i.id}`)}
      >{i.title}</div>)
    }
        
      </div>
    </div>
  )
}

export default History