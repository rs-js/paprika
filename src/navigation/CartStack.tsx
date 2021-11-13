import {Cart, Checkout, Payment} from '../screens/cart';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {AuthStack, backHeader, btnHeader, navigatorHeader, Route} from './';
import {RouteProp} from '@react-navigation/native';
import {Address as UserAddress, Order as UserOrder, Order} from '../store';

export type CartStackParamList = {
  Address: {
    item: UserAddress | null;
    user: {name: string; phoneNumber: string; email: string} | null;
  };
  Cart: undefined;
  Checkout: undefined;
  Confirmation: {phoneNumber: string; verificationId: string};
  Login: undefined;
  Main: {screen: string; params: {order: UserOrder}};
  Payment: {order: Order; formUrl: string};
  SignUp: {phoneNumber: string};
};

const {Navigator, Screen} = createNativeStackNavigator<CartStackParamList>();

type CartScreenNavigationProp = NativeStackNavigationProp<CartStackParamList>;
type PaymentScreenRouteProp = RouteProp<CartStackParamList, Route.Payment>;

export type CartProps = {
  navigation: CartScreenNavigationProp;
};
export type PaymentProps = {
  navigation: CartScreenNavigationProp;
  route: PaymentScreenRouteProp;
};

export const CartStack = () => (
  <Navigator initialRouteName={Route.Cart} screenOptions={navigatorHeader}>
    <Screen
      name={Route.Cart}
      component={Cart}
      options={{...btnHeader, ...backHeader, title: 'Корзина'}}
    />
    <Screen
      name={Route.Checkout}
      component={Checkout}
      options={{...btnHeader, title: 'Оформление заказа'}}
    />
    <Screen name={Route.Payment} component={Payment} />
    {AuthStack(Screen)}
  </Navigator>
);
