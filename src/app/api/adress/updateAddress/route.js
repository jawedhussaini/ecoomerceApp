import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Address from "@/model/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    connectToDB();
    const isauth = await AuthUser(req);
    if (isauth) {
      const data = await req.json();
      const { _id } = data;
      const { fullName, address, city, country, postalCode } =
      data.addressFormData;
      const updateAddress = await Address.findOneAndUpdate(
        { _id: _id },
        {
          fullName,
          address,
          city,
          country,
          postalCode,
        },
        { new: true }
      );
      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "Updated successfull",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "can not update plaese try again leter",
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
