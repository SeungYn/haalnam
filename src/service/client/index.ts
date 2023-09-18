import { axiosInstance } from '@/network/http';
import TimeService from './timeService';

const service = {
  time: new TimeService(axiosInstance),
};

export default service;
