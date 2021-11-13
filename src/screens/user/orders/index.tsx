import React from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import styles from './styles';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from 'native-base';
import {UIStyles} from '../../../assets';
import {Order, IState, userSelectors} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {Route} from '../../../navigation';
import VIcon from "react-native-vector-icons/AntDesign";

export const OrderItem = ({order}: {order: Order}) => {
  const {navigate} = useNavigation();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {paymentType, deliveryType, status, cartAmount, deliveryPrice} =
    typedUseSelector((state) => userSelectors.orderInfo(state, order));
  return (
    <View style={styles.deliveryInfo}>
      <TouchableOpacity
        style={styles.delivery}
        onPress={() => navigate(Route.Tracking, {order, from: Route.Order})}>
        <Text style={UIStyles.boldFont}>
          {format(new Date(order.createdAt), 'dd.MM.yy HH:mm')}
        </Text>
        <Text style={styles.status}>{status}</Text>
        <Icon as={<VIcon name={"right"} style={UIStyles.icon15}/>} />
      </TouchableOpacity>
      <Text style={UIStyles.defaultFont}>
        Номер заказа: {order.orderNumber}
      </Text>
      <Text style={UIStyles.defaultFont}>Сумма заказа: {cartAmount} ₽</Text>
      <Text style={UIStyles.defaultFont}>
        {deliveryType}: {deliveryPrice} ₽
      </Text>
      <Text style={UIStyles.defaultFont}>Оплата: {paymentType}</Text>
      <TouchableOpacity
        style={[styles.button, styles.deliveryButton]}
        onPress={() => navigate(Route.Order, {order})}>
        <Text style={UIStyles.whiteBoldFont}>Перейти в заказ</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Orders = () => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {sortedOrders} = typedUseSelector(userSelectors.orders);
  return (
    <FlatList
      ListEmptyComponent={
        <View style={styles.deliveryInfo}>
          <Text style={UIStyles.defaultFont}>Нет истории заказов</Text>
        </View>
      }
      style={styles.flatList}
      contentContainerStyle={styles.userInfo}
      ItemSeparatorComponent={() => <View style={UIStyles.dividerV} />}
      data={sortedOrders}
      renderItem={({item}) => <OrderItem order={item} />}
    />
  );
};
