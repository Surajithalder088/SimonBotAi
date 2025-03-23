
import React from 'react'



const UserChat = ({content,time}: {content:string ,time:string}) => {
  return (
    <div className='m-1 mr-[] p-2 w-[60vw] flex flex-col justify-end ml-auto h-fit rounded-t-2xl rounded-l-2xl bg-gray-400'>
        <h4 className='font-bold'>user</h4>
        <p>{content}</p>
        <h4>{time}</h4>
      </div>
  )
}

export default UserChat