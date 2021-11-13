import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PixelRatio, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {cartSelectors, IState} from '../../../store';
import {Colors, UIStyles} from '../../../assets';
import {Badge} from 'react-native-elements';
import {Route} from '../../index';

export const ButtonsHeader = () => {
  const {navigate} = useNavigation();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {cartLength} = typedUseSelector(cartSelectors.cartData);
  return (
    <View style={UIStyles.flexRow}>
      <TouchableOpacity
        onPress={() => navigate(Route.Favorites)}
        style={styles.button}>
        <Icon name="heart-outline" style={UIStyles.iconD} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(Route.Cart, {screen: Route.Cart})}>
        <IonIcon name="ios-cart-outline" style={UIStyles.iconD} />
        {cartLength > 0 && (
          <Badge
            textStyle={styles.badgeText}
            badgeStyle={styles.counter}
            value={cartLength}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 18,
  },
  counter: {
    position: 'absolute',
    right: -7,
    top: -35,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.RED,
    borderWidth: 2,
  },
  badgeText: {
    fontSize: 10 / PixelRatio.getFontScale(),
    color: Colors.BLACK,
  },
});
