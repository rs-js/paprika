import {Image, Pressable} from 'native-base';
import {Colors, Images} from '../assets';
import {
  CartStack,
  MainStack,
  UserStack,
  ButtonsHeader,
  BackHeader,
} from './';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import React, {createRef, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {
  authSelectors,
  cartActions,
  IState,
  productsActions,
  userActions,
} from '../store';
import {Constants} from '../utils';
import {verifier} from '../store/api/firebase';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';

export enum Route {
  About = 'About',
  Address = 'Address',
  Cart = 'Cart',
  Catalog = 'Catalog',
  Checkout = 'Checkout',
  Confirmation = 'Confirmation',
  Favorites = 'Favorites',
  Login = 'Login',
  Main = 'Main',
  Order = 'Order',
  Orders = 'Orders',
  Payment = 'Payment',
  Pdf = 'Pdf',
  Product = 'Product',
  Profile = 'Profile',
  ProfileEdit = 'ProfileEdit',
  Promotions = 'Promotions',
  Review = 'Review',
  Reviews = 'Reviews',
  Section = 'Section',
  SignUp = 'SignUp',
  Tracking = 'Tracking',
}

export type MenuProps = {
  navigation: any;
};

export const navigationRef = createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current.navigate(name, params);
}

export function replace(name: string) {
  navigationRef.current.replace(name);
}

export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop());
}

const {Navigator, Screen} = createNativeStackNavigator();

export const navigatorHeader: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.grayForm,
  },
  headerShadowVisible: false,
};

export const btnHeader: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerRight: () => <ButtonsHeader />,
  headerLeft: () => <BackHeader />,
  headerBackVisible: false,
};

export const ImageHeader = () => (
  <Pressable onPress={() => navigate(Route.Main)}>
    <Image source={Images.logo} size="xs" resizeMode="contain" />
  </Pressable>
);



export const AppContainer = () => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {exists, phoneNumber, token} = typedUseSelector(authSelectors.auth);

  useEffect(() => {
    exists && phoneNumber.length > 0 && verifier(phoneNumber, dispatch);
  }, [dispatch, exists, phoneNumber, verifier]);

  useEffect(() => {
    const init = async () => {
      dispatch(productsActions.fetchCatalog());
      dispatch(productsActions.fetchPromoProducts());
      dispatch(userActions.fetchRefsList());
      GoogleSignin.configure({
        // @ts-ignore
        webClientId: Constants.webClientId,
        offlineAccess: false,
      });
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(cartActions.fetchCart());
      dispatch(productsActions.fetchFavoriteProducts());
    }
  }, [token]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        screenOptions={{headerShown: false}}>
        <Screen component={MainStack} name={Route.Main} />
        <Screen component={CartStack} name={Route.Cart} />
        <Screen component={UserStack} name={Route.Profile} />
      </Navigator>
    </NavigationContainer>
  );
};
