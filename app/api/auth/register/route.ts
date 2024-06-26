import { NextResponse } from 'next/server';
import { connectToDB } from "@/utils/database";
import { generateNumber } from '@/utils/shared';
import User from "@/models/user";

export const POST = async (request: any) => {
    const { first_name, last_name, password, role } = await request.json()
    try {
        await connectToDB()
        const card_number = generateNumber()
        const newUser = new User({
            card_number,
            first_name,
            last_name,
            password,
            role
        })
        await newUser.save()
        return NextResponse.json({ success: true, user: newUser }, { status: 201 })
    } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
