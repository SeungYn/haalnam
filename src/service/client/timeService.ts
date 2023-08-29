import { AxiosInstance } from 'axios';
import {
  GetPersonalTodayTimeResponse,
  PostTimeRequest,
  PostTimeResponse,
} from '../types/time';

export default class TimeService {
  constructor(private axios: AxiosInstance) {}

  async postTime({ time, subject, status }: PostTimeRequest) {
    const formData = new FormData();

    formData.append('subject', subject);
    formData.append('status', status);
    formData.append('time', String(time));

    const { data } = await this.axios.post<PostTimeResponse>(
      '/api/time',
      formData
    );

    return data;
  }

  async getPersonalTodayTime() {
    const { data } = await this.axios.get<GetPersonalTodayTimeResponse>(
      '/api/time'
    );
    return data;
  }
}
