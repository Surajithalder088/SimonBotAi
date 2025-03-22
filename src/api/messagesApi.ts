'use server'

import { PrismaClient } from "@prisma/client"
import { InputJsonValue } from "@prisma/client/runtime/library"


//import { prisma } from "@/lib/prisma";
const prisma=new PrismaClient()

export const newChat=async({userid,title}:{userid:string,title:string})=>{
    try {
        if(!userid){
            return{status:400,message:"not valid user"}
        }
        const newChat=await prisma.chat.create({
            data:{userid:userid,
            title:title
            }
        })
        if(!newChat){
            return{status:404,message:"Failed to create new chatlist"}
        }
        return{status:201,chat:newChat}
    } catch (error) {
        console.log(error);
        return{status:500,message:"internal server error",error}
    }

}
export const AllChats=async(userId:string)=>{
    
    try {
        if(!userId){
            return{status:400,message:"not valid user"}
        }
        const allChats=await prisma.chat.findMany({
            where:{
                userid:userId
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        if(!allChats){
            return{status:404,messages:"failed to get all chats"}
        }
        return {status:200,chats:allChats}
    } catch (error) {
        console.log(error);
        
        return{status:500,message:"internal ser ver eror",error}
    }
}

export const newMessage=async({chatid,sender,body}:{chatid:string,sender:string,body:InputJsonValue|string})=>{
    if(!chatid||!sender||!body){
        return{status:400,message:"all fields are required"}
    }
    try {
        const newMessage=await prisma.message.create({
            data:{
                chatid,
                sender,
                body,
                
            }
        })
        if(!newMessage){
            return{status:400,message:"message not created"}
        }
        const existingChat=await prisma.chat.findUnique({where:{id:chatid}})
        if(!existingChat){
            return{status:404,message:"no chat even exists"}
        }
        return{status:200,message:newMessage,chat:existingChat}
    } catch (error) {
        return{status:500,mesage:"internal server error",error}
    }

}
export const allMessages=async(chatid:string)=>{
    try {
        if(!chatid){
            return{status:400,message:"chat id is not provided"}
        }
        const allMessages= await prisma.message.findMany({
            where:{
                chatid
            }
        })
        if(!allMessages){
            return{status:404,message:"failed to get messages"}
        }
        return {status:200,messages:allMessages}
    } catch (error) {
        console.log(error);
        return{status:500,message:"internal server error",error}
        
    }

}