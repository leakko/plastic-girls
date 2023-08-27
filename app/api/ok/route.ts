import { NextResponse } from 'next/server';

export async function GET() {
	return new NextResponse('Ok', {
		status: 200, 
		headers: {
			'Content-Type': 'text/plain'
		}
	})
}