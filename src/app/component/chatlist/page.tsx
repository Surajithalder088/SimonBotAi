'use client'

import React from 'react'
import UserChat from '../userChat/page'
import AiChat from '../aiChat/page'

type Props = {}



const Chatlist = (props: Props) => {
    const messages=[1]

    if(messages.length===0){
        return(
            <div className=' min-h-[100vh-160px] flex-1 flex-wrap items-center overflow-auto mt-[80px] mb-[80px]'>
               
               <div className='font-bold font-sans text-4xl flex items-center justify-center'> How can I help you today?</div>
            </div>
        )
    }
  return (
    <div className='min-h-[100vh-160px] max-h-fit flex-1 flex-wrap  overflow-auto mt-[80px] mb-[80px]'>
      <div>
       <UserChat/>
       <AiChat/>
       <UserChat/>
       <AiChat/>
       <UserChat/>
       <AiChat/>
      </div>
    </div>
  )
}

export default Chatlist