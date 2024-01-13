import connectToDB from "@/database"
import User from "@/model/user"
import { hash } from "bcryptjs"
import Joi from "joi"
import { NextResponse } from "next/server"

const schema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().required()

})
export const dynamic='force-dynamic'




export async function POST(req){
    connectToDB()
    const {name,email,password,role}=await req.json()
    const {error}=schema.validate({name,email,password,role})
    if(error){
        return NextResponse.json({
            success:false,
            message:error.details[0]
        })
    }
    try{
        const isUserExist=await User.findOne({email})
        if(isUserExist){
            return NextResponse.json({
            success:false,
            message:"user alredy exist"
        })
        }
        else{
          const hashPassword=await hash(password,12)

          const createusser=await User.create({
            name,email,password:hashPassword,role
          })
          if(createusser){
              return NextResponse.json({
            success:true,
            message:"ACCount created successfully"
        })
          }
        }


    }
    catch(error){
        console.log("error while creating new user")
        return NextResponse.json({
            success:false,
            message:"some thing went wrong please try again latter"
        })
    }

}