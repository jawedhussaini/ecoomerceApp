import connectToDB from "@/database";
import User from "@/model/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  connectToDB();
  const { email, password } = await req.json();
  const { error } = schema.validate({email, password});
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0],
    });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "user not exist with given email",
      });
    }
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "wrong password",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );
    const finalData = {
        token,
        user:{
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      _id: checkUser._id,}
    };
    return NextResponse.json({
      success: true,
      message: "login Successfull",
      finalData,
    });
  } catch (e) {
    console.log("error in webside while login");
    return NextResponse.json({
      success: false,
      message: "some thing went wrong please try again latter",
    });
  }
}
