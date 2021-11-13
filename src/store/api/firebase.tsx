import auth from '@react-native-firebase/auth';
import {authActions} from '../actions';
import {Route} from '../../navigation';
import {useToast} from 'native-base';
import {FirebaseErrors} from '../../utils';
import {navigate} from '../../navigation';

export const verifier = (phoneNumber: string, wrapper: Function) =>
  auth()
    .verifyPhoneNumber(phoneNumber)
    .on('state_changed', ({state, error, verificationId, code}) => {
      switch (state) {
        case auth.PhoneAuthState.AUTO_VERIFIED:
          wrapper(authActions.signInWithPhoneNumber({verificationId, code}));
          break;
        case auth.PhoneAuthState.CODE_SENT:
          navigate(Route.Confirmation, {phoneNumber, verificationId});
          wrapper(authActions.verifyPhoneNumberFulfilled());
          break;
        case auth.PhoneAuthState.ERROR:
          //@ts-ignore
          wrapper(authActions.verifyPhoneNumberRejected(error?.code));

          Toast.show({
            text:
              //@ts-ignore
              FirebaseErrors[error?.code] ??
              'Произошла ошибка. Повторите еще раз.',
            type: 'danger',
            duration: 3000,
          });
          break;
      }
    });
