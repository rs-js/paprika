import React, {Ref, useCallback, useState} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import IMask from 'imask';
import styles from './styles';
import {Platform, Keyboard} from 'react-native';
import {
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Icon,
  Input,
  Text,
  Image,
  FormControl,
  useToast,
  Box,
  CheckCircleIcon,
} from 'native-base';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {IState, authActions, authSelectors} from '../../../store';
import {AnimatedButton} from '../../../components';
import {UIStyles, Images, Colors} from '../../../assets';
import {Route, UserProps} from '../../../navigation';
import NetInfo from '@react-native-community/netinfo';
import VIcon from 'react-native-vector-icons/AntDesign';

export const PhoneNumber = ({
  phoneNumber,
  setPhoneNumber,
}: {
  phoneNumber: string;
  setPhoneNumber: (arg: string) => void;
}) => {
  const phoneMask = IMask.createMask({
    mask: '+{7} (000) 000-00-00',
  });
  const onPhoneChanged = useCallback(
    ({nativeEvent: {text}}) => setPhoneNumber(phoneMask.resolve(text) || '+7'),
    [phoneMask, setPhoneNumber],
  );
  return (
    <FormControl isRequired>
      <FormControl.Label>Номер телефона</FormControl.Label>
      <Input
        InputRightElement={
          <CheckCircleIcon
            size={4}
            color={phoneNumber.length === 18 ? Colors.green : Colors.RED}
            paddingRight={10}
          />
        }
        fontSize={'2xl'}
        onChange={onPhoneChanged}
        value={phoneNumber}
        keyboardType={'phone-pad'}
        style={UIStyles.defaultFont}
      />
    </FormControl>
  );
};

export const Login = ({navigation: {navigate}}: UserProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const pending = typedUseSelector(authSelectors.pending);
  const toast = useToast();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+7');
  const fixNumber = (val: string) => val.replace(/[^+0-9]/gim, '');

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        dispatch(authActions.checkPhoneNumber(fixNumber(phoneNumber)));
      } else {
        toast.show({
          description: 'Отсутствует интернет-соединение. Побробуйте позже',
          duration: 3000,
        });
      }
    });
  }, [dispatch, phoneNumber]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={UIStyles.flex}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <Image source={Images.logo} style={UIStyles.logo} />
        <Text bold fontSize="2xl">
          Добро{'\n'}пожаловать!
        </Text>
        <PhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
        <Box style={styles.buttons}>
          <AnimatedButton
            title="Войти"
            onPress={handleSubmit}
            disabled={phoneNumber.length < 18}
            pending={pending}
            login={true}
          />
          {Platform.OS === 'ios' ? (
            <AppleButton
              onPress={() => dispatch(authActions.signInWithApple())}
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={[styles.apple, styles.osSignIn]}
            />
          ) : (
            <Pressable
              style={[styles.google, styles.osSignIn]}
              onPress={() => dispatch(authActions.signInWithGoogle())}>
              <Icon as={<VIcon name="google" style={UIStyles.icon20W} />} />
              <Text style={styles.textButton}>Войти с помощью Google</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigate(Route.SignUp, {phoneNumber, email: ''})}
            style={[UIStyles.button, UIStyles.shadow]}>
            <Text style={UIStyles.whiteBoldFont}>Создать аккаунт</Text>
          </Pressable>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
