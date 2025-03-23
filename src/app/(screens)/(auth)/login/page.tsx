'use client'

import { login } from '@/api/userApi'
import { clearMessages, removeChat } from '@/lib/features/messagesSlice'
import { loginUser } from '@/lib/features/userSlice'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'


const Login = () => {
    const [email,setEmail]=useState<string>('')
    const [password,setPasssword]=useState<string>('')
    const[loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const router=useRouter()

    const submitHandler=async(e:React.FormEvent)=>{
        e.preventDefault()
        try {setLoading(true)
             const response=await login({email,password})
        console.log(response);
        if(response.status!==200){
            toast.error('Failed to login')
            router.push('/register')
            setLoading(false)
            return
        }
        dispatch(loginUser({email:response.user?.email,id:response.user?.id}))
        toast.success("Login successfully")
        router.push('/')
        dispatch(clearMessages())
        dispatch(removeChat())


        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Error generated")
        }
       
        
        
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
            <p className='text-2xl'>Login</p>
            <form className='flex flex-col items-center' >
                <input className='p-3 outline-none' placeholder='enter email' type='email'
                 value={email} onChange={emailChange}/>
                <input className='p-3 outline-none' placeholder='enter password' type='password'
                 value={password} onChange={passwordChange}/>
                <button className='w-fit bg-blue-300 p-2 rounded-md' onClick={submitHandler}>
                    
                    {loading?
                    ( <Loader2 className='animate-spin text-gray-800' size={30}/>):"Login"}</button>
            </form>
            <p>New user? <Link href='/register' className='text-indigo-400'>register</Link> </p>
        </div>
    </div>
  )
}

export default Login