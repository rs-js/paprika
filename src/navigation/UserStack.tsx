import {
    Order,
    Orders,
    Profile,
    ProfileEdit,
    Review,
    Reviews,
} from '../screens/user';
import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
    AuthStack,
    btnHeader,
    ImageHeader,
    navigatorHeader,
    Route,
} from './';
import {Tracking} from '../screens/main';
import {Address as UserAddress, Order as UserOrder} from '../store';

export type UserStackParamList = {
    Address: {
        headerTitle: string;
        item: UserAddress | null;
        user: { name: string; phoneNumber: string; email: string } | null;
    };
    Confirmation: { phoneNumber: string; verificationId: string };
    Login: undefined;
    Cart: undefined;
    Order: undefined;
    Orders: undefined;
    Profile: undefined;
    ProfileEdit: undefined;
    Review: undefined;
    Reviews: undefined;
    SignUp: { phoneNumber: string; email: string };
    Tracking: { order: UserOrder };
};

const {Navigator, Screen} = createNativeStackNavigator<UserStackParamList>();

export type UserScreenNavigationProp =
    NativeStackNavigationProp<UserStackParamList>;

export type UserProps = {
    navigation: UserScreenNavigationProp;
};

export const UserStack = () => (
    <Navigator screenOptions={navigatorHeader}>
        <Screen
            name={Route.Profile}
            component={Profile}
            options={{
                ...btnHeader,
                title: 'Профиль',
            }}
        />
        <Screen
            name={Route.Order}
            component={Order}
            options={{...btnHeader, title: 'Детали заказа'}}
        />
        <Screen
            name={Route.Orders}
            component={Orders}
            options={{...btnHeader, title: 'История покупок'}}
        />
        <Screen
            name={Route.ProfileEdit}
            component={ProfileEdit}
            options={{...btnHeader, headerTitle: () => <ImageHeader/>}}
        />
        <Screen
            name={Route.Review}
            component={Review}
            options={{...btnHeader, headerTitle: () => <ImageHeader/>}}
        />
        <Screen
            name={Route.Reviews}
            component={Reviews}
            options={{...btnHeader, title: 'Отзывы'}}
        />
        <Screen name={Route.Tracking} component={Tracking}/>
        {AuthStack(Screen)}
    </Navigator>
);
