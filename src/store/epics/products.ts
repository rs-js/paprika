import {ofType, combineEpics, StateObservable} from 'redux-observable';
import {of, Observable} from 'rxjs';
import {map, mergeMap, catchError, debounceTime} from 'rxjs/operators';
import {Action, IState, OAction} from '../types';
import {productsActions} from '../actions';
import {api} from '../api';
import {Toast} from 'native-base';

const headers = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

const catalogEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_CATALOG_REQUEST),
    mergeMap(() =>
      api.products.getCatalog().pipe(
        map(productsActions.fetchCatalogFulfilled),
        catchError(({message}) =>
          of(productsActions.fetchCatalogRejected(message)),
        ),
      ),
    ),
  );

const promoProductsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_PROMO_PRODUCTS_REQUEST),
    mergeMap(() =>
      api.products.getPromoProducts().pipe(
        map(productsActions.fetchPromoProductsFulfilled),
        catchError(({message}) =>
          of(productsActions.fetchPromoProductsRejected(message)),
        ),
      ),
    ),
  );

const productsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_PRODUCTS_REQUEST),
    mergeMap(({payload}) =>
      api.products.getProducts(payload).pipe(
        map(data =>
          productsActions.fetchProductsFulfilled({data, id: payload}),
        ),
        catchError(({message}) =>
          of(productsActions.fetchProductsRejected(message)),
        ),
      ),
    ),
  );

const searchProductsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SEARCH_PRODUCTS_REQUEST),
    debounceTime(500),
    mergeMap(({payload}) =>
      api.products.searchProducts(payload).pipe(
        map(productsActions.searchProductsFulfilled),
        catchError(({message}) =>
          of(productsActions.searchProductsRejected(message)),
        ),
      ),
    ),
  );

const favoriteProductsEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.FETCH_FAVORITES_REQUEST),
    mergeMap(() =>
      api.products
        .getFavoriteProducts({headers: headers(store$.value.token)})
        .pipe(
          map(productsActions.fetchFavoriteProductsFulfilled),
          catchError(({message}) =>
            of(productsActions.fetchFavoriteProductsRejected(message)),
          ),
        ),
    ),
  );

const addFavoriteProductsEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.ADD_TO_FAVORITES_REQUEST),
    mergeMap(({payload}) =>
      api.products
        .addFavoriteProducts(payload, {headers: headers(store$.value.token)})
        .pipe(
          map(productsActions.fetchFavoriteProducts),
          catchError(({message}) =>
            of(productsActions.addToFavoriteProductsRejected(message)),
          ),
        ),
    ),
  );

const removeFavoriteProductsEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.REMOVE_FROM_FAVORITES_REQUEST),
    mergeMap(({payload}) =>
      api.products
        .deleteFavoriteProducts({
          data: {id: payload},
          headers: headers(store$.value.token),
        })
        .pipe(
          map(productsActions.fetchFavoriteProducts),
          catchError(({message}) =>
            of(productsActions.removeFromFavoriteProductsRejected(message)),
          ),
        ),
    ),
  );

export const productsEpics = combineEpics(
  catalogEpic,
  promoProductsEpic,
  productsEpic,
  favoriteProductsEpic,
  addFavoriteProductsEpic,
  removeFavoriteProductsEpic,
  searchProductsEpic,
);
