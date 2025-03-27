
import React from 'react'



const UserChat = ({content,time}: {content:string ,time:string}) => {

  const number=Number(time)
  const date=new Date(number)
  return (
    <div className='m-1 mr-[] p-2 w-[60vw] flex flex-col justify-end ml-auto h-fit rounded-t-2xl rounded-l-2xl bg-gray-400'>
        <h4 className='font-bold'>user</h4>
        <p>{content}</p>
        <h4 className='font-semibold'>{date?.toLocaleTimeString(
          "en-US",{
            hour:"2-digit",
            minute:"2-digit",
            hour12:true,
            weekday:"short",
            day:"2-digit",
            month:"short",
            year:"numeric",
            
          }
        )}</h4>
      </div>
  )
}

export default UserChat