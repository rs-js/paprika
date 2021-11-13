import {Action, IAction, IState} from './types';
import {Reducer} from 'redux';

const defaultState = {
  token: null,
  pending: false,
  error: null,
  products: {},
  favoriteProducts: [],
  foundProducts: [],
  cart: [],
  orders: [],
  bank: {},
  user: {name: '', phoneNumber: '', email: '', addresses: []},
  suggestions: {streets: [], houses: []},
  exists: false,
  phoneNumber: '',
};

// @ts-ignore
const initialState: IState = {
  ...defaultState,
  catalog: [],
  products: {},
  promoProducts: [],
  reviews: [],
  refs: {
    delivery: [],
    payments: [],
    delivery_term: [],
    settings: {
      email: '',
      last_upload: '',
      order_digits_quantity: '',
      order_prefix: '',
      phone: '',
    },
  },
};

export const rootReducer: Reducer<IState, IAction> = (
  state = initialState,
  {data, type, error}: IAction,
): IState => {
  switch (type) {
    case Action.SIGN_UP_REQUEST:
    case Action.SIGN_IN_WITH_PHONE_NUMBER_REQUEST:
    case Action.CHECK_PHONE_NUMBER_REQUEST:
    case Action.VERIFY_PHONE_NUMBER_REQUEST:
    case Action.EDIT_USER_DATA_REQUEST:
    case Action.ADD_CASH_ORDER_REQUEST:
    case Action.ADD_BANK_ORDER_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case Action.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        pending: true,
        foundProducts: [],
        error: null,
      };
    case Action.FETCH_CATALOG_FULFILLED:
    case Action.SEARCH_PRODUCTS_FULFILLED:
    case Action.FETCH_PROMO_PRODUCTS_FULFILLED:
    case Action.SIGN_IN_FULFILLED:
    case Action.FETCH_CART_FULFILLED:
    case Action.UPDATE_LOCAL_FAVORITES_REQUEST:
    case Action.UPDATE_LOCAL_CART_REQUEST:
    case Action.FETCH_FAVORITES_FULFILLED:
    case Action.FETCH_REVIEWS_FULFILLED:
    case Action.FETCH_ORDERS_FULFILLED:
    case Action.FETCH_USER_DATA_FULFILLED:
    case Action.FETCH_REFS_FULFILLED:
      return {
        ...state,
        ...data,
        pending: false,
        error: null,
      };
    case Action.CHECK_PHONE_NUMBER_FULFILLED:
      return {
        ...state,
        ...data,
        error: null,
      };
    case Action.VERIFY_PHONE_NUMBER_FULFILLED:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case Action.FETCH_HOUSES_REQUEST:
    case Action.FETCH_STREETS_REQUEST:
    case Action.FETCH_STREETS_FULFILLED:
    case Action.FETCH_HOUSES_FULFILLED:
      return {
        ...state,
        pending: false,
        [data.type]: {...state[data.type], [data.subtype]: data.suggestions},
        error: null,
      };
    case Action.FETCH_PRODUCTS_FULFILLED:
      return {
        ...state,
        pending: false,
        products: {...state.products, [data.id]: data.data},
        error: null,
      };
    case Action.SIGN_OUT_FULFILLED:
      return {
        ...state,
        ...defaultState,
        pending: false,
        error: null,
      };
    case Action.FETCH_FAVORITES_REJECTED:
    case Action.ADD_TO_FAVORITES_REJECTED:
    case Action.ADD_BANK_ORDER_REJECTED:
    case Action.ADD_CASH_ORDER_REJECTED:
    case Action.FETCH_ORDERS_REJECTED:
    case Action.ADD_TO_CART_REJECTED:
    case Action.REMOVE_FROM_CART_REJECTED:
    case Action.UPDATE_CART_REJECTED:
    case Action.FETCH_CART_REJECTED:
    case Action.FETCH_CATALOG_REJECTED:
    case Action.FETCH_PRODUCTS_REJECTED:
    case Action.SEARCH_PRODUCTS_REJECTED:
    case Action.FETCH_PROMO_PRODUCTS_REJECTED:
    case Action.SIGN_IN_WITH_PHONE_NUMBER_REJECTED:
    case Action.CHECK_PHONE_NUMBER_REJECTED:
    case Action.VERIFY_PHONE_NUMBER_REJECTED:
    case Action.SIGN_UP_REJECTED:
    case Action.SIGN_IN_REJECTED:
    case Action.SIGN_IN_WITH_APPLE_REJECTED:
    case Action.SIGN_IN_WITH_GOOGLE_REJECTED:
    case Action.FETCH_USER_DATA_REJECTED:
    case Action.EDIT_USER_DATA_REJECTED:
    case Action.ADD_REVIEW_REJECTED:
    case Action.FETCH_REVIEWS_REJECTED:
    case Action.SIGN_OUT_REJECTED:
    case Action.FETCH_STREETS_REJECTED:
    case Action.FETCH_HOUSES_REJECTED:
    case Action.FETCH_REFS_REJECTED:
      return {
        ...state,
        pending: false,
        error,
      };
    default:
      return state;
  }
};
