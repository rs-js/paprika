import {StateObservable, combineEpics, ofType} from 'redux-observable';
import {of, Observable} from 'rxjs';
import {map, mergeMap, catchError, withLatestFrom} from 'rxjs/operators';
import {api, Action, OAction, cartActions, IState} from '../';
import {Route, navigate} from '../../navigation';

const headers = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

const cartEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.FETCH_CART_REQUEST),
    mergeMap(() =>
      api.cart.getCart({headers: headers(store$.value.token)}).pipe(
        map(cartActions.fetchCartFulfilled),
        catchError(({message}) => of(cartActions.fetchCartRejected(message))),
      ),
    ),
  );

const addToCartEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.ADD_TO_CART_REQUEST),
    withLatestFrom(store$),
    mergeMap(([{payload}, store]) =>
      api.cart.addToCart(payload, {headers: headers(store.token)}).pipe(
        map(cartActions.fetchCart),
        catchError(({message}) => of(cartActions.addToCartRejected(message))),
      ),
    ),
  );

const removeFromCartEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.REMOVE_FROM_CART_REQUEST),
    mergeMap(({payload}) =>
      api.cart
        .removeFromCart({
          data: {id: payload},
          headers: headers(store$.value.token),
        })
        .pipe(
          map(cartActions.fetchCart),
          catchError(({message}) =>
            of(cartActions.removeFromCartRejected(message)),
          ),
        ),
    ),
  );

const updateCartEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.UPDATE_CART_REQUEST),
    mergeMap(({payload}) =>
      api.cart
        .updateCart(
          {data: {quantity: payload.quantity}, query: {id: payload.id}},
          {
            headers: headers(store$.value.token),
          },
        )
        .pipe(
          map(cartActions.fetchCart),
          catchError(({message}) =>
            of(cartActions.updateCartRejected(message)),
          ),
        ),
    ),
  );

const ordersEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.FETCH_ORDERS_REQUEST),
    mergeMap(() =>
      api.cart.getOrders({headers: headers(store$.value.token)}).pipe(
        map(cartActions.fetchOrdersFulfilled),
        catchError(({message}) => of(cartActions.fetchOrdersRejected(message))),
      ),
    ),
  );

const addCashOrderEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.ADD_CASH_ORDER_REQUEST),
    mergeMap(({payload}) =>
      api.cart.addOrder(payload, {headers: headers(store$.value.token)}).pipe(
        map(({order}) => {
          navigate(Route.Main, {
            screen: Route.Tracking,
            params: {
              order,
            },
          });
          map(cartActions.fetchCart);
          return cartActions.fetchOrders();
        }),
        catchError(({message}) =>
          of(cartActions.addCashOrderRejected(message)),
        ),
      ),
    ),
  );

const addBankOrderEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.ADD_BANK_ORDER_REQUEST),
    mergeMap(({payload}) =>
      api.cart.addOrder(payload, {headers: headers(store$.value.token)}).pipe(
        map(({order, formUrl}) => {
          navigate(Route.Payment, {order, formUrl});
          return cartActions.fetchOrders();
        }),
        map(cartActions.fetchCart),
        catchError(({message}) =>
          of(cartActions.addBankOrderRejected(message)),
        ),
      ),
    ),
  );

export const cartEpics = combineEpics(
  cartEpic,
  addToCartEpic,
  removeFromCartEpic,
  updateCartEpic,
  ordersEpic,
  addCashOrderEpic,
  addBankOrderEpic,
);
