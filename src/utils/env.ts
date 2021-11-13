import {Constants} from './constants';

type EnvironmentType = 'development' | 'production';

interface IEnvironment {
  readonly baseUrl: string;
  readonly supportMail: string;
}

const devEnvironment: IEnvironment = {
  baseUrl: Constants.baseURL,
  supportMail: 'm9871791321@gmail.com',
};

const prodEnvironment: IEnvironment = {
  baseUrl: Constants.baseURL,
  supportMail: 'm9871791321@gmail.com',
};

const environments = {
  development: devEnvironment,
  production: prodEnvironment,
};

const currentEnvironment: EnvironmentType = 'production';

export const Environment: IEnvironment = environments[currentEnvironment];
