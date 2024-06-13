import Booking from "@/models/booking";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
    try {
        await connectToDB();
    const bookings = await Booking.find().populate('menu');
        return new Response(JSON.stringify({ success: true, data: bookings }), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch booking" }), {status: 500});
    }
}