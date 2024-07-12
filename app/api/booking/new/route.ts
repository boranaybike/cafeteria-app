import Booking from "@/models/Booking";
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"

export const POST = async (request: any) => {
  try {
    await connectToDB()

    const { reservations } = await request.json()
    const creatorId = reservations[0]?.creator
    const existingBookings = await Booking.find({ creator: creatorId })

    const newReservationIds = reservations.map((reservation:any) => reservation.menu)

    const bookingsToDelete = existingBookings.filter(
      booking => !newReservationIds.includes(booking.menu.toString())
    );

    for (const booking of bookingsToDelete) {
      await Booking.deleteOne({ _id: booking._id });
    }
    for (const reservation of reservations) {
      const { amount, creator, menu } = reservation;

      const existingBooking = await Booking.findOne({ creator, menu });
      if (existingBooking) {
        if (existingBooking.amount !== amount) {
          existingBooking.amount = amount;
          await existingBooking.save();
        }
      } else {
        const newBooking = new Booking({
          amount,
          creator,
          menu
        });
        await newBooking.save();
      }
    }

    return NextResponse.json(
      { success: true, message: "Bookings created/updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
