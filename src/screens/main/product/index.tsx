import React, {useState, useCallback} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';
import {UIButton, Counter} from '../../../components';
import {Box, Icon, ScrollView, useToast} from 'native-base';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {Constants} from '../../../utils';
import {
  IState,
  cartActions,
  productsActions,
  authSelectors,
  cartSelectors,
  productsSelectors,
} from '../../../store';
import {ProductProps} from '../../../navigation';

export const Product = ({
  navigation: {goBack},
  route: {
    params: {product},
  },
}: ProductProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {id, image, cost, oldCost, title, code, unit, maxCount, productId} =
    product;
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const [quantity, setQuantity] = useState(1);
  const cartProduct = typedUseSelector(state =>
    cartSelectors.cartProductId(state, id),
  );
  const updatedLocalCart = typedUseSelector(state =>
    cartSelectors.updatedLocalCartProduct(state, {id, quantity}),
  );
  const sameProductInCart = typedUseSelector(state =>
    cartSelectors.sameProductInCart(state, productId),
  );
  const {cart} = typedUseSelector(cartSelectors.cartData);
  const favorites = typedUseSelector(productsSelectors.favoriteProducts);
  const favorite = typedUseSelector(state =>
    productsSelectors.isFavoriteProduct(state, id),
  );
  const updatedLocalFavorites = typedUseSelector(state =>
    productsSelectors.updatedLocalFavoriteProducts(state, productId),
  );
  const token = typedUseSelector(authSelectors.token);
  const removeFromLocalCart = typedUseSelector(state =>
    cartSelectors.removeFromLocalCart(state, id),
  );

  const handleSubmit = useCallback(() => {
    token
      ? dispatch(cartActions.addToCart(id, quantity, cost))
      : sameProductInCart
      ? dispatch(cartActions.updateLocalCart(updatedLocalCart))
      : dispatch(
          cartActions.updateLocalCart([
            ...cart,
            {
              id,
              productId,
              product,
              quantity,
              cost,
            },
          ]),
        );
    toast.show({
      description: `${title} ${quantity}${unit} добавлено в корзину`,
      status: 'success',
      duration: 3000,
    });
    goBack();
  }, [
    token,
    dispatch,
    id,
    quantity,
    cost,
    sameProductInCart,
    updatedLocalCart,
    cart,
    productId,
    product,
    title,
    unit,
    goBack,
  ]);

  const deleteProduct = useCallback(() => {
    token
      ? dispatch(cartActions.removeFromCart(cartProduct.id))
      : dispatch(cartActions.updateLocalCart(removeFromLocalCart));
    toast.show({
      description: `${title} удалено из корзины`,
      status: 'success',
      duration: 3000,
    });
    goBack();
  }, [cartProduct, dispatch, goBack, removeFromLocalCart, title, token]);

  const toggleFavorite = useCallback(() => {
    favorite
      ? token
        ? dispatch(productsActions.removeFromFavoriteProducts(favorite.id))
        : dispatch(
            productsActions.updateLocalFavoriteProducts(updatedLocalFavorites),
          )
      : token
      ? dispatch(productsActions.addToFavoriteProducts(id))
      : dispatch(
          productsActions.updateLocalFavoriteProducts([
            ...favorites,
            {id, productId, product},
          ]),
        );
  }, [
    favorite,
    token,
    dispatch,
    updatedLocalFavorites,
    id,
    favorites,
    productId,
    product,
  ]);

  return (
    <ScrollView>
      <Box px={3}>
        <Text style={UIStyles.font25b}>{title}</Text>
        <Text style={UIStyles.boldFont}>
          Код товара <Text style={UIStyles.defaultFont}>№{code}</Text>
        </Text>
      </Box>
      <FastImage
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: Constants.baseURL + image,
        }}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
          <Icon
            as={
              <VIcon
                name={favorite ? 'heart' : 'heart-outline'}
                style={UIStyles.icon30D}
              />
            }
          />
        </TouchableOpacity>
      </FastImage>
      <Box p={3}>
        <View style={UIStyles.row}>
          <Text style={oldCost ? UIStyles.font30Db : UIStyles.font30b}>
            {cost} ₽
          </Text>
          {oldCost && (
            <>
              <Text>{'  '}</Text>
              <Text style={[UIStyles.font30b, UIStyles.discount]}>
                {oldCost} ₽
              </Text>
            </>
          )}
          <Text style={UIStyles.font20b}> за 1 {unit}</Text>
        </View>
        {maxCount - cartProduct?.quantity !== 0 ? (
          <>
            <Box mb={1} style={UIStyles.flexRow}>
              <Text style={UIStyles.boldFont}>Количество</Text>
              <View style={styles.counter}>
                <Counter
                  min={1}
                  max={maxCount - (cartProduct?.quantity ?? 0)}
                  countTextStyle={UIStyles.whiteBoldFont}
                  buttonTextStyle={UIStyles.icon20W}
                  buttonStyle={styles.button}
                  start={quantity}
                  onChange={(number: number) => setQuantity(number)}
                />
              </View>
            </Box>
            <UIButton title="Добавить в корзину" onPress={handleSubmit} />
          </>
        ) : (
          <UIButton title="Убрать из корзины" onPress={deleteProduct} />
        )}
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  counter: {
    ...UIStyles.flexRow,
    ...UIStyles.shadow,
    width: 124,
    borderRadius: 20,
    backgroundColor: '#D93931',
    paddingHorizontal: 7,
  },
  button: {
    borderWidth: 0,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  iconButton: {
    alignSelf: 'flex-end',
    paddingTop: 20,
    paddingRight: 25,
  },
  quantity: {
    ...UIStyles.font20b,
    textAlign: 'center',
  },
});
