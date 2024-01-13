import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Order from "@/model/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    connectToDB();
    const isAuth = await AuthUser(req);
    const data = await req.json();
    if (isAuth?.role === "admin") {
      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;
      const updateOrder = await Order.findOneAndUpdate(
        { _id: _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );

      if (updateOrder) {
        return NextResponse.json({
          success: true,
          message: "orders status Updated successfull",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not update order status please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are anauthorized",
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
