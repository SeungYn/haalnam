import client from '@/lib/db';
import { WebPushDTO } from '../types/push';
import * as planServerService from '@/service/server/planServerService';
import * as userRepository from '@/repository/userRepository';

export async function erollPushSubscription({
	subscriptionInfo,
	user_id,
	endpoint,
}: WebPushDTO.PostCreateSubscriptionReq) {
	const subScription = await client.webPushSubscription.findUnique({
		where: {
			endpoint,
		},
	});
	// 기존 구독이 존재하면 Null 반환
	if (subScription) return null;

	// 구독이 들어오면 유저 알림권한을 true로 변경
	await client.user.update({
		where: {
			id: user_id,
		},
		data: {
			is_webpush_privilege: true,
		},
	});
	const subscription = await client.webPushSubscription.create({
		data: {
			subscription_info: subscriptionInfo,
			user_id,
			endpoint,
		},
	});

	const user = await planServerService.getUserDefaultPlansByUserId(user_id);
	if (user !== null) enrollWebPushToPushServer([user]);
	return subscription;
}

export function enrollWebPushToPushServer(
	users: Awaited<
		ReturnType<typeof planServerService.getUserDefaultPlansByUserId>
	>[]
) {
	fetch('http://localhost:4000/schedule', {
		method: 'post',
		body: JSON.stringify(users),
		headers: {
			'Content-Type': 'application/json',
		},
	}).catch((e) => {
		console.log('스케줄링 요청 에러', e);
	});
}

// 만료된 endPoints 삭제
// 삭제를 시키면 해당 스케줄링 서버에 구독 정보를 최신화 시켜야함.
// 최신화된 유저 정보를 반환
export async function deleteExpiredSubscriptions(endPoints: string[]) {
	const willDeleteSubscriptionUsers = await client.webPushSubscription.findMany(
		{
			where: { endpoint: { in: endPoints } },
		}
	);
	const users = willDeleteSubscriptionUsers.map((user) => user.user_id);

	const { count } = await client.webPushSubscription.deleteMany({
		where: {
			endpoint: {
				in: endPoints,
			},
		},
	});
	const result =
		userRepository.findUserListAllWithPlansAndWebPushSebscriptionByUserId(
			users
		);

	return result;
}

// 계획을 추가하면 푸시 서버에 알려야함 해당 유저 스케쥴 다시 등록
// 계획이 삭제되면 푸시 서버에 알려야함 해당 유저 스케쥴 다시 등록
// 계획이 업데이트되면 푸시 서버에 알려야함 해당 유저 스케쥴 다시 등록
