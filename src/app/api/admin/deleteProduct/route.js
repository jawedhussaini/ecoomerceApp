import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Product from "@/model/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    connectToDB();
     const authUser=await AuthUser(req)
     if(authUser?.role==='admin'){
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const id = searchParams.get("id");
    console.log(id)

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "id not exist",
      });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (deleteProduct) {
      return NextResponse.json({
        success: true,
        message: "Product Delete Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to delete Product",
      });
    }
  }
  else{ return NextResponse.json({
      success: false,
      message: "you Are not Authonticated",
    });}
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing went wrong please try again latter",
    });
  }
}
