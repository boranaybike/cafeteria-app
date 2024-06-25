import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getSecret } from "@/utils/auth";

export const POST = async (request: any) => {
  try {
    await connectToDB()
    const { card_number, password } = await request.json()
    const existingUser = await User.findOne({ card_number: card_number})

    if (!existingUser || existingUser.password !== password) {
      return NextResponse.json({
        error: "Invalid credentials",
        success: false
      }, { status: 401 })
    }
    
    const token = await new SignJWT({
      card_number: existingUser.card_number,
      role: existingUser.role,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      user_id: existingUser._id.toString()    
    })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(getSecret())
    const response =  NextResponse.json({ success: true, token }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', expires: new Date(Date.now() + 1000 * 36000) });
 
    return response

  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 })
  }
}
