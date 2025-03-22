'use client'

import { AllChats, deleteChat } from '@/api/messagesApi'
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
  const [chats,setChats]=useState<Chat[] |any[]>([])
 
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
  const deleteHandle=async(id:any)=>{
    console.log(id.id);
    let chatid:string=id.id
   const res=await deleteChat(chatid)
   if(!res ||res.status!==200){
    toast.error("failed to delete")
    return
   }
   toast.success("deleted")
   navigate.push('/')
    return
  }

  useEffect(() => {
   console.log("id:",id);
   if(id===""){
    navigate.push('/login')
    return
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
        <p className='font-semibold'>Past search tags and conversations:</p>
    {
     chats.length>0&& filterArray.map(i=>< div key={i.id} className='bg-gray-400 w-full flex justify-around p-2'
     
      >
        <p className='bg-gray-300 px-7 rounded-md flex flex-wrap w-[70%] overflow-auto max-h-12'
         onClick={()=>navigate.push(`/chat/${i.id}`)}
        >{i.title}</p> <button
        onClick={()=>deleteHandle({id:i.id})}
        ><img className='w-5 h-5' src='/delete-bin-6-line.png'/>
          </button> </div>)
    }
        
      </div>
    </div>
  )
}

export default History