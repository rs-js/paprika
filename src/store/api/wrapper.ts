import axios, {AxiosPromise} from 'axios';
import qs from 'qs';
// import {configureStore} from '../store';
import {Constants} from '../../utils/constants';

axios.defaults.baseURL = Constants.baseURL;

interface IAuthHeaders {
  Authorization?: string;
}

interface IApiRouter {
  get: <T>(route: string, query?: object, options?: object) => AxiosPromise<T>;
  post: <T>(route: string, data: object, options?: object) => AxiosPromise<T>;
  put: <T>(
    route: string,
    data: object,
    query?: object,
    options?: object,
  ) => AxiosPromise<T>;
  delete: <T>(
    route: string,
    query: object,
    options?: object,
  ) => AxiosPromise<T>;
}

const apiURL = (root: string) => (route: string): string => `/${root + route}`;
// const getToken = (): string | null => store.getState().token;

const authHeaders = (): IAuthHeaders => {
  // const token = getToken();

  // if (token) {
  //   return {
  //     Authorization: `Bearer ${token}`,
  //   };
  // }

  return {};
};

const wrapper = (root: string): IApiRouter => {
  const rootURL = apiURL(root);
  return {
    get: <T>(route: string, query = {}, options = {}): AxiosPromise<T> =>
      axios.get(`${rootURL(route)}?${qs.stringify(query)}`, {
        headers: authHeaders(),
        ...options,
      }),
    post: <T>(route: string, data: {}, options = {}): AxiosPromise<T> =>
      axios.post(`${rootURL(route)}`, data, {
        headers: authHeaders(),
        ...options,
      }),
    put: <T>(
      route: string,
      data: {},
      query?: {},
      options = {},
    ): AxiosPromise<T> =>
      axios.put(
        `${rootURL(route)}`,
        {data, query},
        {
          headers: authHeaders(),
          ...options,
        },
      ),
    delete: <T>(route: string, query: {}, options = {}): AxiosPromise<T> =>
      axios.delete(`${rootURL(route)}`, {
        data: query,
        headers: authHeaders(),
        ...options,
      }),
  };
};

export default wrapper;
