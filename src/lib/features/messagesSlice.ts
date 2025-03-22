"use client"

import  {createSlice,PayloadAction} from "@reduxjs/toolkit"



interface Message {
    author:"user"|"ai",
    content:string|JSON
    time:string
}
interface Chatid{
    chatid:string
}
interface MessageState {
    messages:Message[]
    chatid:string
    isGenerating:Boolean
    temp:Boolean
}

const initialState:MessageState={
    messages:[],
    chatid:"",
    isGenerating:false,
    temp:false
}

export const messagesSlice:any=createSlice({
    name:"messages",
    initialState,
    reducers:{
        addNewMessage:(state,action:PayloadAction<Message>)=>{
            const {author,content,time}=action.payload;
           
           
                state.messages.push({author,content,time})
            },
            clearMessages:(state)=>{
                state.messages=[]
            },
            initChat:(state,action:PayloadAction<string>)=>{
               
                state.chatid=action.payload;
            },
            removeChat:(state)=>{
                state.chatid=""
            },
            generating:(state)=>{
                state.isGenerating=true
            },
            notGenerating:(state)=>{
                state.isGenerating=false
            },
            trueTemp:(state)=>{
                state.temp=true
            },
            falseTemp:(state)=>{
                state.temp=false
            }

    }
})

export const {addNewMessage,clearMessages,initChat,removeChat,generating,notGenerating,trueTemp,falseTemp}=messagesSlice.actions;

export default messagesSlice.reducer;
