'use client'


import React, { useEffect, useState } from 'react'

type Props = {
  content:string |JSON
  time:string 
}

const AiChat = ({content,time}: Props) => {
 
  const [textBody,setTextBody]=useState<string |any>(Object.entries(content).map(([key,value])=>` ${key} : ${value}`))
   const [speaker,setSpeaker]=useState(false)
   const [speaking,setSpeaking]=useState(false)
   const synth=window.speechSynthesis;
   
   let utterrance:SpeechSynthesisUtterance|null=null
   useEffect(() => {
    if(typeof content==='string'){
      setTextBody(content)
    }
   }, [textBody])
   


const isFile=(key:any)=>/\w+\.(js|ts|py|html|css|json|md|jsx|tsx|txt)$/i.test(key)

const handleSpeechStart =(textKey:string)=>{
  if(synth.speaking) return;

  const textToSpeak=textKey
  if (!textToSpeak) {
    return;
  }

  setSpeaker(true)
  utterrance=new SpeechSynthesisUtterance(textKey);
  synth.speak(utterrance)
  setSpeaking(true)
 

  utterrance.onend=()=>{setSpeaking(false)
     setSpeaker(false)}
}

const handleStop=()=>{
setSpeaker(false)
  if(synth.speaking){
    synth.cancel()
    setSpeaking(false)
    
  }
}



  return (
    <div className='m-1 p-2 w-fit h-fit rounded-t-2xl rounded-r-2xl bg-white'>
    <h4 className='font-bold'>AI</h4>

   
     {
      speaker===true?
      <button className='flex items-center p-1 bg-gray-300 rounded-3xl w-fit'
      onClick={handleStop}
     ><img  className='w-5 h-5' src='/mute.png'/>
     </button>
     :<button className='flex items-center p-1 bg-gray-300 rounded-3xl w-fit'
     onClick={()=>handleSpeechStart(textBody)}
     >
      <img className='w-5 h-5' src='/speaker-filled-audio-tool.png' /> </button>
     } 
      
     

    {
      typeof content==="string"?(
        <p>{content}</p>
      ):(
        Object.entries(content).map(([key,value])=>(
          
          <p key={key} 
          className={`p-2 mt-2 max-w-[90%] overflow-x-auto  mr-0.5 flex flex-wrap rounded ${isFile(key)?"bg-gray-900 text-blue-400 font-moto whitespace-pre-wrap":"text-black"}`} >
          <strong>{key}:</strong>{String(value)}</p>
          
          
        ))
      )
    }
    
    <p>{time}</p>
  </div>
  )
}

export default AiChat