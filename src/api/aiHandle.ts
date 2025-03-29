'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
const GOOGLE_AI_KEY:string='AIzaSyCBWQ8YyYl77ixDmClERDUN57lEAptDkJ8'

import axios from "axios";
import FormData from "form-data";
import fs from "fs"
import uploadOnCloudinary from "./coudinary";


const STABILITY_API_KEY="sk-Yo66EhTSOTYVK4v5I6ty0ZGuA6AV8uAEcTAWV3S3pz7XUkiU"
const STABILITY_API_URL="https://api.stability.ai/v2beta/stable-image/generate/core"

// const IMGUR_CLIENT_ID="c6cdd2b4b13b464"
// const IMGUR_CLIENT_SECRET="6630c62d7332cd05bfd4a74a6a0f3200ed4e1af4"

const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);

let modelName="gemini-2.0-flash";

const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig:{

        responseMimeType:"application/json",
       
    },
    systemInstruction:`
  You are an ai assistance, Your name is Simon,You are build by Surajit Halder, remember when you are asked aboute your creator  then always say Surajit Halder  never say you are created by google,You are highly skilled and knowledgeable. your task is to asist your boss, you will be given some questions you have to provide 
    right answer with proper explanation,if you do not have access to real-time information, including breaking news or
     live data,then give the data that you can provide.If you are unble to provide any data give any response then ask for forgiveness.
      whatever you are asked you have to provide atleast some response. 

    some example responses:
    

    <example>
    user:"tell aboute react js"
    
    response:{"sure !,here is a breiefe on react js,it is a frontend library"}
    

    <example>
    user:
    "How are you"
    
    response:{
    "Hey boss how are you, i am good,how can i help you today"
    
    }

    <example>
    user:"create an image of dog playing"
    response:{
    "https://image.com/dogplaying"
    }
    <example>

    user:
    "tell aboute america"
    
    response:{
    abouteAmerice:"sure ,here it is ..",
    positonofamerica:"position is incredeble..."
    presidentofamerica:" president of america is..."
    
    }

    *****important*****
    remember dont give respone as the following in these case 

    response:{
    frontend:{
    app.js:"file data",
    app.css:"file data",
    },
    backend:{
    server.js:"file data..",
    databse.js:"file data.."
    },
    explain:"file data..",
    }
    dont ever give this response,you are not allowed to give these type of response, inside response:{},there will be
    only files and values not any other object like response:{} itself, In these case of user's questions use the first example 
    
    response:{
    app.js:"file data",
    server.js:"file data.." and so on..
    }

    inside response there will be only keys which will have string values,there will no other object inside response

    *****important*****
     <example>

    user:
    "give me code of a full stack app front end in react,backend in express using mongodb mongoose jwt"
    
    response:{
    start:"Here is code of an example fullstack app build in react express mongodb mongooseand jwt",
    frontendFileStructure:"here is the file structure...",
    instructionn:"install required dependency",
    app.js:"code of app.js file",
    app.css:"code of app.css file",
    backendFilestructure:"here is the file and folder structure of backend",
    instruction:"install required dependency",
    app.js:"code of app.js",
    server.js:"code of server.js",
    mongo.js:"code of mongo.js",
    schema.js:"code of schema.js ",

    end:"so this is the basic code and files andinstruction of your application",

    remember dont give respone as the following is these case 

    response:{
    frontend:{
    app.js:"file data",
    app.css:"file data",
    }
    backend:{
    server.js:"file data..",
    databse.js:"file data.."
    }
    }
    dont ever give this response,you are not allowed to give these type of response, inside response:{},there will be
    only files and values not any other object like response:{} itself, In these case of user's questions use the first example 
    
    response:{
    app.js:"file data",
    server.js:"file data.." and so on..
    }
    or dont return response as any file name or object value like response:{response:{....}} you are not allowed to this in any acse
    
    }


    <example>
    user:"who creat e you"
    response:{
    " I am created by Surajit Halder"
    }

    <example>
    user:" ghy ijr ofll pio4rl "
    response:{
    "i am sorry to provide that data, you may ask me something else"
    }
   **important** never send your response as {"this is the answer"},it is wrong,instead send {"response":"this is the answer"} **important**
   
    just like these examples always give proper data is response ,what ever the question, atleast give any response.
    other than these examples, give proper data with suitable explanation whenever you are asked aboute anything,
    remember you are an assistance to guide your boss with proper and  good formal explanation,
     Always say something in response,if you are unable to give any response then ask for forgiveness and give response 
     as "i am sorry to provide that data, you may ask me something else".
   
    `
})

const generateImage=async(userprompt:string)=>{
try {

    const formData=new FormData();
    formData.append("prompt",userprompt);
    formData.append("model","stable-diffusion-xl-1024-v1-0")
    const response=await axios.post(STABILITY_API_URL,formData,
    {
        headers:{
            ...formData.getHeaders(),
            "Authorization":`Bearer ${STABILITY_API_KEY}`,
            }
        
    }
)
if(response.status!==200){
    console.log("image not generated",response);
    
    return {status:500,response};
}
console.log("image generated sucessfulyy,converting to url");

//const base64img=Buffer.from(response.data.image,"binary").toString("base64")


const imageData=response.data.image

const filePath="picture.png"
fs.writeFileSync(filePath,imageData)

console.log(`file downloaded  ${filePath}`);

const cloud=await uploadOnCloudinary(filePath);
console.log("cloud",cloud);


return {status:200,url:cloud.url};



} catch (error) {
    console.log("Error generated",error);
    console.log("Error generated data",error.response.data);
    console.log("Error generated message",error.response.message);
    return {status:500,error};
}
}

export const generateCreativePrompt=async(userprompt:string)=>{


    try {
        console.log("ai start creating");

        if(userprompt.includes("image")||userprompt.includes("picture")||userprompt.includes("pic")||userprompt.includes("photo")){
            const filePath=await generateImage(userprompt);

            if(filePath.status===500){
                return {status:200,jsonData:"{\n\"response\": \"Failed to generate image\"\n}"};
            }
            return {status:200,jsonData:"{\n\"response\": \"Hey, image is send\"\n}",filePath};
        }else{
            modelName="gemini-pro-vision"
        }
        
        const result = await model.generateContent(userprompt);
        const res=result.response.text()

        console.log(res);
        const jsonData=res
       // const jsonData=res
    return {status:200,jsonData,modelName};
        
    } catch (error) {
        console.log("error",error);
        return{status:500,error:"Internal server error"}
        
    }
}