import connectToDB from "@/database";
import AuthUser from "@/midelware/authUser";
import Address from "@/model/address";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    connectToDB();
    const isAuth = await AuthUser(req);
    if (isAuth) {
      const data = await req.json();
      const { fullName, address, city, country, postalCode, userID } = data;
      const { error } = addNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const newAddress=await Address.create(data)
      if(newAddress){
        return NextResponse.json({
            success:true,
            message:"address Created Successfull"
        })
      }
      else{
         return NextResponse.json({
            success:false,
            message:"can not creating address"
        })
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
