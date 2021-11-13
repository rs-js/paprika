import {Action, User, Review, ReviewItem, Refs} from '../';

export const userActions = {
  fetchRefsList: () => ({
    type: Action.FETCH_REFS_REQUEST,
  }),
  fetchRefsFulfilled: (data: Refs[]) => ({
    type: Action.FETCH_REFS_FULFILLED,
    data: {refs: data},
  }),
  fetchRefsRejected: (error: string) => ({
    type: Action.FETCH_REFS_REJECTED,
    error,
  }),
  fetchReviews: () => ({
    type: Action.FETCH_REVIEWS_REQUEST,
  }),
  fetchReviewsFulfilled: (data: Review[]) => ({
    type: Action.FETCH_REVIEWS_FULFILLED,
    data: {reviews: data},
  }),
  fetchReviewsRejected: (error: string) => ({
    type: Action.FETCH_REVIEWS_REJECTED,
    error,
  }),
  addReview: (payload: ReviewItem) => ({
    type: Action.ADD_REVIEW_REQUEST,
    payload,
  }),
  addReviewRejected: (error: string) => ({
    type: Action.ADD_REVIEW_REJECTED,
    error,
  }),
  fetchUserData: () => ({
    type: Action.FETCH_USER_DATA_REQUEST,
  }),
  fetchUserDataFulfilled: (data: User) => ({
    type: Action.FETCH_USER_DATA_FULFILLED,
    data: {user: data},
  }),
  fetchUserDataRejected: (error: string) => ({
    type: Action.FETCH_USER_DATA_REJECTED,
    error,
  }),
  editUserData: (payload: User) => ({
    type: Action.EDIT_USER_DATA_REQUEST,
    payload,
  }),
  editUserDataRejected: (error: string) => ({
    type: Action.EDIT_USER_DATA_REJECTED,
    error,
  }),
  fetchDaDataStreets: (payload: string) => ({
    type: Action.FETCH_STREETS_REQUEST,
    payload,
    data: {
      type: 'suggestions',
      subtype: 'streets',
      suggestions: [],
    },
  }),
  fetchDaDataStreetsFulfilled: ({suggestions}: any) => ({
    type: Action.FETCH_STREETS_FULFILLED,
    data: {
      type: 'suggestions',
      subtype: 'streets',
      suggestions,
    },
  }),
  fetchDaDataStreetsRejected: (error: string) => ({
    type: Action.FETCH_STREETS_REJECTED,
    error,
  }),
  fetchDaDataHouses: (house: string, id: string) => ({
    type: Action.FETCH_HOUSES_REQUEST,
    payload: {house, id},
    data: {
      type: 'suggestions',
      subtype: 'houses',
      suggestions: [],
    },
  }),
  fetchDaDataHousesFulfilled: ({suggestions}: any) => ({
    type: Action.FETCH_HOUSES_FULFILLED,
    data: {
      type: 'suggestions',
      subtype: 'houses',
      suggestions,
    },
  }),
  fetchDaDataHousesRejected: (error: string) => ({
    type: Action.FETCH_HOUSES_REJECTED,
    error,
  }),
};
//
// export const editUserData = (data: User) => (
//   dispatch: ThunkDispatch<IState, void, ReduxAction>,
// ) => {
//   dispatch({type: Action.EDIT_USER_DATA_PENDING});
//   UserAPI.me()
//     .update(data)
//     .then(() => dispatch({type: Action.EDIT_USER_DATA_FULFILLED}))
//     .then(() =>
//       Toast.show({
//         text: 'Сохранено',
//         type: 'success',
//         duration: 3000,
//       }),
//     )
//     .then(() => dispatch(fetchUserData()))
//     .then(() => navigate(Route.Profile))
//     .catch(({message}) => {
//       Toast.show({
//         text: message,
//         type: 'danger',
//         duration: 3000,
//       });
//       dispatch({
//         type: Action.EDIT_USER_DATA_REJECTED,
//         error: message,
//       });
//     });
// };
//
// const editUserAddress = (data: User | RemovedAddress) => (
//   dispatch: ThunkDispatch<IState, void, ReduxAction>,
// ) => {
//   dispatch({type: Action.EDIT_USER_DATA_PENDING});
//   UserAPI.me()
//     .update(data)
//     .then(() => dispatch({type: Action.EDIT_USER_DATA_FULFILLED}))
//     .then(() =>
//       Toast.show({
//         text: 'Сохранено',
//         type: 'success',
//         duration: 3000,
//       }),
//     )
//     .then(() => dispatch(fetchUserData()))
//     .catch(({message}) => {
//       Toast.show({
//         text: message,
//         type: 'danger',
//         duration: 3000,
//       });
//       dispatch({
//         type: Action.EDIT_USER_DATA_REJECTED,
//         error: message,
//       });
//     });
// };
//
