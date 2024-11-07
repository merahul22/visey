import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        startup: true,
        business: true,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }

  return NextResponse.json({ message: `User ID is ${userId}` });
}
