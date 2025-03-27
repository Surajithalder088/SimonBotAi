'use server'

import {v2 as cloudinary} from 'cloudinary';
import { log } from 'console';
import fs from 'fs';


/* eslint-disable
@typescript-eslint/no-explicit-any
*/


    // Configuration
    cloudinary.config({ 
        cloud_name:'dbxx49ers', 
        api_key:'599771455727696', 
        api_secret:'AIKlW4J69tyWmpTlTK0nfjzW1bI', 
    });
    
  

    const uploadOnCloudinary=async(localFilePath:any)=>{
        try{
            if(!localFilePath){
                return null; }
                //upload file on cloudinary
               const response= await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
                console.log("file is uploaded on cloudinary");
               
                if(response){
                    fs.unlinkSync(localFilePath);
                }
                 return response;
           
        }catch(err){
            console.log(err);
            
            fs.unlinkSync(localFilePath);//revome the local file as failed to upload
            return null;
        }
    }

    export default uploadOnCloudinary;

    /* eslint-disable
@typescript-eslint/no-explicit-any
*/