import axios, { RawAxiosRequestConfig } from 'axios';
import { baseUrl } from './constants';

const config: RawAxiosRequestConfig = { baseURL: baseUrl };
const axiosInstance = axios.create(config);

export const axiosRequest = async ({ ...options }): Promise<any> => {
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    throw error;
  };

  return axiosInstance(options).then(onSuccess).catch(onError);
};
