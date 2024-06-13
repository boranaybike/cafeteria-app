import { connectToDB } from "@/utils/database";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    await connectToDB();

    const { date, product, amount , user_id, menu} = await request.json();

    const newBooking = new Booking({
      date,
      product,
      amount,
      creator: user_id,
      menu: menu
    });

    await newBooking.save();

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
