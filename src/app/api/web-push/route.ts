import { checkUser } from '@/service/server/userServerService';
import { ExceptionRes, handleError } from '@/utils/exception';
import { User } from '@prisma/client';
import * as webPushServerService from '@/service/server/webPushServerService';
import * as planServerService from '@/service/server/planServerService';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { WebPushDTO } from '@/service/types/push';

export async function POST(request: NextRequest) {
	const session = await auth();

	//console.log('postsession', { session });
	let user: User | null;
	try {
		user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}
	const { id } = user!;

	let reqData: WebPushDTO.PostCreateSubscriptionReq;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await webPushServerService.erollPushSubscription({
			user_id: id,
			subscriptionInfo: reqData.subscriptionInfo,
			endpoint: reqData.endpoint,
		});

		return NextResponse.json(res, { status: 201 });
	} catch (e) {
		return handleError(e);
	}
}

export async function GET(request: NextRequest) {
	const token = request.headers.get('token');

	if (token !== process.env.SCHEDULE_SERVER_TOKEN) {
		return NextResponse.json(new ExceptionRes('권한이 없습니다'), {
			status: 403,
		});
	}

	try {
		const res = await planServerService.getUserDefaultPlans();

		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

// 웹 푸시 구독 삭제 api
export async function DELETE(request: NextRequest) {
	const token = request.headers.get('token');

	if (token !== process.env.SCHEDULE_SERVER_TOKEN) {
		return NextResponse.json(new ExceptionRes('권한이 없습니다'), {
			status: 403,
		});
	}

	let reqData: { endPoints: string[] };

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await webPushServerService.deleteExpiredSubscriptions(
			reqData.endPoints
		);

		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}
