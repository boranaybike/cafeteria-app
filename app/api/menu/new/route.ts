import { connectToDB } from "@/utils/database"
import Menu from "@/models/Menu"

export const POST = async (request:any) => {

    const {meal, date} = await request.json();
    try {
        await connectToDB()
        const newMenu= new Menu({
            meal,
            date
        })
        await newMenu.save()
        return new Response(JSON.stringify({ success: true, data: newMenu }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to create menu" }), { status: 500 })
    }
}