export * from './auth';
export * from './cart';
export * from './products';
export * from './user';
import {combineEpics} from 'redux-observable';
import {authEpics, cartEpics, productsEpics, userEpics} from './';

export const rootEpic = combineEpics(
  authEpics,
  cartEpics,
  productsEpics,
  userEpics,
);
