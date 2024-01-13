
import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Order from "@/model/order";
import Cart from "@/model/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    connectToDB();
    const isAuth = await AuthUser(req);
    if (isAuth) {
      const data = await req.json();
      const { user } = data;
      const saveNewOrder =await Order.create(data)
      console.log(saveNewOrder)
      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: "product is on the way",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "some thing goes wrong please try again leter",
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
