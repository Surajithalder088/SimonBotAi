'use client'


import React, { useEffect, useState } from 'react'



const AiChat = ({content,time}: { content:JSON,time:string }) => {
  const fullText:string=Object.entries(content).map(([key,value])=>` ${key} : ${value}`).toString()
 
  const [textBody,setTextBody]=useState<string>(fullText)
   const [speaker,setSpeaker]=useState(false)
   const [speaking,setSpeaking]=useState(false)
   const synth=window.speechSynthesis;
   /* eslint-disable
@typescript-eslint/no-explicit-any
*/
   
   //let utterrance:SpeechSynthesisUtterance|null=null
   useEffect(() => {
    if(typeof content==='string'){
      setTextBody(content)
    }
   }, [textBody])
   
console.log(speaking);


const isFile=(key:string)=>/\w+\.(js|ts|py|html|css|json|md|jsx|tsx|txt)$/i.test(key)

const handleSpeechStart =(textBody:string )=>{
  /*if(synth.speaking) return;

  setSpeaker(true)
  utterrance=new SpeechSynthesisUtterance(textBody);
  synth.speak(utterrance)
  setSpeaking(true)
 

  utterrance.onend=()=>{setSpeaking(false)
     setSpeaker(false)}
     */
    console.log(textBody);
    
}

const handleStop=()=>{
setSpeaker(false)
  if(synth.speaking){
    synth.cancel()
    setSpeaking(false)
    
  }
}

/* eslint-disable
@typescript-eslint/no-explicit-any
*/

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