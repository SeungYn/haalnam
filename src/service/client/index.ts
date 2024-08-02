import { axiosInstance } from '@/network/http';
import TimeService from './timeService';
import UserService from './userService';

const service = {
	time: new TimeService(axiosInstance),
	user: new UserService(axiosInstance),
};

export default service;
