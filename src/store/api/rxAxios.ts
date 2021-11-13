import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosError,
} from 'axios';
import {Observable} from 'rxjs';
import {Log, platform} from '../../utils';
import {Toast} from 'native-base';

interface Config extends AxiosRequestConfig {
  shouldLogResponse?: boolean;
}

type RequestConfig = {
  method: string;
  url: string;
  body?: object;
  config?: AxiosRequestConfig;
};

class RxAxios {
  private readonly httpClient: AxiosInstance;
  private readonly shouldLogResponse: boolean;

  constructor(private options: Config = {}) {
    // const appName = 'WorldGoodYou';
    const platformName = platform.ios ? 'ios' : 'android';
    // const userAgent = `${appName}/${VersionNumber.appVersion}(${VersionNumber.buildVersion}) ${platformName}/${platform.version}`;
    this.httpClient = axios.create(options);
    // this.httpClient.defaults.headers.common['User-Agent'] = userAgent;
    this.shouldLogResponse = !!options.shouldLogResponse;
  }

  private makeRequest<T>(requestConfig: RequestConfig): Observable<T> {
    let request: AxiosPromise<T>;

    const cancelSource = axios.CancelToken.source();
    // const config: AxiosRequestConfig = {
    //   ...requestConfig.config,
    //   cancelToken: cancelSource.token,
    //   timeout: 10000,
    // };

    switch (requestConfig.method) {
      case 'GET':
        request = this.httpClient.get<T>(
          requestConfig.url,
          requestConfig.config,
        );
        break;
      case 'POST':
        request = this.httpClient.post<T>(
          requestConfig.url,
          requestConfig.body,
          requestConfig.config,
        );
        break;
      case 'PUT':
        request = this.httpClient.put<T>(
          requestConfig.url,
          requestConfig.body,
          requestConfig.config,
        );
        break;
      case 'PATCH':
        request = this.httpClient.patch<T>(
          requestConfig.url,
          requestConfig.body,
          requestConfig.config,
        );
        break;
      case 'DELETE':
        request = this.httpClient.delete(
          requestConfig.url,
          requestConfig.config,
        );
        break;

      default:
        throw new Error('Method not supported');
    }

    return Observable.create((observer) => {
      request
        .then((response) => {
          if (this.shouldLogResponse) {
            this.logResponse(requestConfig, response);
          }
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError) => {
          Toast.show({
            text: error.response?.data.message,
            type: 'danger',
            duration: 3000,
          });
          observer.error(error);
          observer.complete();
        });

      return () =>
        cancelSource.cancel(
          `Request ${requestConfig.method} ${requestConfig.url} canceled`,
        );
    });
  }

  public get<T>(url: string, config?: AxiosRequestConfig, body?: object) {
    return this.makeRequest<T>({method: 'GET', url, config, body});
  }

  public post<T>(url: string, body: object, config?: AxiosRequestConfig) {
    return this.makeRequest<T>({method: 'POST', url, body, config});
  }

  public put<T>(url: string, body: object, config?: AxiosRequestConfig) {
    return this.makeRequest<T>({method: 'PUT', url, body, config});
  }

  public patch<T>(url: string, body: object, config?: AxiosRequestConfig) {
    return this.makeRequest<T>({method: 'PATCH', url, body, config});
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.makeRequest({method: 'DELETE', url, config});
  }

  private getHost() {
    return this.httpClient.defaults.baseURL
      .replace('https://', '')
      .replace('http://', '');
  }

  private logResponse(requestConfig: RequestConfig, response: any) {
    const {headers} = requestConfig.config;
    const responseData = response.data;
    const host = this.getHost();

    const getDescription = (obj) =>
      Object.keys(obj).reduce(
        (previous, current) => previous + current + ': ' + obj[current] + '\n',
        '',
      );

    const info =
      `${requestConfig.method.toUpperCase()} ${requestConfig.url}\n` +
      `Host: ${host}\n` +
      (headers ? getDescription(headers) + '\n' : '') +
      (requestConfig.body ? getDescription(requestConfig.body) : '') +
      (responseData
        ? '\n\nResponse:\n' + JSON.stringify(responseData, null, 2)
        : '');

    Log.message(info);
  }

  private logError(requestConfig: RequestConfig, error: any) {
    const {headers} = requestConfig.config;
    const statusCode = error.response && error.response.status;
    const message = error.response && error.response.data;
    const host = this.getHost();

    const getDescription = (obj) =>
      Object.keys(obj).reduce(
        (previous, current) => previous + current + ': ' + obj[current] + '\n',
        '',
      );

    const failed = statusCode ? `[Failed ${statusCode}]` : '[Failed]';

    const info =
      `${failed} ${requestConfig.method.toUpperCase()} ${requestConfig.url}\n` +
      `Host: ${host}\n` +
      (headers ? getDescription(headers) + '\n' : '') +
      (requestConfig.body ? getDescription(requestConfig.body) : '') +
      '\n\nStatus: ' +
      statusCode +
      (message ? '\nMessage: ' + JSON.stringify(message, null, 2) : '');

    Log.message(info);
  }
}

export {RxAxios};
