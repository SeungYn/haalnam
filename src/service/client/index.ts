import { axiosInstance } from '@/network/http';
import TimeService from './timeService';
import UserService from './userService';
import PlanService from './planService';
import PushService from './pushService';

const service = {
	time: new TimeService(axiosInstance),
	plan: new PlanService(axiosInstance),
	user: new UserService(axiosInstance),
	webPush: new PushService(axiosInstance),
};

export default service;
