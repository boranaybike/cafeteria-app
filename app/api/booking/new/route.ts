import { connectToDB } from "@/utils/database";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    await connectToDB()

    const { reservations } = await request.json();

    const savedReservations = [];

    for (const reservation of reservations) {
      const { amount, creator, menu } = reservation;

    const newBooking = new Booking({
      amount,
      creator,
      menu
    })
    await newBooking.save()
      savedReservations.push(newBooking);
    }

    return NextResponse.json({ success: true, message: "Bookings created successfully"}, { status: 200 })
  } catch (error: any) {
    
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

