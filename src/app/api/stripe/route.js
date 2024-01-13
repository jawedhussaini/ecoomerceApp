import AuthUser from "@/midelware/authUser"
import { NextResponse } from "next/server"

const stripe=require('stripe')('sk_test_51O3PbtSAbdJhEjldKgUeQi5VhOStMXxyZLTNz3Zi0Rht7b4NvRQAes0FAfvUqeOgi65JJMQraP7Xlk82j1ZJEfVG00d22I7ssG')



export const dynamic='force-dynamic'

export async function POST(req){
    
    try{

        const isAurh=await AuthUser(req)

        if(isAurh){
                   const res=await req.json()

        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:res,
            mode:'payment',
            success_url:'http://localhost:3000/checkOut'+'?status=success',
            cancel_url:'http://localhost:3000/checkOut'+'?status=cancel'
        })

        return NextResponse.json({
            success:true,
            id:session.id
        })

        }
        else{
  return NextResponse.json({
            success:false,
            message:"some error ocour"
        })
        }
 

    }
    catch(e){
        console.log(e)
        return NextResponse.json({
            success:false,
            status:500,
            message:"some thing is wrong"
        })
    }
}