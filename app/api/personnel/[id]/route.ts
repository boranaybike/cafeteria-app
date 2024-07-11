import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import { NextResponse } from 'next/server';

export const DELETE = async (request: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const { id } = params;

    const deletedPersonnel = await User.findByIdAndDelete(id);
    if (!deletedPersonnel) {
      return NextResponse.json({ message: 'Personnel not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Personnel removed successfully' },  { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting personnel', error }, { status: 500 });
  }
}