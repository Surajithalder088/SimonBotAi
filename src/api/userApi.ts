'use server'

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

//import { prisma } from "@/lib/prisma";
const prisma = new PrismaClient();

export const registerUser=async({name,email,password}:{name:string,email:string,password:string})=>{
    if(!name ||!email||!password){
        return {status:400,message:"all field required"}
    }
    try {

    const user= await prisma.user.findUnique({
        where:{email}
    })
    if(user){
        return {status:400,message:"user already exist"}
    }
    const hashpassword= await bcrypt.hash(password,10)
          const newuser= await prisma.user.create({
        data:{
            name,email,password:hashpassword
        }
    })
    if(!newuser){
        return{status:400,message:"failed to create new user"}
    }
    return {ststus:201,message:"new user created",user:newuser}
    } catch (error) {
        console.log(error);
        
        return {status:500,message:"internal server eorror",error}
    }
  
}

export const login=async({email,password}:{email:string,password:string})=>{
    if(!email||!password){
        return {status:400,message:"all field required"}
    }
    try {
        const user= await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            return {status:404,message:"user does not exist"}
        }
        const isMatched=await bcrypt.compare(password,user.password)
        if(!isMatched){
            return{status:400,message:"invalid credentials"}
        }
        return{status:200,user:user}
    } catch (error) {
        return{status:500,message:"internal server error ",error}
    }
}