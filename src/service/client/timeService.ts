import { AxiosInstance } from 'axios';
import { PostTimeRequest, PostTimeResponse } from '../types/time';

export default class TimeService {
  constructor(private axios: AxiosInstance) {}

  async postTime({ time, subject, status }: PostTimeRequest) {
    const formData = new FormData();

    formData.append('subject', subject);
    formData.append('status', status);

    const { data } = await this.axios.post<PostTimeResponse>(
      '/api/time',
      formData
    );

    return data;
  }
}
