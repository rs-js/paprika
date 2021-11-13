import React, {useCallback, useEffect, useState, memo} from 'react';
import {Route, SectionProps} from '../../../navigation';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Icon, Box, useToast, Text, FlatList, Pressable} from 'native-base';
import {ActivityIndicator, Keyboard} from 'react-native';
import {Search, Sort, SortProducts, Counter} from '../../../components';
import {
  productsActions,
  Product,
  IState,
  authSelectors,
  productsSelectors,
  cartActions,
  cartSelectors,
} from '../../../store';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, UIStyles} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {Constants} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

export const ProductItem = memo(({item}: {item: Product}) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {id, productId, image, title, oldCost, cost, unit, maxCount} = item;
  const dispatch = useDispatch();
  const cartProduct = typedUseSelector(state =>
    cartSelectors.cartProductId(state, id),
  );
  const [counter, setCounter] = useState({
    quantity: cartProduct?.quantity || 1,
    changed: false,
  });
  const {navigate} = useNavigation();
  const token = typedUseSelector(authSelectors.token);
  const favorites = typedUseSelector(productsSelectors.favoriteProducts);
  const favorite = typedUseSelector(state =>
    productsSelectors.isFavoriteProduct(state, id),
  );
  const {cart} = typedUseSelector(cartSelectors.cartData);

  const updatedLocalFavorites = typedUseSelector(state =>
    productsSelectors.updatedLocalFavoriteProducts(state, id),
  );
  const updatedLocalCart = typedUseSelector(state =>
    cartSelectors.updatedLocalCartProduct(state, {
      id,
      quantity: counter.quantity,
    }),
  );
  const sameProductInCart = typedUseSelector(state =>
    cartSelectors.sameProductInCart(state, productId),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const update = () => {
      if (counter.quantity !== 0) {
        dispatch(cartActions.updateCart(cartProduct?.id, counter.quantity));
        setCounter({...counter, changed: false});
      } else {
        dispatch(cartActions.removeFromCart(cartProduct?.id));
        setCounter({...counter, changed: false});
      }
    };
    counter.changed && update();
  }, [cartProduct, counter, dispatch]);

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
            {id, productId, product: item},
          ]),
        );
  }, [
    id,
    productId,
    item,
    favorite,
    token,
    dispatch,
    updatedLocalFavorites,
    favorites,
  ]);
  const toast = useToast();
  const addToCart = useCallback(() => {
    token
      ? dispatch(cartActions.addToCart(id, 1, cost))
      : sameProductInCart
      ? dispatch(cartActions.updateLocalCart(updatedLocalCart))
      : dispatch(
          cartActions.updateLocalCart([
            ...cart,
            {
              id,
              productId,
              product: item,
              quantity: 1,
              cost,
            },
          ]),
        );
    toast.show({
      description: `${title} ${unit} добавлено в корзину`,
      status: 'success',
      duration: 3000,
    });
    setCounter({...counter, quantity: 1});
  }, [
    token,
    dispatch,
    id,
    cost,
    sameProductInCart,
    updatedLocalCart,
    cart,
    productId,
    item,
    title,
    unit,
    counter,
  ]);

  return (
    <Box
      pb={1}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _light={{
        backgroundColor: 'gray.50',
      }}>
      <Pressable
        onPress={() => navigate(Route.Product, {product: item})}
        style={UIStyles.dimensions2_5}>
        <FastImage
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: Constants.baseURL + image,
          }}
          style={UIStyles.productImage}>
          <Pressable style={UIStyles.heart} onPress={toggleFavorite}>
            <Icon
              as={
                <VIcon
                  name={favorite ? 'heart' : 'heart-outline'}
                  style={UIStyles.icon25D}
                />
              }
            />
          </Pressable>
          <ActivityIndicator animating={loading} color={Colors.RED} />
        </FastImage>
        <Box px={1}>
          <Text numberOfLines={1} style={UIStyles.boldFont}>
            {title}
          </Text>
          <Box style={UIStyles.row}>
            <Text style={oldCost ? UIStyles.redBoldFont : UIStyles.boldFont}>
              {cost} ₽
            </Text>
            {oldCost && (
              <>
                <Text> </Text>
                <Text style={UIStyles.discount}>{oldCost} ₽</Text>
              </>
            )}
            <Text style={UIStyles.boldFont}> за 1 {unit}</Text>
          </Box>
        </Box>
      </Pressable>
      {token && (
        <>
          {cartProduct ? (
            <Box style={UIStyles.cartButton}>
              <Counter
                min={0}
                max={maxCount}
                countTextStyle={[UIStyles.whiteBoldFont, UIStyles.systemFont]}
                buttonTextStyle={[UIStyles.whiteIcon, UIStyles.systemFont]}
                buttonStyle={{borderWidth: 0, minHeight: 5}}
                start={cartProduct?.quantity || 1}
                onChange={(number: number) =>
                  setCounter({quantity: number, changed: true})
                }
              />
            </Box>
          ) : (
            <Pressable mx={1} onPress={addToCart} style={UIStyles.cartButton}>
              <Text style={UIStyles.whiteFont}>В корзину</Text>
            </Pressable>
          )}
        </>
      )}
    </Box>
  );
});

export const ProductList = ({data, id}: {data: Product[]; id?: string}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const fetchData = useCallback(() => {
    id
      ? dispatch(productsActions.fetchProducts(id))
      : dispatch(productsActions.fetchCatalog());
    setRefresh(false);
  }, [dispatch, id]);
  return (
    <FlatList
      onScroll={() => Keyboard.dismiss()}
      contentContainerStyle={UIStyles.paddingBottom20}
      columnWrapperStyle={UIStyles.column}
      ItemSeparatorComponent={() => <Box style={UIStyles.dividerV} />}
      numColumns={2}
      data={data}
      renderItem={props => <ProductItem {...props} />}
      refreshing={refresh}
      onRefresh={() => {
        setRefresh(true);
        fetchData();
      }}
    />
  );
};

export const Section = ({
  route: {
    params: {id, name},
  },
}: SectionProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const [sort, setSort] = useState<SortProducts>({
    default: true,
    price: {
      enabled: false,
      asc: true,
    },
    alpha: {
      enabled: false,
      asc: true,
    },
  });
  const products = typedUseSelector(state =>
    productsSelectors.products(state, {id, sort}),
  );
  const foundProducts = typedUseSelector(state =>
    productsSelectors.foundProducts(state, sort),
  );
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.fetchProducts(id));
  }, [id, dispatch]);
  return (
    // style={UIStyles.title}
    <Box px={3} flex={1}>
      <Text bold fontSize="2xl">{name}</Text>
      <Search input={input} setInput={setInput} categoryId={id} />
      {input.length ? (
        <>
          <Sort sort={sort} setSort={setSort} />
          <ProductList data={foundProducts} id={id} />
        </>
      ) : (
        <>
          <Sort sort={sort} setSort={setSort} />
          <ProductList data={products} id={id} />
        </>
      )}
    </Box>
  );
};
