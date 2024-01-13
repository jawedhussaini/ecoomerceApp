import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Cart from "@/model/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();
    const authUser = await AuthUser(req);
    if (authUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "please login",
        });
      }
      const extractAllItems = await Cart.find({ userID: id })
        .populate("productID");
      if (extractAllItems) {
        return NextResponse.json({
          success: true,
          data: extractAllItems,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "no cartItem Found",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "user is not authonticaded",
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
