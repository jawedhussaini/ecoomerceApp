import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Product from "@/model/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    connectToDB();
     const authUser=await AuthUser(req)

     if(authUser?.role==='admin'){

     
    const extractData = await req.json();
    const {
      _id,
      name,
      description,
      price,
      catagory,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imgUrl,
    } = extractData;
    const updated = await Product.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        name,
        description,
        price,
        catagory,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imgUrl,
      },
      { new: true }
    );
    if(updated){
        return NextResponse.json({
            success:true,
            message:"Updated Product Successfull"
        })

    }
    else{
        return NextResponse.json({
      success: false,
      message: "can not Update product please try again latter",
    });
    }
}
   else{
         return NextResponse.json({
      success: false,
      message: "you are not authonticated",
    });
   }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing went wrong while updating product please try again latter ",
    });
  }
}
