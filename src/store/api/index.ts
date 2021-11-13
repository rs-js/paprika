export * from './auth';
export * from './cart';
export * from './products';
export * from './responseMapper';
export * from './rxAxios';
export * from './user';
import {RxAxios, AuthAPI, ProductsAPI, UserAPI, CartAPI} from './';
import {Environment} from '../../utils';

const rxAxios = new RxAxios({
  baseURL: Environment.baseUrl,
  // shouldLogResponse: Debug.shouldLogResponse,
});

class API {
  auth = new AuthAPI(rxAxios);
  cart = new CartAPI(rxAxios);
  products = new ProductsAPI(rxAxios);
  user = new UserAPI(rxAxios);
}

export const api = new API();
