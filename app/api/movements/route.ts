import Movement from "@/models/movement";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
    try {
        await connectToDB();
        const movement = await Movement.find();
        return new Response(JSON.stringify({ success: true, data: movement }), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch movement" }), {status: 500});
    }
}