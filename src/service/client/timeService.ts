import { AxiosInstance } from 'axios';
import {
	GetPersonalTodayTimeResponse,
	PostTimeRequest,
	PostTimeResponse,
} from '../types/time';

export default class TimeService {
	constructor(private axios: AxiosInstance) {}

	// async postTime({ time, subject, status }: PostTimeRequest) {
	//   const formData = new FormData();

	//   formData.append('subject', subject);
	//   formData.append('status', status);
	//   formData.append('time', String(time));

	//   const { data } = await this.axios.post<PostTimeResponse>(
	//     '/api/time',
	//     formData
	//   );

	//   return data;
	// }

	async postTime({ time, subject, status }: PostTimeRequest) {
		const formData = new FormData();

		formData.append('subject', subject);
		formData.append('status', status);
		formData.append('time', String(time));

		const res = await fetch('http://localhost:3000/api/time', {
			method: 'POST',
			body: formData,
			keepalive: true,
		});
		const data = await res.json();

		return data;
	}

	async getPersonalTodayTime() {
		const { data } =
			await this.axios.get<GetPersonalTodayTimeResponse>('/api/time');
		return data;
	}

	async getTimesByDate(date: Date) {
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		const params = encodeURIComponent(`${y}/${m}/${d}`);
		const { data } = await this.axios.get<GetPersonalTodayTimeResponse>(
			'/api/time/' + params
		);

		return data;
	}
}
