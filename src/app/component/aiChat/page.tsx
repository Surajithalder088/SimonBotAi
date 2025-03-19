import React from 'react'

type Props = {
  content:string 
  time:string 
}

const AiChat = ({content,time}: Props) => {
  return (
    <div className='m-1 p-2 w-fit h-fit rounded-t-2xl rounded-r-2xl bg-white'>
    <h4>AI</h4>
    <p>{content}</p>
    <p>{time}</p>
  </div>
  )
}

export default AiChat