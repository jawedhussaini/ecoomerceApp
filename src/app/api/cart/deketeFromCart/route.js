import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Cart from "@/model/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    connectToDB();
    const authUser = await AuthUser(req);
    if (authUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "cart itmeID is required",
        });
      }
      const deletedItem = await Cart.findOneAndDelete(id);

      if (deletedItem) {
        return NextResponse.json({
          success: true,
          message: "item deleted successfull",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not delete item",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authonticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "some thing went wrong please try again latter",
    });
  }
}
