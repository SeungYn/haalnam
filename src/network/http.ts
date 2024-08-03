import { whereHost } from '@/utils/util';
import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
	baseURL: whereHost(),
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		const { response } = error;
		const data: { [key: string]: any } = response?.data!;
		let errorMsg = data.message || '에러가 발생했습니다.';

		return Promise.reject({ message: errorMsg, status: error.status });
	}
);
