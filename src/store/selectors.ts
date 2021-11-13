import {createSelector} from 'reselect';
import {IState} from './types';
import {composeStorageAddress} from '../utils';
import {Order} from './api';
import {SortProducts} from '../components';

const authSelectors = {
  auth: createSelector(
    (state: IState) => state,
    ({exists, phoneNumber, token}) => ({exists, phoneNumber, token}),
  ),
  token: createSelector(
    (state: IState) => state.token,
    (data) => data,
  ),
  pending: createSelector(
    (state: IState) => state.pending,
    (pending) => pending,
  ),
  error: createSelector(
    (state: IState) => state.error,
    (error) => error,
  ),
};

const cartSelectors = {
  cartData: createSelector(
    (state: IState) => state.cart,
    (data) => ({
      cart: data,
      cartOrder: data.map(({id, userId, productId, quantity, cost}) => ({
        id,
        userId,
        productId,
        quantity,
        cost,
      })),
      cartAmount: data.reduce(
        (a, b) => a + (b.product.cost * b.quantity || 0),
        0,
      ),
      cartLength: data.length,
    }),
  ),
  updatedLocalCart: createSelector(
    (state: IState) => state.cart,
    (_: IState, cartItem: {id: string; quantity: number}) => cartItem,
    (data, {id, quantity}) =>
      data.map((item) => (item.id === id ? {...item, quantity} : item)),
  ),
  removeFromLocalCart: createSelector(
    (state: IState) => state.cart,
    (_: IState, id: string) => id,
    (data, id) => data.filter((item) => item.id !== id),
  ),
  sameProductInCart: createSelector(
    (state: IState) => state.cart,
    (_: IState, productId: string) => productId,
    (data, productId) => data.some((item) => item.productId === productId),
  ),
  updatedLocalCartProduct: createSelector(
    (state: IState) => state.cart,
    (_: IState, cartItem: {id: string; quantity: number}) => cartItem,
    (data, {id, quantity}) =>
      data.map((item) =>
        item.id === id ? {...item, quantity: item.quantity + quantity} : item,
      ),
  ),
  cartProductId: createSelector(
    (state: IState) => state.cart,
    (_: IState, productId: string) => productId,
    (data, productId) => {
      const index = data.findIndex(({product}) => product.id === productId);
      return data[index];
    },
  ),
};

const productsSelectors = {
  catalog: createSelector(
    (state: IState) => state.catalog,
    (data) => data,
  ),
  products: createSelector(
    (state: IState) => state.products,
    (_: IState, payload: {id: string; sort: SortProducts}) => payload,
    (data, {id, sort}) =>
      sort.default
        ? data[id]
        : sort.price.enabled
        ? sort.price.asc
          ? [...data[id]].sort((a, b) => a.cost - b.cost)
          : [...data[id]].sort((a, b) => b.cost - a.cost)
        : sort.alpha.asc
        ? [...data[id]].sort((a, b) => a.title.localeCompare(b.title))
        : [...data[id]].sort((a, b) => b.title.localeCompare(a.title)),
  ),
  promoProducts: createSelector(
    (state: IState) => state.promoProducts,
    (data) => data.flatMap(({product}) => product),
  ),
  foundProducts: createSelector(
    (state: IState) => state.foundProducts,
    (_: IState, sort: SortProducts) => sort,
    (data, sort) =>
      sort.default
        ? data
        : sort.price.enabled
        ? sort.price.asc
          ? [...data].sort((a, b) => a.cost - b.cost)
          : [...data].sort((a, b) => b.cost - a.cost)
        : sort.alpha.asc
        ? [...data].sort((a, b) => a.title.localeCompare(b.title))
        : [...data].sort((a, b) => b.title.localeCompare(a.title)),
  ),
  favoriteProducts: createSelector(
    (state: IState) => state.favoriteProducts,
    (data) => data,
  ),
  isFavoriteProduct: createSelector(
    (state: IState) => state.favoriteProducts,
    (_: IState, id: string) => id,
    (data, id) => data.find(({productId}) => productId === id),
  ),
  updatedLocalFavoriteProducts: createSelector(
    (state: IState) => state.favoriteProducts,
    (_: IState, productId: string) => productId,
    (data, productId) => data.filter((item) => item.productId !== productId),
  ),
};

const userSelectors = {
  suggestions: createSelector(
    (state: IState) => state.suggestions,
    (data) => data,
  ),
  orderInfo: createSelector(
    (state: IState) => state.refs,
    (_: IState, order: Order) => order,
    (data, {paymentId, status, deliveryId, cart}) => ({
      paymentType:
        data.payments[data.payments.findIndex(({id}) => paymentId === id)]
          .value,
      status,
      deliveryType:
        data.delivery[data.delivery.findIndex(({id}) => deliveryId === id)]
          .value,
      deliveryPrice:
        data.delivery[data.delivery.findIndex(({id}) => deliveryId === id)]
          .price,
      cartAmount: cart.reduce((a, b) => a + b.total, 0),
    }),
  ),
  refs: createSelector(
    (state: IState) => state.refs,
    ({delivery, payments, delivery_term, settings}) => ({
      deliveries: delivery.map(({id, value, price}) => ({
        label: value,
        value: id,
        price,
      })),
      delivery_term: delivery_term.map(({id, value}) => ({
        label: value,
        value: id,
      })),
      payments: payments.map(({id, value}) => ({
        label: value,
        value: id,
      })),
      settings,
    }),
  ),
  user: createSelector(
    (state: IState) => state.user,
    ({id, name, email, phoneNumber, addresses}) => ({
      id,
      name,
      email,
      phoneNumber,
      addresses,
      fullAddresses: addresses.map((item) => ({
        label: composeStorageAddress(item),
        value: item.id,
      })),
    }),
  ),
  reviews: createSelector(
    (state: IState) => state.reviews,
    (data) => data,
  ),
  orders: createSelector(
    (state: IState) => state.orders,
    (data) => ({
      sortedOrders: data.sort(function (a, b) {
        let keyA = new Date(a.createdAt),
          keyB = new Date(b.createdAt);
        if (keyA < keyB) {
          return 1;
        }
        if (keyA > keyB) {
          return -1;
        }
        return 0;
      }),
    }),
  ),
};

export {authSelectors, cartSelectors, productsSelectors, userSelectors};
