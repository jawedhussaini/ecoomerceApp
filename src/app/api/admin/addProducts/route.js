import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Product from "@/model/products";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  catagory: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imgUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";
export async function POST(req) {
  
  try {
    connectToDB();
  
    const authUser=await AuthUser(req)
  
    if (authUser?.role === "admin") {
      const extractdata = await req.json();
      const {
        name,
        description,
        price,
        catagory,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imgUrl,
      } = extractdata;
      const { error } = schema.validate({
        name,
        description,
        price,
        catagory,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imgUrl,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const newProduct = await Product.create(extractdata);
      if (newProduct) {
        return NextResponse.json({
          success: true,
          message: "product created saccessfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "falid to add new product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authorized to add product",
      });
    }
  } catch (error) {
    console.log("error while creating new product");
    return NextResponse.json({
      success: false,
      message: "some thing wentttttttt wrong please try again latter",
    });
  }
}
