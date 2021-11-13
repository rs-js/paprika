import {Action, Order, Product} from '../';

export interface CartItem {
  id: string;
  productId: string;
  userId: number;
  quantity: number;
  cost: number;
  product: Product;
  total?: number;
}

export interface CartOrderItem {
  id: string;
  productId: string;
  userId: number;
  quantity: number;
  cost: number;
}

export type CartLocalItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  cost: number;
};

export interface OrderRequest {
  paymentId: string;
  time: string;
  cart: CartOrderItem[];
  address: string;
  deliveryId: string;
  deliveryPrice: number;
}

export const cartActions = {
  fetchCart: () => ({
    type: Action.FETCH_CART_REQUEST,
  }),
  fetchCartFulfilled: (data: CartItem[]) => ({
    type: Action.FETCH_CART_FULFILLED,
    data: {cart: data},
  }),
  fetchCartRejected: (error: string) => ({
    type: Action.FETCH_CART_REJECTED,
    error,
  }),
  addToCart: (productId: string, quantity: number, cost: number) => ({
    type: Action.ADD_TO_CART_REQUEST,
    payload: {productId, quantity, cost},
  }),
  addToCartRejected: (error: string) => ({
    type: Action.ADD_TO_CART_REJECTED,
    error,
  }),
  removeFromCart: (payload: string) => ({
    type: Action.REMOVE_FROM_CART_REQUEST,
    payload,
  }),
  removeFromCartRejected: (error: string) => ({
    type: Action.REMOVE_FROM_CART_REJECTED,
    error,
  }),
  updateCart: (id: string, quantity: number) => ({
    type: Action.UPDATE_CART_REQUEST,
    payload: {id, quantity},
  }),
  updateCartRejected: (error: string) => ({
    type: Action.UPDATE_CART_REJECTED,
    error,
  }),
  updateLocalCart: (cart: CartLocalItem[]) => ({
    type: Action.UPDATE_LOCAL_CART_REQUEST,
    data: {cart},
  }),
  fetchOrders: () => ({
    type: Action.FETCH_ORDERS_REQUEST,
  }),
  fetchOrdersFulfilled: (data: Order[]) => ({
    type: Action.FETCH_ORDERS_FULFILLED,
    data: {orders: data},
  }),
  fetchOrdersRejected: (error: string) => ({
    type: Action.FETCH_ORDERS_REJECTED,
    error,
  }),
  addCashOrder: (payload: OrderRequest) => ({
    type: Action.ADD_CASH_ORDER_REQUEST,
    payload,
  }),
  addCashOrderRejected: (error: string) => ({
    type: Action.ADD_CASH_ORDER_REJECTED,
    error,
  }),
  addBankOrder: (payload: OrderRequest) => ({
    type: Action.ADD_BANK_ORDER_REQUEST,
    payload,
  }),
  addBankOrderRejected: (error: string) => ({
    type: Action.ADD_BANK_ORDER_REJECTED,
    error,
  }),
};
