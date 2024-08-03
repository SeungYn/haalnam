import { AxiosInstance } from 'axios';
import { GetPersonalTodayTimeResponse, PostTimeRequest } from '../types/time';
import { whereHost } from '@/utils/util';
import { Time } from '@prisma/client';

export default class TimeService {
	constructor(private axios: AxiosInstance) {}

	async postTime({ time, subject, status }: PostTimeRequest) {
		const formData = new FormData();

		formData.append('subject', subject);
		formData.append('status', status);
		formData.append('time', String(time));

		const res = await fetch(whereHost() + '/api/time', {
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

	async getTimesByUserNidAndDate(userNid: number, date: Date) {
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		const params = encodeURIComponent(`${y}/${m}/${d}`);
		const encodeUserNid = encodeURIComponent(userNid);
		const { data } = await this.axios.get<GetPersonalTodayTimeResponse>(
			'/api/time/' + params + `/${encodeUserNid}`
		);

		return data;
	}

	async getLatestTime() {
		const url = `/api/time/latest`;
		const { data } = await this.axios.get<Time>(url);

		return data;
	}
}
