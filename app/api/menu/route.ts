import Menu from "@/models/Menu";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
    try {
        await connectToDB();
        const menu = await Menu.find();
        return new Response(JSON.stringify({ success: true, data: menu }), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch menu" }), {status: 500});
    }
}