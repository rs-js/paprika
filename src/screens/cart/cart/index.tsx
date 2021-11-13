import React, {memo, useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import styles from './styles';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {UIStyles} from '../../../assets';
import {UIButton, Counter} from '../../../components';
import {
  IState,
  cartActions,
  CartItem as Item,
  authSelectors,
  cartSelectors,
} from '../../../store';
import {Box, Icon} from 'native-base';
import {Constants} from '../../../utils';
import {CartProps, Route} from '../../../navigation';
import FastImage from 'react-native-fast-image';
import VIcon from 'react-native-vector-icons/Octicons';

export const CartItem = memo(
  ({item: {id, quantity, product}}: {item: Item}) => {
    const dispatch = useDispatch();
    const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
    const token = typedUseSelector(authSelectors.token);
    const [counter, setCounter] = useState({quantity, changed: false});
    const updatedLocalCart = typedUseSelector(state =>
      cartSelectors.updatedLocalCart(state, {id, quantity: counter.quantity}),
    );
    const removeFromLocalCart = typedUseSelector(state =>
      cartSelectors.removeFromLocalCart(state, id),
    );

    useEffect(() => {
      const update = () => {
        if (counter.quantity !== 0) {
          token
            ? dispatch(cartActions.updateCart(id, counter.quantity))
            : dispatch(cartActions.updateLocalCart(updatedLocalCart));
          setCounter({...counter, changed: false});
        } else {
          token
            ? dispatch(cartActions.removeFromCart(id))
            : dispatch(cartActions.updateLocalCart(removeFromLocalCart));
          setCounter({...counter, changed: false});
        }
      };
      counter.changed && update();
    }, [counter, dispatch, id, removeFromLocalCart, token, updatedLocalCart]);

    return (
      <View style={styles.order}>
        <FastImage
          source={{
            uri: Constants.baseURL + product?.image,
          }}
          resizeMode="contain"
          style={UIStyles.image79}
        />
        <View style={styles.orderTextBlock}>
          <View style={styles.productBlock}>
            <Text style={styles.productTitle}>{product?.title}</Text>
            <Text style={UIStyles.whiteBoldFont}>
              {product?.cost * quantity} ₽
            </Text>
          </View>
          <Text style={styles.weight}>
            {quantity} {product?.unit}
          </Text>
          <View style={styles.counterBlock}>
            <TouchableOpacity
              style={styles.trash}
              onPress={() =>
                token
                  ? dispatch(cartActions.removeFromCart(id))
                  : dispatch(cartActions.updateLocalCart(removeFromLocalCart))
              }>
              <Icon as={<VIcon name={'trashcan'} style={UIStyles.icon30W} />} />
            </TouchableOpacity>
            <View style={styles.counter}>
              <Counter
                min={1}
                max={product.maxCount}
                countTextStyle={styles.countTextStyle}
                buttonTextStyle={UIStyles.icon15D}
                buttonStyle={styles.button}
                start={quantity}
                onChange={(number: number) =>
                  setCounter({quantity: number, changed: true})
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  },
);

export const Cart = ({navigation: {navigate}}: CartProps) => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const token = typedUseSelector(authSelectors.token);
  const {cart, cartAmount} = typedUseSelector(cartSelectors.cartData);
  const [needRedirect, setNeedRedirect] = useState(false);

  useEffect(() => {
    if (needRedirect && token) {
      cart.forEach(
        async ({productId, quantity, cost}) =>
          await dispatch(cartActions.addToCart(productId, quantity, cost)),
      );
      setNeedRedirect(false);
      navigate(Route.Checkout);
    }
  }, [cart, dispatch, navigate, needRedirect, token]);

  useEffect(() => {
    !needRedirect && token && dispatch(cartActions.fetchCart());
  }, [token, dispatch, needRedirect]);

  const navigateToCheckout = useCallback(() => {
    if (token) {
      navigate(Route.Checkout);
    } else {
      setNeedRedirect(true);
      navigate(Route.Login);
    }
  }, [navigate, token]);

  return (
    <Box pb={5} flex={1}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.divider}>
              <UIButton
                title="Очистить корзину"
                onPress={() => {
                  token
                    ? cart.forEach(
                        async ({id}) =>
                          await dispatch(cartActions.removeFromCart(id)),
                      )
                    : dispatch(cartActions.updateLocalCart([]));
                }}
                disabled={!cart.length}
              />
            </View>
          </>
        }
        contentContainerStyle={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        data={cart}
        renderItem={({item}) => <CartItem item={item} />}
      />
      <Box style={styles.footer}>
        <Text style={UIStyles.font20b}>Итого: {cartAmount} ₽</Text>
        <UIButton
          title="Оформить заказ"
          onPress={navigateToCheckout}
          disabled={!cart.length}
        />
      </Box>
    </Box>
  );
};
