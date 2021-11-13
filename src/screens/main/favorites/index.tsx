import React, {memo, useEffect, useCallback} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  productsActions,
  IState,
  Favorite,
  authSelectors,
  productsSelectors,
} from '../../../store';
import {Icon, Box, FlatList, Pressable, Text} from 'native-base';
import {UIStyles} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {Constants} from '../../../utils';
import {Route} from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FavoriteItem = memo(({item}: {item: Favorite}) => {
  const {id, product} = item;
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const token = typedUseSelector(authSelectors.token);
  const updatedLocalFavorites = typedUseSelector(state =>
    productsSelectors.updatedLocalFavoriteProducts(state, id),
  );

  const removeFavorite = useCallback(() => {
    token
      ? dispatch(productsActions.removeFromFavoriteProducts(id))
      : dispatch(
          productsActions.updateLocalFavoriteProducts(updatedLocalFavorites),
        );
  }, [token, dispatch, id, updatedLocalFavorites]);

  return (
    <Pressable
      style={UIStyles.dimensions2_5}
      onPress={() => navigate(Route.Product, {product})}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <FastImage
          source={{
            uri: Constants.baseURL + item.product.image,
          }}
          style={UIStyles.image}>
          <Pressable style={UIStyles.heart} onPress={removeFavorite}>
            <Icon as={<VIcon name="heart" style={UIStyles.icon25D} />} />
          </Pressable>
        </FastImage>
        <Box px={1}>
          <Text
            numberOfLines={2}
            style={[UIStyles.boldFont, UIStyles.dimensions2_5]}>
            {item.product.title}
          </Text>
          <Box style={UIStyles.row}>
            <Text
              style={
                item.product.oldCost ? UIStyles.redBoldFont : UIStyles.boldFont
              }>
              {item.product.cost} ₽
            </Text>
            {item.product.oldCost && (
              <Text style={UIStyles.discount}> {item.product.oldCost} ₽</Text>
            )}
            <Text style={UIStyles.boldFont}> за 1 {item.product.unit}</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
});

export const Favorites = () => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const favorites = typedUseSelector(productsSelectors.favoriteProducts);
  const token = typedUseSelector(authSelectors.token);

  useEffect(() => {
    token && dispatch(productsActions.fetchFavoriteProducts());
  }, [dispatch, token]);
  // favorites.length > 0 ? favorites.forEach(async ({id}) => await dispatch(addToFavoriteProducts(id))) : dispatch(fetchFavoriteProducts());
  // cart.forEach(async ({productId, quantity, cost}) => await dispatch(addToCart(productId, quantity, cost)));
  return (
    <FlatList
      contentContainerStyle={[UIStyles.paddingH15, UIStyles.paddingV20]}
      columnWrapperStyle={UIStyles.column}
      ItemSeparatorComponent={() => <Box style={UIStyles.dividerV} />}
      numColumns={2}
      data={favorites}
      renderItem={({item}) => <FavoriteItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};
