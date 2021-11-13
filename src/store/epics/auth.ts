import {combineEpics, ofType} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {api, Action, OAction, authActions} from '../';
import {Toast} from 'native-base';
import {navigate, Route, popToTop} from '../../navigation';
import {FirebaseErrors} from '../../utils';
import {from, of, Observable} from 'rxjs';

const checkPhoneNumberEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.CHECK_PHONE_NUMBER_REQUEST),
    mergeMap(({payload}) =>
      api.auth.checkPhoneNumber(payload).pipe(
        map(({exists}) => {
          if (exists) {
            return authActions.checkPhoneNumberFulfilled({
              exists,
              phoneNumber: payload,
            });
          } else {
            navigate(Route.SignUp, {phoneNumber: payload});
            Toast.show({
              text: 'Вы не зарегистрированы. Пожалуйста создайте аккаунт',
              duration: 3000,
            });
            return authActions.verifyPhoneNumberFulfilled();
          }
        }),
        catchError(({message}) =>
          of(authActions.checkPhoneNumberRejected(message)),
        ),
      ),
    ),
  );

const signInWithPhoneNumberEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_IN_WITH_PHONE_NUMBER_REQUEST),
    mergeMap(({payload}) =>
      from(api.auth.signInWithPhoneNumber(payload)).pipe(
        map((token) => authActions.signIn({token})),
        catchError(({code}) => {
          Toast.show({
            //@ts-ignore
            text: FirebaseErrors[code] ?? FirebaseErrors.error,
            type: 'danger',
            duration: 3000,
          });
          return of(authActions.signInWithPhoneNumberRejected(code));
        }),
      ),
    ),
  );

const signInWithAppleEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_IN_WITH_APPLE_REQUEST),
    mergeMap(() =>
      from(api.auth.signInWithApple()).pipe(
        map((token) => authActions.signIn({token})),
        catchError(({code}) => {
          Toast.show({
            //@ts-ignore
            text: FirebaseErrors[code] ?? FirebaseErrors.error,
            type: 'danger',
            duration: 3000,
          });
          return of(authActions.signInWithAppleRejected(code));
        }),
      ),
    ),
  );

const signInWithGoogleEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_IN_WITH_GOOGLE_REQUEST),
    mergeMap(() =>
      from(api.auth.signInWithGoogle()).pipe(
        map((token) => authActions.signIn({token})),
        catchError(({code}) => {
          Toast.show({
            //@ts-ignore
            text: FirebaseErrors[code] ?? FirebaseErrors.error,
            type: 'danger',
            duration: 3000,
          });
          return of(authActions.signInWithGoogleRejected(code));
        }),
      ),
    ),
  );

const signInEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_IN_REQUEST),
    mergeMap(({payload}) =>
      api.auth.signIn(payload).pipe(
        map((data) => {
          if (data.email && !data.exists) {
            navigate(Route.SignUp, {email: data.email});
            Toast.show({
              text: 'Вы не зарегистрированы. Пожалуйста создайте аккаунт',
              duration: 3000,
            });
            return authActions.verifyPhoneNumberFulfilled();
          } else {
            popToTop();
            Toast.show({
              text: 'Вы успешно зарегистрованы',
              type: 'success',
              duration: 3000,
            });
            return authActions.signInFulfilled(data);
          }
        }),
        catchError(({message}) => of(authActions.signInRejected(message))),
      ),
    ),
  );

const signUpEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_UP_REQUEST),
    mergeMap(({payload}) =>
      api.auth.signUp(payload).pipe(
        map(() => authActions.checkPhoneNumber(payload.phoneNumber)),
        catchError(({message}) => of(authActions.signUpRejected(message))),
      ),
    ),
  );

const signOutEpic = (action$: Observable<OAction>) =>
  action$.pipe(
    ofType(Action.SIGN_OUT_REQUEST),
    mergeMap(() =>
      from(api.auth.signOut()).pipe(
        map(() => authActions.signOutFulfilled()),
        catchError(({message}) => of(authActions.signOutRejected(message))),
      ),
    ),
  );

export const authEpics = combineEpics(
  checkPhoneNumberEpic,
  signInWithPhoneNumberEpic,
  signInWithAppleEpic,
  signInWithGoogleEpic,
  signInEpic,
  signUpEpic,
  signOutEpic,
);
