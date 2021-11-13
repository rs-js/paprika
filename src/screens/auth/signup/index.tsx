import React, {useCallback, useState, useEffect} from 'react';
import styles from './styles';
import {Platform} from 'react-native';
import {UIButton, UICheckbox} from '../../../components';
import {Colors, Images, UIStyles} from '../../../assets';
import {
  Text,
  Input,
  FormControl,
  Box,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  CheckCircleIcon,
  VStack,
} from 'native-base';
import {Route, SignUpProps} from '../../../navigation';
import {PhoneNumber} from '../login';
import IMask from 'imask';

export const SignUp = ({
  navigation: {navigate},
  route: {params},
}: SignUpProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+7');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [privacyVal, setPrivacyVal] = useState(true);
  const isEnabled =
    validEmail && name.length > 0 && privacyVal && phoneNumber.length === 18;
  const fixNumber = (val: string) => val.replace(/[^+0-9]/gim, '');
  const onEmailChanged = useCallback(text => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(text)) {
      setValidEmail(false);
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setValidEmail(true);
    }
  }, []);
  useEffect(() => {
    const phoneMask = IMask.createMask({
      mask: '+{7} (000) 000-00-00',
    });
    if (params?.phoneNumber) {
      setPhoneNumber(phoneMask.resolve(params.phoneNumber));
    } else if (params?.email) {
      setEmail(params.email);
      setValidEmail(true);
    }
  }, [params]);

  const handleSubmit = useCallback(() => {
    navigate(Route.Address, {
      headerTitle: 'Ваш адрес доставки',
      user: {name, phoneNumber: fixNumber(phoneNumber), email},
      item: null,
    });
  }, [email, name, navigate, phoneNumber]);

  return (
    <ScrollView
      bg={'white'}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        justifyContent="space-between"
        style={UIStyles.flex}>
        <Box style={styles.image}>
          <Image source={Images.logo} resizeMode="contain" w={100} h={100} />
        </Box>
        <VStack space={1}>
          <Text bold fontSize="2xl">
            Регистрация
          </Text>
          <FormControl>
            <FormControl.Label>Имя</FormControl.Label>
            <Input
              InputRightElement={
                <CheckCircleIcon
                  size={4}
                  color={name.length > 1 ? Colors.green : Colors.RED}
                  paddingRight={10}
                />
              }
              placeholderTextColor="#3A3A3A"
              style={UIStyles.defaultFont}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <PhoneNumber
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <FormControl.Label>Email</FormControl.Label>
            <Input
              InputRightElement={
                <CheckCircleIcon
                  size={4}
                  color={validEmail ? Colors.green : Colors.RED}
                  paddingRight={10}
                />
              }
              autoCapitalize="none"
              style={UIStyles.defaultFont}
              placeholderTextColor="#3A3A3A"
              keyboardType={'email-address'}
              value={email}
              onChangeText={onEmailChanged}
              onSubmitEditing={handleSubmit}
            />
          </FormControl>
          <Box>
            <UICheckbox
              checkboxText="Подтверждаю своё согласие на обработку и хранение моих персональных данных
      в соответствии с пользовательским соглашением"
              value={privacyVal}
              setValue={() => setPrivacyVal(!privacyVal)}
            />
          </Box>
        </VStack>
        <UIButton
          title="Зарегистрироваться"
          onPress={handleSubmit}
          disabled={!isEnabled}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
