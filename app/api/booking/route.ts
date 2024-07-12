import Booking from "@/models/Booking"
import { connectToDB } from "@/utils/database"

export const GET = async () => {
    try {
        await connectToDB();
        const bookings = await Booking.find().populate('menu').populate('creator')
        return new Response(JSON.stringify({ success: true, data: bookings }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch booking" }), { status: 500 })
    }
}