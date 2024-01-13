import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Order from "@/model/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();
    const isAuth = await AuthUser(req);
   
    if (isAuth?.role==='admin') {
      const getAllOrders = await Order.find({})
        .populate("orderItems.product")
        .populate("user");
      if (getAllOrders) {
        return NextResponse.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not get all data",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you areeee anauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing went worong please try again leter",
    });
  }
}
