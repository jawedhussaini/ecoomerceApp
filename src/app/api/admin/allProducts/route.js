import connectToDB from "@/database";
import Product from "@/model/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();
  
      const datas = await Product.find({});
      if (datas) {
        return NextResponse.json({
          success: true,
          data: datas,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "not found products",
        });
      }
  
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing went wrong please try again latter",
    });
  }
}
