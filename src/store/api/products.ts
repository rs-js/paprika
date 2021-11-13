import {RxAxios} from './rxAxios';
import {map} from 'rxjs/operators';
import {ResponseMapper} from './responseMapper';
import qs from 'qs';
import {AxiosRequestConfig} from 'axios';

export interface Product {
  id: string;
  title: string;
  description: string;
  categoryId: number;
  cost: number;
  oldCost: number;
  available: boolean;
  image: string;
  code: string;
  createdAt: string;
  unit: string;
  productId: string;
  maxCount: number;
}

export interface PromoProducts {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  product: Product[];
}

export interface SearchQuery {
  searchQuery: string;
  categoryId: string;
}

export interface Category {
  id: string;
  index: number;
  title: string;
  image?: string;
  parentId?: Category['id'];
  children: Category[];
}

export interface Favorite {
  id: string;
  productId: string;
  product: Product;
  userId: number;
}

export type LocalFavoriteItem = {
  id: string;
  productId: string;
  product: Product;
};

export class ProductsAPI {
  constructor(private rxAxios: RxAxios) {}

  getCatalog = () =>
    this.rxAxios.get('/categories/list').pipe(map(ResponseMapper.getCatalog));

  getPromoProducts = () =>
    this.rxAxios
      .get('/actions/filtered')
      .pipe(map(ResponseMapper.getPromoProducts));

  getProducts = (categoryId: string) =>
    this.rxAxios
      .get(`/products/list?${qs.stringify({where: {categoryId}})}`)
      .pipe(map(ResponseMapper.getProducts));

  getFavoriteProducts = (config: AxiosRequestConfig) =>
    this.rxAxios
      .get('/favorites/list', config)
      .pipe(map(ResponseMapper.getProducts));

  addFavoriteProducts = (productId: string, config: AxiosRequestConfig) =>
    this.rxAxios
      .post('/favorites/one', {productId}, config)
      .pipe(map(ResponseMapper.getProducts));

  deleteFavoriteProducts = (config: AxiosRequestConfig) =>
    this.rxAxios
      .delete('/favorites/one', config)
      .pipe(map(ResponseMapper.getProducts));

  searchProducts = ({searchQuery, categoryId}: SearchQuery) => {
    const where: {[key: string]: any} = {
      title: {
        $ilike: `%${searchQuery}%`,
      },
    };
    if (categoryId) {
      where.categoryId = categoryId;
    }
    const orderBy = {createdAt: -1};
    return this.rxAxios
      .get(`/products/list?${qs.stringify({orderBy, where})}`)
      .pipe(map(ResponseMapper.getProducts));
  };
}
