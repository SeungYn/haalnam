export type GetUserInfo = UserInfo;
export type PostUserProfileRequest = {
	nickname: string;
	introduce: string;
	instagram: string;
	imageFile: File | null;
	id: string;
};
