'use client'

import { registerUser } from '@/api/userApi'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const Register = (props: Props) => {
       const [email,setEmail]=useState("")
        const [password,setPasssword]=useState("")
        const[name,setName]=useState("")
    
        const submitHandler=async(e:React.FormEvent)=>{
           e.preventDefault()
          
          try {
            const res=await registerUser({name,email,password})
           console.log(res);
          } catch (error) {
            console.log(error);
            
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
        <div className='min-w-fit min-h-fit flex flex-col items-center mt-[10%] p-10 border rounded-md shadow-2xs'>
            <p className='text-2xl'>Register</p>
            <form className='flex flex-col items-center'>
            <input className='p-3 outline-none' placeholder='enter fullname' type='text'
            value={name} onChange={nameChange}/>
                <input className='p-3 outline-none' placeholder='enter email' type='email'
                value={email} onChange={emailChange}/>
                <input className='p-3 outline-none' placeholder='enter password' type='password'
                value={password} onChange={passwordChange}/>
                <button className='w-fit bg-blue-300 p-2 rounded-md' onClick={submitHandler}>Register</button>
            </form>
            <p>Have account? <Link href='/login' className='text-indigo-400'>login</Link> </p>
        </div>
    </div>
  )
}

export default Register