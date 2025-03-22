'use client'

import { registerUser } from '@/api/userApi'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

type Props = {}

const Register = (props: Props) => {
       const [email,setEmail]=useState("")
        const [password,setPasssword]=useState("")
        const[name,setName]=useState("")
        const[load,setLoad]=useState(false)
        const route=useRouter()
    
        const submitHandler=async(e:React.FormEvent)=>{
           e.preventDefault()
          
          try {
            setLoad(true)
            const res=await registerUser({name,email,password})
           console.log(res);
           if(res.status!==201){
            toast.error("Failed")
            setLoad(false)
            return
           }
           toast.success("Registered")
           route.push('/login')
          } catch (error) {
            console.log(error);
            setLoad(false)
            
          }
           
           
            
        }
        const nameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setName(e.target.value)
        }
        const emailChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setEmail(e.target.value)
        }
        const passwordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setPasssword(e.target.value)
        }
  return (
    <div className='w-full h-[100vh] flex items-center  justify-center'>
      <Toaster position='top-left'/>
        <div className='min-w-fit min-h-fit flex flex-col items-center mt-[10%] p-10 border rounded-md shadow-2xs'>
            <p className='text-2xl'>Register</p>
            <form className='flex flex-col items-center'>
            <input className='p-3 outline-none' placeholder='enter fullname' type='text'
            value={name} onChange={nameChange}/>
                <input className='p-3 outline-none' placeholder='enter email' type='email'
                value={email} onChange={emailChange}/>
                <input className='p-3 outline-none' placeholder='enter password' type='password'
                value={password} onChange={passwordChange}/>
                <button className='w-fit bg-blue-300 p-2 rounded-md' onClick={submitHandler}>
                 {load?(<Loader2 className='animate-spin text-gray-800' size={30}/>):"Register"}</button>
            </form>
            <p>Have account? <Link href='/login' className='text-indigo-400'>login</Link> </p>
        </div>
    </div>
  )
}

export default Register