import { AxiosInstance } from 'axios';
import {
	DeleteTimerRequest,
	GetPersonalTodayTimeResponse,
	PostAddTimerRequest,
	PostTimeRequest,
	StartTimerRequest,
} from '../types/time';
import { whereHost } from '@/utils/util';
import { Time } from '@prisma/client';

export default class TimeService {
	constructor(private axios: AxiosInstance) {}

	async postStartTimer({ status, subject }: StartTimerRequest) {
		const { data } = await this.axios.post<Time>('/api/time', {
			status,
			subject,
		});

		return data;
	}

	async fetchStopTimer({ timeId }: DeleteTimerRequest) {
		return await this.axios.patch('/api/time', {
			timeId,
		});
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

	async postCheckRestTimer() {
		const url = `/api/time/check`;
		// const { data } = await this.axios.post<Time>(url);
		const res = await fetch(whereHost() + url, {
			method: 'POST',
			keepalive: true,
		});

		return res;
	}

	async deleteTimer(reqeustData: DeleteTimerRequest) {
		const url = '/api/time/delete';
		return await this.axios.post(url, { ...reqeustData });
	}

	async postAddTimer({
		startTime,
		subject,
		endTime,
		date,
	}: {
		subject: string;
		startTime: {
			h: number;
			m: number;
			s: number;
		};
		endTime: {
			h: number;
			m: number;
			s: number;
		};
		date: Date;
	}) {
		const [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate()];
		const reqData = {
			subject,
			date: {
				y,
				m,
				d,
			},
			startTime: {
				hours: startTime.h,
				minutes: startTime.m,
				seconds: startTime.s,
			},
			endTime: {
				hours: endTime.h,
				minutes: endTime.m,
				seconds: endTime.s,
			},
		};
		const url = '/api/time/add';
		const { data } = await this.axios.post<Time>(url, { ...reqData });

		return data;
	}

	// async postTime({ time, subject, status }: PostTimeRequest) {
	// 	const formData = new FormData();

	// 	formData.append('subject', subject);
	// 	formData.append('status', status);
	// 	formData.append('time', String(time));

	// 	const res = await fetch(whereHost() + '/api/time', {
	// 		method: 'POST',
	// 		body: formData,
	// 		keepalive: true,
	// 	});
	// 	const data = await res.json();

	// 	return data;
	// }
}
