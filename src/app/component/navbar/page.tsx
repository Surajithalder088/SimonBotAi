'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {}



const Navbar = (props: Props) => {
    const navigate=useRouter()
    const[temp,setTemp]=useState(false)

    const historyRender=()=>{
        navigate.push('/history')
    }
    const tempAccess=()=>{
      setTemp(!temp)
      if(temp===true){
        toast.custom("messages will be not saved")
        return
      }
      toast.custom("messages will be saved")
    }
  return (
    <div className='w-[100%] bg-gray-300 h-[80px] border-b-1 fixed top-0 left-0 flex items-center justify-between  '>
        <div className=' m-1 p-2 rounded-4xl hover:bg-gray-400' >
            <button onClick={historyRender}><img className='w-7 h-7' src='/history.png'/></button>
        </div>

        <div className=' m-2 p-2 rounded-4xl hover:bg-gray-400'><img className='w-14 h-14 rounded-lg' src='/icon.png'/></div>
        <div className='flex items-center justify-between w-[20%]'>
        <div className=' m-1  rounded-4xl hover:bg-gray-400' onClick={tempAccess}>
          
        { temp===false? <img className='w-7 h-7' src='/chat-1-line.png'/>
         : <img className='w-7 h-7' src='/chat-1-fill.png'/>
        }
        </div>
        <div className=' mr-2 p-2 rounded-4xl hover:bg-gray-400' onClick={()=>navigate.push('/login')}><img className='w-7 h-7' src='/user-3-fill (1).png'/></div>
        </div>
    </div>
  )
}

export default Navbar