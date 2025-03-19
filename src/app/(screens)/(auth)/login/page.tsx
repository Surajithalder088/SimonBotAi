'use client'

import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const Login = (props: Props) => {
    const [email,setEmail]=useState("")
    const [password,setPasssword]=useState("")

    const submitHandler=()=>{
       // e.preventdefault()
        alert('login')
        console.log(email,password);
        
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
            <p className='text-2xl'>Login</p>
            <form className='flex flex-col items-center' >
                <input className='p-3 outline-none' placeholder='enter email' type='email'
                 value={email} onChange={emailChange}/>
                <input className='p-3 outline-none' placeholder='enter password' type='password'
                 value={password} onChange={passwordChange}/>
                <button className='w-fit bg-blue-300 p-2 rounded-md' onClick={submitHandler}>Login</button>
            </form>
            <p>New user? <Link href='/register' className='text-indigo-400'>register</Link> </p>
        </div>
    </div>
  )
}

export default Login