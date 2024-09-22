import {SERVER_BASE_URL} from '@env';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {useCallback, useEffect, useState} from 'react';

export interface fetchDataProps extends AxiosRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: object;
  headers?: AxiosRequestConfig['headers'];
}

const useCustomFetch = () => {
  const [data, setData] = useState<Object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{status: boolean; message: any}>({
    status: false,
    message: null,
  });

  const handleError = () => setError({status: false, message: null});

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
  });

  let controller = new AbortController();

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, []);

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Note:
  // req interceptors are async by default, use { synchronous: true } option to run sync and avoid req exec delay
  // add a runWhen func to the options object to execute a particular interceptor based on a runtime check like config.method === 'GET' or 'POST' etc

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // triggers when response status code within 2XX
      return response;
    },
    error => {
      // triggers when response status code outside range of 2XX
      return Promise.reject(error);
    },
  );

  const fetchData = useCallback(
    async ({
      method,
      url,
      data = {},
      headers = {'Content-Type': 'application/json'},
      ...configs
    }: fetchDataProps) => {
      setLoading(true);
      handleError();
      controller.abort(); // aborts any existing controllers to create new instance below on func trigger
      controller = new AbortController();
      try {
        const result: AxiosResponse = await axiosInstance<AxiosRequestConfig>({
          url,
          method,
          data,
          headers,
          signal: controller.signal,
          ...configs,
        });
        setData(result.data);
        return result;
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.info('axios request cancelled ::: ', error.message);
        } else {
          setError({
            status: true,
            message:
              error.response.data.message ||
              'Something went wrong! Please try later',
          });
          console.error('axios fetch error ::: ', error.response.data);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {data, loading, error, handleError, fetchData};
};

export default useCustomFetch;
