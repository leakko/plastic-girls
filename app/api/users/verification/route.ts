import dbConnect from '@/lib/db-connect';
import UserModel from '@/models/db/UserModel';
import { Validation } from '@/models/interfaces/validation';
import { NextResponse } from 'next/server';

type NewResponse = NextResponse<{ userFound: boolean, validated: boolean }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const { token: verificationToken } = (await req.json()) as Validation;

  await dbConnect();

  const user = await UserModel.findOne({ verificationToken });

  if (!user) {
    return NextResponse.json(
      { userFound: false, validated: false },
      { status: 422 },
    );
  }

  if (user.active) {
    return NextResponse.json(
      { userFound: true, validated: true },
      { status: 200 },
    );
  }

  user.active = true;

  try {
    await user.save();
    return NextResponse.json(
      { userFound: true, validated: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { userFound: true, validated: false },
      { status: 500 },
    );
  }
};
