import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Order from "@/model/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();
    const isAuth = await AuthUser(req);
    if (isAuth) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Id is not Exist",
        });
      }
      const extractOrder = await Order.findById(id).populate(
        "orderItems.product"
      );
      if (extractOrder) {
        return NextResponse.json({
          success: true,
          data: extractOrder,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not extract order",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authonticated",
      });
    }
  } catch (error) {
    console.log("error while login");
    return NextResponse.json({
      success: false,
      message: "some thing went wrong please try again latter",
    });
  }
}
