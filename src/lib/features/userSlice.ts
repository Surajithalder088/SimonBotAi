'use client'

import  {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface User{
    email:string|null
    id:string|null
}


const initialState:User={
    email:null,
    id:""

}

export const userSlice:any=createSlice({
    name:"users",
    initialState,
    reducers:{
        loginUser:(state,action:PayloadAction<User>)=>{
            const {email,id}=action.payload;
           
           
                state.email=email;
                state.id=id
            },
           logoutUser:(state)=>{
            state.email=null
            state.id=""
           }
    }
})

export const {loginUser,logoutUser}=userSlice.actions;

export default userSlice.reducer;