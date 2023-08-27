import dbConnect from '@/lib/db-connect';
import UserModel from '@/models/db/UserModel';
import { RegisterUserRequest, RegisterUserResponse } from '@/models/interfaces/user';
import { NextResponse } from 'next/server';

type NewResponse = NextResponse<{ data?: { user?: RegisterUserResponse }, error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as RegisterUserRequest;

  await dbConnect();

  const oldUser = await UserModel.findOne({ email: body.email });

  if (oldUser && oldUser.active) {
    return NextResponse.json(
      { error: 'Email is already in use' },
      { status: 422 },
    );
  }

  if (oldUser && !oldUser.active) {
    return NextResponse.json(
      { error: 'Account pending activation. Check your email inbox' },
      { status: 422 },
    );
  }

  const user = await UserModel.create({ ...body });

  return NextResponse.json({
    data: {
      user: {
        id: user._id.toString(),
        email: user.email,
        active: user.active,
      },
    },
  });
};
