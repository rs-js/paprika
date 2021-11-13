import {RxAxios} from './rxAxios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {map} from 'rxjs/operators';
import {ResponseMapper} from './responseMapper';
import qs from 'qs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {User} from './';

export interface LoginTokenPayload {
  token: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export class AuthAPI {
  constructor(private rxAxios: RxAxios) {}

  checkPhoneNumber = (phoneNumber: string) =>
    this.rxAxios
      .get(`/users/check?${qs.stringify({phoneNumber})}`)
      .pipe(map(ResponseMapper.getData));

  signInWithCredential = async (
    credential: FirebaseAuthTypes.AuthCredential,
  ) => {
    const {user} = await auth().signInWithCredential(credential);
    return user.getIdToken();
  };

  signInWithPhoneNumber = async ({
    verificationId,
    code,
  }: {
    verificationId: string;
    code: string;
  }) => {
    const credential = await auth.PhoneAuthProvider.credential(
      verificationId,
      code,
    );
    return this.signInWithCredential(credential);
  };

  signInWithApple = async () => {
    const {identityToken, nonce} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
    return this.signInWithCredential(credential);
  };

  signInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(idToken);
    return this.signInWithCredential(credential);
  };

  signIn = (token: LoginTokenPayload) =>
    this.rxAxios.post('/users/login', token).pipe(map(ResponseMapper.getData));

  signUp = (payload: User) =>
    this.rxAxios
      .post('/users/signup', payload)
      .pipe(map(ResponseMapper.getData));

  signOut = () => auth().signOut();

  //
  //   export interface StatusMessage {
  //   status: number;
  //   message: string;
  // }
  //   const router = wrapper('users');
  //
  //   static signup(data: User) {
  //     return router.post<StatusMessage>('/signup', data);
  //   }
  //
  //
  //   /**
  //    * e.g. await UserAPI.me().get();
  //    * e.g. await UserAPI.me().update(data);
  //    */
  //   static me() {
  //     return {
  //       get: () => router.get<User>('/me'),
  //       update: (data: User | RemovedAddress) => router.put<User>('/me', data),
  //     };
  //   }
  // }
}
