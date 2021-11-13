import {Action, LocalFavoriteItem, Category, Product, Favorite} from '../';

export const productsActions = {
  fetchCatalog: () => ({
    type: Action.FETCH_CATALOG_REQUEST,
  }),
  fetchCatalogFulfilled: (data: Category[]) => ({
    type: Action.FETCH_CATALOG_FULFILLED,
    data: {suggestions: {streets: [], houses: []}, catalog: data},
  }),
  fetchCatalogRejected: (error: string) => ({
    type: Action.FETCH_CATALOG_REJECTED,
    error,
  }),
  fetchPromoProducts: () => ({
    type: Action.FETCH_PROMO_PRODUCTS_REQUEST,
  }),
  fetchPromoProductsFulfilled: (data: Product[]) => ({
    type: Action.FETCH_PROMO_PRODUCTS_FULFILLED,
    data: {promoProducts: data},
  }),
  fetchPromoProductsRejected: (error: string) => ({
    type: Action.FETCH_PROMO_PRODUCTS_REJECTED,
    error,
  }),
  fetchProducts: (payload: string) => ({
    type: Action.FETCH_PRODUCTS_REQUEST,
    payload,
  }),
  fetchProductsFulfilled: (data: object) => ({
    type: Action.FETCH_PRODUCTS_FULFILLED,
    data,
  }),
  fetchProductsRejected: (error: string) => ({
    type: Action.FETCH_PRODUCTS_REJECTED,
    error,
  }),
  searchProducts: (searchQuery: string, categoryId: string) => ({
    type: Action.SEARCH_PRODUCTS_REQUEST,
    payload: {searchQuery, categoryId},
  }),
  searchProductsFulfilled: (data: object) => ({
    type: Action.SEARCH_PRODUCTS_FULFILLED,
    data: {foundProducts: data},
  }),
  searchProductsRejected: (error: string) => ({
    type: Action.SEARCH_PRODUCTS_REJECTED,
    error,
  }),
  sortProductsByPrice: () => ({
    type: Action.SORT_PRODUCTS_BY_PRICE_REQUEST,
  }),
  fetchFavoriteProducts: () => ({
    type: Action.FETCH_FAVORITES_REQUEST,
  }),
  fetchFavoriteProductsFulfilled: (data: Favorite[]) => ({
    type: Action.FETCH_FAVORITES_FULFILLED,
    data: {favoriteProducts: data},
  }),
  fetchFavoriteProductsRejected: (error: string) => ({
    type: Action.FETCH_FAVORITES_REJECTED,
    error,
  }),
  updateLocalFavoriteProducts: (favoriteProducts: LocalFavoriteItem[]) => ({
    type: Action.UPDATE_LOCAL_FAVORITES_REQUEST,
    data: {favoriteProducts},
  }),
  addToFavoriteProducts: (payload: string) => ({
    type: Action.ADD_TO_FAVORITES_REQUEST,
    payload,
  }),
  addToFavoriteProductsRejected: (error: string) => ({
    type: Action.ADD_TO_FAVORITES_REJECTED,
    error,
  }),
  removeFromFavoriteProducts: (payload: string) => ({
    type: Action.REMOVE_FROM_FAVORITES_REQUEST,
    payload,
  }),
  removeFromFavoriteProductsRejected: (error: string) => ({
    type: Action.REMOVE_FROM_FAVORITES_REJECTED,
    error,
  }),
};
