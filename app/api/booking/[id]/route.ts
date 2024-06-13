import Booking from '@/models/booking';
import { connectToDB } from '@/utils/database';
import { NextResponse } from 'next/server';

export const DELETE = async (request: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const { id } = params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return NextResponse.json({ message: 'Reservation not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Reservation deleted successfully' },  { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting reservation', error }, { status: 500 });
  }
}