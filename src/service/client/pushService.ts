import { AxiosInstance } from 'axios';
import { PostCreateSubscriptionReqeust } from '../types/push';
import { WebPushSubscription } from '@prisma/client';

export default class PushService {
	constructor(private axios: AxiosInstance) {}

	async postCreateSubscription(req: PostCreateSubscriptionReqeust) {
		const { data } = await this.axios.post<WebPushSubscription>(
			'/api/web-push',
			{ ...req }
		);

		return data;
	}
}
