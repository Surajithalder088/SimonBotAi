'use client'

import { AllChats } from '@/api/messagesApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
  const id:string=useSelector((state:any)=>state.users.id)

  const fetchingChats=async(userId:string)=>{
     const res=await AllChats(userId)
  console.log(res);
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
  const filterArray=search===""?arr:arr.filter(item=>item.string.includes(search))
  
  return (
    <div>
      <div className='flex items-center justify-around w-full top-0 fixed h-[80px] bg-white'>
        <div className='flex items-center bg-gray-200 p-2 rounded-xl'>
          <div>---</div>
          <input className='outline-none p-4' value={search} onChange={searchhandle} placeholder='search...'/>
        </div>
        <div className='' onClick={()=>navigate.push('/')}>home</div>
      </div>
      <div className='p-3 flex flex-col items-center gap-3 mt-[80px] h-screen '>
    {
      filterArray.map(i=>< div key={i.id} className='bg-gray-200 w-full p-4'>{i.string}</div>)
    }
        
      </div>
    </div>
  )
}

export default History