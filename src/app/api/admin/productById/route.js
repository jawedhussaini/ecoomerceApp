import connectToDB from "@/database";
import Product from "@/model/products";
import { NextResponse } from "next/server";




export const dynamic = "force-dynamic";
export async function GET(req){
    try{
        connectToDB()
        const { searchParams } = new URL(req.url);
        const id=searchParams.get('id')
        if(!id){
            return NextResponse.json({
                success:false,
                status:400,
                message:"given Id not exist"
            })
        }
        const product=await Product.findById(id)
        if(product){
            return NextResponse.json({
                success:true,
                data:product
            })
            
        }
        else{
            return NextResponse.json({
                success:false,
                status:204,
                message:"no data found"
            })
        }

    }
    catch(error){
         console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing went wrong while sss product please try again latter ",
    });
    }
}