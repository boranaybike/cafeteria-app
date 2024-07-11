import { connectToDB } from "@/utils/database"
import User from '@/models/user';

export const GET = async () => {
    try {
        await connectToDB();
        const Users = await User.find()
        return new Response(JSON.stringify({ success: true, data: Users }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch User" }), { status: 500 });
    }
}
