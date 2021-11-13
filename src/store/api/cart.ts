import {RxAxios} from './';
import {map} from 'rxjs/operators';
import {AxiosRequestConfig} from 'axios';
import {OrderRequest} from '../actions';

interface OrderCartItem {
  id: string;
  cost: number;
  total: number;
  userId: string;
  quantity: number;
  productId: string;
  product: {
    id: string;
    code: number;
    title: string;
    description: string;
    image: null;
    unit: string;
    cost: number;
    oldCost: number;
    maxCount: number;
    categoryId: string;
    createdAt: Date;
    productId: string;
    available: boolean;
  };
}

export interface Order {
  id: string;
  userId: string;
  time: string;
  cart: OrderCartItem[];
  closedAt: null;
  address: string;
  phoneNumber: string;
  email: string;
  paymentId: string;
  deliveryId: string;
  deliveryPrice: number;
  checkNumber: null;
  linkNumber: null;
  cardNumber: null;
  payResult: null;
  description: null;
  storageId: string;
  number: null;
  status: number;
  createdAt: Date;
  orderNumber: string;
}

interface OrderResponse {
  formUrl?: string;
  order: Order;
}

export class CartAPI {
  constructor(private rxAxios: RxAxios) {}

  getCart = (config: AxiosRequestConfig) =>
    this.rxAxios.get('/cart/list', config).pipe(map((data) => data));

  addToCart = (payload: object, config: AxiosRequestConfig) =>
    this.rxAxios.post('/cart/one', payload, config).pipe(map((data) => data));

  removeFromCart = (config: AxiosRequestConfig) =>
    this.rxAxios.delete('/cart/one', config).pipe(map((data) => data));

  updateCart = (payload: object, config: AxiosRequestConfig) =>
    this.rxAxios.put('/cart/one', payload, config).pipe(map((data) => data));

  getOrders = (config: AxiosRequestConfig) =>
    this.rxAxios
      .get('/orders/mine', config)
      .pipe(map((data) => (Array.isArray(data) ? data : [])));

  addOrder = (payload: OrderRequest, config: AxiosRequestConfig) =>
    this.rxAxios
      .post<OrderResponse>('/orders/mine', payload, config)
      .pipe(map((data) => data));
}
