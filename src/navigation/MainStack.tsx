import {
  PdfViewer,
  Favorites,
  Main,
  Product,
  Promotions,
  Section,
  Catalog,
  Tracking,
} from '../screens/main';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { drwHeader, btnHeader, Route, ImageHeader, navigatorHeader } from "./";
import {Category, Order, Product as CatalogProduct} from '../store/api';
import {RouteProp} from '@react-navigation/native';

type MainStackParamList = {
  About: undefined;
  Cart: undefined;
  Catalog: {name: string; children: Category[]};
  Favorites: undefined;
  Main: {screen: string};
  Payment: undefined;
  Pdf: {name: string};
  Privacy: {doc: string};
  Product: {product: CatalogProduct};
  Promotions: undefined;
  Review: undefined;
  Section: {id: string; name: string};
  Tracking: {order: Order};
};

const {Navigator, Screen} = createNativeStackNavigator<MainStackParamList>();

export type MainScreenNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;
export type MainProps = {
  navigation: MainScreenNavigationProp;
};
type CatalogScreenRouteProp = RouteProp<MainStackParamList, Route.Catalog>;
type ProductScreenRouteProp = RouteProp<MainStackParamList, Route.Product>;
type SectionScreenRouteProp = RouteProp<MainStackParamList, Route.Section>;
type TrackingScreenRouteProp = RouteProp<MainStackParamList, Route.Tracking>;
type PdfScreenRouteProp = RouteProp<MainStackParamList, Route.Pdf>;

export type CatalogProps = {
  route: CatalogScreenRouteProp;
};
export type ProductProps = {
  navigation: MainScreenNavigationProp;
  route: ProductScreenRouteProp;
};
export type SectionProps = {
  route: SectionScreenRouteProp;
};
export type PdfProps = {
  route: PdfScreenRouteProp;
};
export type TrackingProps = {
  navigation: MainScreenNavigationProp;
  route: TrackingScreenRouteProp;
};

export const MainStack = () => (
  <Navigator initialRouteName={Route.Main} screenOptions={navigatorHeader}>
    <Screen name={Route.Main} component={Main} options={drwHeader} />
    <Screen
      name={Route.Pdf}
      component={PdfViewer}
      options={({
        route: {
          params: {name},
        },
      }) => ({title: name})}
    />
    <Screen
      name={Route.Catalog}
      component={Catalog}
      options={({
        route: {
          params: {name},
        },
      }) => ({...btnHeader, title: name})}
    />
    <Screen
      name={Route.Favorites}
      component={Favorites}
      options={{...btnHeader, title: 'Избранное'}}
    />
    <Screen
      name={Route.Product}
      component={Product}
      options={{...btnHeader, headerTitle: () => <ImageHeader />}}
    />
    <Screen
      name={Route.Promotions}
      component={Promotions}
      options={{...btnHeader, title: 'Акции'}}
    />
    <Screen
      name={Route.Section}
      component={Section}
      options={{...btnHeader, headerTitle: () => <ImageHeader />}}
    />
    <Screen
      name={Route.Tracking}
      component={Tracking}
      options={{...btnHeader, headerTitle: () => <ImageHeader />}}
    />
  </Navigator>
);
