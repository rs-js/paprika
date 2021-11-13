import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import styles from './styles';
import {View, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AnimatedButton} from '../../../components';
import {ScrollView, Text} from 'native-base';
import {authActions, authSelectors, IState} from '../../../store';
import {ConfirmProps} from '../../../navigation';

export const Confirmation = ({
  route: {
    params: {phoneNumber, verificationId},
  },
}: ConfirmProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const pending = typedUseSelector(authSelectors.pending);
  const error = typedUseSelector(authSelectors.error);
  const [counter, setCounter] = useState(59);

  useEffect(() => {
    error && setValue('');
  }, [error]);

  useEffect(() => {
    if (!error && value.length === 6) {
      dispatch(
        authActions.signInWithPhoneNumber({verificationId, code: value}),
      );
    }
  }, [dispatch, error, value, verificationId]);

  useEffect(() => {
    const timer = setInterval(
      () => counter > 0 && !pending && setCounter(counter - 1),
      1000,
    );
    return () => clearInterval(timer);
  }, [pending, counter]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <View>
        <Text style={styles.title}>Подтверждение номера</Text>
        <Text style={styles.subtitle}>
          Пожалуйста, напишите код подтверждения Вашего номера {phoneNumber}
        </Text>
      </View>
      <View style={styles.codeBlock}>
        <CodeField
          autoFocus
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={counter !== 0}
          onPress={() => {
            dispatch(authActions.verifyPhoneNumber(phoneNumber));
            setCounter(59);
            setValue('');
          }}>
          <Text style={[styles.sendText, styles.centerText]}>
            Отправить код повторно {counter !== 0 && `через ${counter} секунд`}
          </Text>
        </TouchableOpacity>
        <AnimatedButton
          title="Подтвердить"
          onPress={() =>
            dispatch(authActions.signInWithPhoneNumber({verificationId, value}))
          }
          disabled={value.length < 6}
          pending={pending}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.centerText}>
          Сообщите нам, если сообщение не поступило
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
