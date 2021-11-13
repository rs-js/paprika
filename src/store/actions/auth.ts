import {Action, LoginTokenPayload, LoginResponse, User} from '../';

export const authActions = {
  checkPhoneNumber: (payload: string) => ({
    type: Action.CHECK_PHONE_NUMBER_REQUEST,
    payload,
  }),
  checkPhoneNumberFulfilled: (data: object) => ({
    type: Action.CHECK_PHONE_NUMBER_FULFILLED,
    data,
  }),
  checkPhoneNumberRejected: (error: string) => ({
    type: Action.CHECK_PHONE_NUMBER_REJECTED,
    error,
  }),
  verifyPhoneNumber: (payload: string) => ({
    type: Action.VERIFY_PHONE_NUMBER_REQUEST,
    payload,
  }),
  verifyPhoneNumberFulfilled: () => ({
    type: Action.VERIFY_PHONE_NUMBER_FULFILLED,
  }),
  verifyPhoneNumberRejected: (error: any) => ({
    type: Action.VERIFY_PHONE_NUMBER_REJECTED,
    error,
  }),
  signInWithApple: () => ({
    type: Action.SIGN_IN_WITH_APPLE_REQUEST,
  }),
  signInWithAppleRejected: (error: string) => ({
    type: Action.SIGN_IN_WITH_APPLE_REJECTED,
    error,
  }),
  signInWithGoogle: () => ({
    type: Action.SIGN_IN_WITH_GOOGLE_REQUEST,
  }),
  signInWithGoogleRejected: (error: string) => ({
    type: Action.SIGN_IN_WITH_GOOGLE_REJECTED,
    error,
  }),
  signInWithPhoneNumber: (payload: object) => ({
    type: Action.SIGN_IN_WITH_PHONE_NUMBER_REQUEST,
    payload,
  }),
  signInWithPhoneNumberRejected: (error: string) => ({
    type: Action.SIGN_IN_WITH_PHONE_NUMBER_REJECTED,
    error,
  }),
  signIn: (payload: LoginTokenPayload) => ({
    type: Action.SIGN_IN_REQUEST,
    payload,
  }),
  signInFulfilled: (data: LoginResponse) => ({
    type: Action.SIGN_IN_FULFILLED,
    data,
  }),
  signInRejected: (error: string) => ({
    type: Action.SIGN_IN_REJECTED,
    error,
  }),
  signUp: (payload: User) => ({
    type: Action.SIGN_UP_REQUEST,
    payload,
  }),
  signUpRejected: (error: string) => ({
    type: Action.SIGN_UP_REJECTED,
    error,
  }),
  signOut: () => ({
    type: Action.SIGN_OUT_REQUEST,
  }),
  signOutFulfilled: () => ({
    type: Action.SIGN_OUT_FULFILLED,
  }),
  signOutRejected: (error: string) => ({
    type: Action.SIGN_OUT_REJECTED,
    error,
  }),
};

// const signInWithApple = () => async (
//   dispatch: ThunkDispatch<IState, void, ReduxAction>,
// ) => {
//   dispatch({type: Action.SIGN_IN_REQUEST});
//   try {
//     const {identityToken, nonce} = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });
//     const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
//     dispatch(signInWithCredential(credential));
//   } catch (error) {
//     dispatch({type: Action.SIGN_IN_REJECTED, error});
//   }
// };
//
