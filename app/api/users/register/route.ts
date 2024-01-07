import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/db-connect';
import UserModel from '@/models/db/UserModel';
import { RegisterUserRequest, RegisterUserResponse } from '@/models/interfaces/user';
import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

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

  const verificationToken = uuidv4();

  const user = await UserModel.create({ ...body, verificationToken });

  const info = await transporter.sendMail({
    from: `"Plastic Girls 🔥" <${process.env.MAILER_USER}>`,
    to: body.email,
    subject: "Verify your account",
    html: `
      <p>To verify your Plastic Girls account, click <a href="${process.env.NEXTAUTH_URL}/verification/${verificationToken}">here</a></p>
      <p>Or directly paste this url in your broswer: <em>${process.env.NEXTAUTH_URL}/verification/${verificationToken}</em></p>
    `,
  });

  console.log("Message sent: %s", info.messageId);

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
