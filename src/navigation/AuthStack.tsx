import React from 'react';
import {
  UserScreenNavigationProp,
  Route,
  UserStackParamList,
  btnHeader,
} from './';
import {Address, Confirmation, Login, SignUp} from '../screens/auth';
import {RouteProp} from '@react-navigation/native';

type AddressScreenRouteProp = RouteProp<UserStackParamList, Route.Address>;
type ConfirmScreenRouteProp = RouteProp<UserStackParamList, Route.Confirmation>;
type SignUpScreenRouteProp = RouteProp<UserStackParamList, Route.SignUp>;

export type AddressProps = {
  navigation: UserScreenNavigationProp;
  route: AddressScreenRouteProp;
};
export type ConfirmProps = {
  route: ConfirmScreenRouteProp;
};
export type SignUpProps = {
  navigation: UserScreenNavigationProp;
  route: SignUpScreenRouteProp;
};

export const AuthStack = (Screen: any) => [
  <Screen name={Route.Login} component={Login} options={{...btnHeader, title: ''}} />,
  <Screen
    name={Route.Address}
    component={Address}
    options={({route}: {route: AddressScreenRouteProp}) => ({
      ...btnHeader,
      title: route.params.headerTitle,
    })}
  />,
  <Screen
    name={Route.Confirmation}
    component={Confirmation}
    options={{...btnHeader, title: ''}}
  />,
  <Screen name={Route.SignUp} component={SignUp} options={{...btnHeader, title: ''}} />,
];
