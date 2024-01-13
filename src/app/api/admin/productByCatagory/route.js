import connectToDB from "@/database";
import Product from "@/model/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    
  try {  

    connectToDB();
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
    const getData = await Product.find({catagory:id});
    if (getData) {
      return NextResponse.json({
        success: true,
        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "can not get the data",
      });
    }
  } catch (error) {
    console.log("kkkkk")
    return NextResponse.json({
      success: false,
      message: "some thing went wrong ddd.vvvv., please try again latter ",
    });
  }
}
