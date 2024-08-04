import { AxiosInstance } from 'axios';
import { PostUserProfileRequest } from '../types/user';

export default class UserService {
	constructor(private axios: AxiosInstance) {}

	async getUserInfo(id: string) {
		const url = `/api/user/info/${id}`;
		const { data } = await this.axios.get<UserInfo>(url);

		return data;
	}

	async postUserProfile({
		nickname,
		id,
		imageFile,
		instagram,
		introduce,
	}: PostUserProfileRequest) {
		const formData = new FormData();

		formData.append('nickname', nickname);
		formData.append('id', id);
		if (imageFile) formData.append('imageFile', imageFile);
		formData.append('instagram', instagram);
		formData.append('introduce', introduce);

		const { data } = await this.axios.post<any>(
			'/api/user/info/profile',
			formData
		);

		return data;
	}
}
