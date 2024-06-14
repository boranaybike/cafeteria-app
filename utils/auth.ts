import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT SECRET is not defined");
  }
  return new TextEncoder().encode(secret);
};

export const verifyJwtToken = async (token: string | Uint8Array) => {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload
  } catch (error) {
    return null
  }
}

export const logout = () => {
  const response = NextResponse.json({ success: true }, { status: 200 })
  response.cookies.set({
    name: "Token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true
  });

  return response
}