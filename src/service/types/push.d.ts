export type PostCreateSubscriptionReqeust = {
	subscriptionInfo: string;
	endpoint: string;
};

export namespace WebPushDTO {
	export type PostCreateSubscriptionReq = {
		user_id: string;
	} & PostCreateSubscriptionReqeust;
}
