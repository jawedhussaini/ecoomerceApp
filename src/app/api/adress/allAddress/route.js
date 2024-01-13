import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Address from "@/model/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "you are not log in",
      });
    }
    const isAuth = await AuthUser(req);
    if (isAuth) {
      const getadress = await Address.find({ userID: id });
      if (getadress) {
        return NextResponse.json({
          success: true,
          data: getadress,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not get the address please try again",
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
