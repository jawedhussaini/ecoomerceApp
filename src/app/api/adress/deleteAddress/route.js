import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Address from "@/model/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    
    connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id)
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "you are not log in",
      });
    }
    const isAuth = await AuthUser(req);
    if (isAuth) {
      const getadress = await Address.findByIdAndDelete(id);
      if (getadress) {
        return NextResponse.json({
          success: true,
          message: "deleted adress successfull",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not delete the address please try again",
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
