import React, {useCallback} from 'react';
import styles from './styles';
import {UIStyles} from '../../../assets';
import {UIButton} from '../../../components';
import FastImage from 'react-native-fast-image';
import {Box, Text, FlatList} from 'native-base';
import {Constants} from '../../../utils';
import {cartActions, CartItem} from '../../../store';
import {format} from 'date-fns';
import {useDispatch} from 'react-redux';
import {Route} from '../../../navigation';

interface OrderList {
  orders: CartItem[];
  header: JSX.Element;
  footer: JSX.Element;
}

export const OrderList = ({orders, footer}: OrderList) => {
  return (
    <FlatList
      p={3}
      data={orders}
      renderItem={({item}) => (
        <Box style={styles.orders}>
          <FastImage
            source={{
              uri: Constants.baseURL + item.product.image,
            }}
            resizeMode="contain"
            style={UIStyles.image79}
          />
          <Box style={styles.orderTextBlock}>
            <Box style={styles.order}>
              <Text style={styles.orderText}>{item.product.title}</Text>
              <Text style={styles.orderText}>
                {item.total
                  ? item.total
                  : (item.quantity * item.product.cost).toFixed(2)}{' '}
                ₽
              </Text>
            </Box>
            <Text style={styles.weight}>
              {item.quantity} {item.product.unit}
            </Text>
          </Box>
        </Box>
      )}
      ListFooterComponent={footer}
    />
  );
};

export const Order = ({
  navigation: {navigate},
  route: {
    params: {order},
  },
}) => {
  const {cart, closedAt} = order;
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    cart.forEach(
      async ({productId, quantity, cost}) =>
        await dispatch(cartActions.addToCart(productId, quantity, cost)),
    );
    navigate(Route.Cart);
  }, [cart, dispatch, navigate]);

  return (
    <OrderList
      orders={cart}
      header={<Text style={UIStyles.subtitle}>Детали заказа</Text>}
      footer={
        <Box>
          {closedAt && (
            <Box style={UIStyles.flexRow}>
              <Text style={UIStyles.font20b}>Дата доставки</Text>
              <Text style={UIStyles.font20b}>
                {format(new Date(closedAt), 'dd.MM.yy')}
              </Text>
            </Box>
          )}
          <UIButton title="Повторить заказ" onPress={handleSubmit} />
        </Box>
      }
    />
  );
};
