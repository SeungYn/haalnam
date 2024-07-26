import { whereHost } from '@/utils/util';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: whereHost(),
	withCredentials: true,
});
