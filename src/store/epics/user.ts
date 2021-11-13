import {combineEpics, StateObservable, ofType} from 'redux-observable';
import {of, Observable} from 'rxjs';
import {map, mergeMap, catchError, debounceTime} from 'rxjs/operators';
import {api, userActions, Action, OAction, IState} from '../';
import {navigate, Route} from '../../navigation';
import {ToastAndroid} from 'react-native';

const headers = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

const refsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_REFS_REQUEST),
    mergeMap(() =>
      api.user.getRefsList().pipe(
        map(userActions.fetchRefsFulfilled),
        catchError(({message}) => of(userActions.fetchRefsRejected(message))),
      ),
    ),
  );

const reviewsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_REVIEWS_REQUEST),
    mergeMap(() =>
      api.user.getReviews().pipe(
        map(userActions.fetchReviewsFulfilled),
        catchError(({message}) =>
          of(userActions.fetchReviewsRejected(message)),
        ),
      ),
    ),
  );

const addReviewEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.ADD_REVIEW_REQUEST),
    mergeMap(({payload}) =>
      api.user.addReview(payload, {headers: headers(store$.value.token)}).pipe(
        map(() => {
          navigate(Route.Reviews);
          return userActions.fetchReviews();
        }),
        catchError(({message}) => of(userActions.addReviewRejected(message))),
      ),
    ),
  );

const userDataEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.FETCH_USER_DATA_REQUEST),
    mergeMap(() =>
      api.user.getUserData({headers: headers(store$.value.token)}).pipe(
        map(userActions.fetchUserDataFulfilled),
        catchError(({message}) =>
          of(userActions.fetchUserDataRejected(message)),
        ),
      ),
    ),
  );

const editUserDataEpic = (
  action$: Observable<OAction>,
  store$: StateObservable<IState>,
) =>
  action$.pipe(
    ofType(Action.EDIT_USER_DATA_REQUEST),
    mergeMap(({payload}) =>
      api.user
        .editUserData(payload, {
          data: payload,
          headers: headers(store$.value.token),
        })
        .pipe(
          map(() => {
            ToastAndroid.show('Сохранено', ToastAndroid.BOTTOM);
            return userActions.fetchUserData();
          }),
          catchError(({message}) =>
            of(userActions.editUserDataRejected(message)),
          ),
        ),
    ),
  );

const daDataStreetsEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_STREETS_REQUEST),
    debounceTime(250),
    mergeMap(({payload}) =>
      api.user.getDaDataStreets(payload).pipe(
        map(userActions.fetchDaDataStreetsFulfilled),
        catchError(error => {
          return of(userActions.fetchDaDataStreetsRejected(error));
        }),
      ),
    ),
  );

const daDataHousesEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.FETCH_HOUSES_REQUEST),
    debounceTime(250),
    mergeMap(({payload}) =>
      api.user.getDaDataHouses(payload).pipe(
        map(userActions.fetchDaDataHousesFulfilled),
        catchError(error => {
          return of(userActions.fetchDaDataHousesRejected(error));
        }),
      ),
    ),
  );

export const userEpics = combineEpics(
  refsEpic,
  reviewsEpic,
  addReviewEpic,
  userDataEpic,
  editUserDataEpic,
  daDataStreetsEpic,
  daDataHousesEpic,
);
