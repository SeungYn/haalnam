import { auth } from '@/lib/auth';
import { findUserBynid } from '@/repository/userRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params: { nid } }: { params: { nid: number } }
) {
	const session = await auth();

	//console.log('postsession', session);
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });

	const user = await findUserBynid(nid);

	return NextResponse.json(user, { status: 200 });
}
