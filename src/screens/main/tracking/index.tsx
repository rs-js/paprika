import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import {Linking, BackHandler} from 'react-native';
import {UIStyles} from '../../../assets';
import {Icon, FlatList, Pressable, Text, Box, ScrollView} from 'native-base';
import {format} from 'date-fns';
import {BackHeader, ButtonsHeader, TrackingProps} from '../../../navigation';
import {cartActions, IState, userSelectors} from '../../../store';
import VIcon from 'react-native-vector-icons/AntDesign';

export const Tracking = ({
  navigation: {setOptions, popToTop, navigate},
  route: {
    params: {order},
  },
}: TrackingProps) => {
  const {cart, createdAt} = order;
  const amount = cart.reduce((a, b) => a + b.total, 0);
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {paymentType, deliveryPrice} = typedUseSelector(state =>
    userSelectors.orderInfo(state, order),
  );

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  useLayoutEffect(() => {
    setOptions({
      title: '',
      gestureEnabled: false,
      headerLeft: () => (
        <Pressable onPress={() => popToTop()}>
          <Icon as={<VIcon name="left" style={UIStyles.iconD} />} />
        </Pressable>
      ),
      headerRight: () => <ButtonsHeader />,
    });
  }, [navigate, popToTop, setOptions]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        popToTop();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [popToTop]),
  );

  return (
    <ScrollView
      contentContainerStyle={UIStyles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Text bold fontSize="2xl">
        Курьер в пути
      </Text>
      <Box style={styles.infoBlock}>
        <Text style={UIStyles.whiteFont}>
          {format(new Date(createdAt), 'dd.MM.yy HH:mm')}
        </Text>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={cart}
          renderItem={({item, index}) => (
            <Box style={UIStyles.flexRow}>
              <Text numberOfLines={1} style={styles.title}>
                {index + 1} {item.product.title}
              </Text>
              <Text style={styles.total}>{item.total} ₽</Text>
            </Box>
          )}
        />
        <Text style={styles.infoText}>Доставка: {Number(deliveryPrice)} ₽</Text>
        <Text style={styles.infoText}>
          Итого: {amount + Number(deliveryPrice)} ₽
        </Text>
        <Text style={styles.infoText}>Оплата: {paymentType}</Text>
      </Box>
      <Text bold fontSize="2xl" mt={5}>
        Служба поддержки
      </Text>
      <Box style={styles.infoBlock}>
        <Text style={UIStyles.whiteFont}>
          Позвоните нам, если у Вас есть{'\n'}какие-то вопросы
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(`tel:+${79150019841}`)}>
          <Text style={UIStyles.redBoldFont}>Позвонить</Text>
        </Pressable>
      </Box>
    </ScrollView>
  );
};
