import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Cart from "@/model/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const cartSchema = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    connectToDB();
    const authUser = await AuthUser(req);
    if (authUser) {
      const data = await req.json();
      const { userID, productID } = data;

      const { error } = cartSchema.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const existProduct = await Cart.find({
        userID: userID,
        productID: productID,
      });
      if (existProduct?.length>0) {
        return NextResponse.json({
          success: false,
          message: "Product already add in the cart",
        });
      }
      const saveProductToCart = await Cart.create(data);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product added Successfull",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authonticated",
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
