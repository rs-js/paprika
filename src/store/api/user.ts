import {RxAxios} from './rxAxios';
import {map} from 'rxjs/operators';
import {ResponseMapper} from './responseMapper';
import {AxiosRequestConfig} from 'axios';
import {Constants} from '../../utils';

export interface User {
  id?: number;
  name: string;
  phoneNumber: string;
  email: string;
  addresses: Address[];
}

export interface Delivery {
  id: string;
  price: number;
  value: string;
}

export interface Payment {
  id: string;
  value: string;
}

export interface DeliveryTerm {
  id: string;
  value: string;
}

export interface Settings {
  card_payment_id: string;
  email: string;
  last_upload: string;
  order_digits_quantity: string;
  order_prefix: string;
  phone: string;
}

export interface Address {
  id?: string;
  city: string;
  street: string;
  house: string;
  building: string;
  corpus: string;
  porch: string;
  intercomCode: string;
  floor: string;
  apartment: string;
  comment: string;
}

export interface Review {
  id: string;
  userId?: number;
  user: User;
  comment: string;
  rate: number;
  reply?: string;
  createdAt: string;
}

export interface ReviewItem {
  rate: number;
  comment: string;
}

export interface Refs {
  delivery: Delivery[];
  payments: Payment[];
  delivery_term: DeliveryTerm[];
  settings: Settings;
}

export class UserAPI {
  constructor(private rxAxios: RxAxios) {}

  dadaTaHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + Constants.daDataToken,
  };

  getRefsList = () =>
    this.rxAxios.get('/refs/list').pipe(map(ResponseMapper.getData));

  getReviews = () =>
    this.rxAxios.get('/reviews/list').pipe(map(ResponseMapper.getData));

  addReview = (payload: ReviewItem, config: AxiosRequestConfig) =>
    this.rxAxios
      .post('/reviews/one', payload, config)
      .pipe(map(ResponseMapper.getData));

  getUserData = (config: AxiosRequestConfig) =>
    this.rxAxios.get('/users/me', config).pipe(map(ResponseMapper.getData));

  editUserData = (payload: User, config: AxiosRequestConfig) =>
    this.rxAxios
      .put('/users/me', payload, config)
      .pipe(map(ResponseMapper.getData));

  getDaDataStreets = (query: string) =>
    this.rxAxios
      .post(
        Constants.daDataUrl,
        {
          query,
          count: 5,
          restrict_value: true,
          from_bound: {
            value: 'street',
          },
          to_bound: {
            value: 'street',
          },
          locations: [
            {
              city: Constants.city,
            },
          ],
        },
        {headers: this.dadaTaHeaders},
      )
      .pipe(map(ResponseMapper.getData));

  getDaDataHouses = ({house, id}: {house: string; id: string}) =>
    this.rxAxios
      .post(
        Constants.daDataUrl,
        {
          query: house,
          count: 5,
          restrict_value: true,
          from_bound: {
            value: 'house',
          },
          locations: [
            {
              street_fias_id: id,
            },
          ],
        },
        {headers: this.dadaTaHeaders},
      )
      .pipe(map(ResponseMapper.getData));
}
