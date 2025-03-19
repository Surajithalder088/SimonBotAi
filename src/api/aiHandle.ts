'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
const GOOGLE_AI_KEY:string='AIzaSyCBWQ8YyYl77ixDmClERDUN57lEAptDkJ8'

const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig:{

        responseMimeType:"application/json",
       
    },
    systemInstruction:`
  You are an ai assistance, Your name is Simon,You are highly skilled and knowledgeable. your task is to asist your boss, you will be given some questions you have to provide 
    right answer with proper explanation,if you do not have access to real-time information, including breaking news or
     live data,then give the data that you can provide.

     example response:

    <example>
    user:"tell aboute react js"
    
    response:"sure !,here is a breiefe on react js,it is a frontend library"
    

    <example>
    user:{
    "How are you"
    }
    response:{
    "I am good tell me aboute you"
    
    }
   
    `
})

export const generateCreativePrompt=async(userprompt:string)=>{


    try {
        console.log("ai start creating");
        
        const result = await model.generateContent(userprompt);
        const res=result.response.text()

        console.log(res);
        const jsonData=JSON.parse(res)
       
    return {status:200,jsonData};
        
    } catch (error) {
        console.log("error",error);
        return{status:500,error:"Internal server error"}
        
    }
}