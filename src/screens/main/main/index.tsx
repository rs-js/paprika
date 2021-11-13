import React, {useState, useCallback} from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {BackHandler, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Search, Sort, SortProducts} from '../../../components';
import {ProductList} from '../section';
import Icon from 'react-native-vector-icons/AntDesign';
import {IState} from '../../../store';
import {UIStyles} from '../../../assets';
import {useFocusEffect} from '@react-navigation/native';
import {productsSelectors} from '../../../store';
import {CatalogList, PromotionsList} from '../';
import {Route, MainProps} from '../../../navigation';
import {Box, Text} from 'native-base';

export const Main = ({navigation: {navigate}}: MainProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const catalog = typedUseSelector(productsSelectors.catalog);
  const promotions = typedUseSelector(productsSelectors.promoProducts);
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
  const foundProducts = typedUseSelector(state =>
    productsSelectors.foundProducts(state, sort),
  );
  const [input, setInput] = useState('');
  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const shortToast = (message: string) => {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        };
        setExitApp(exitApp + 1);
        if (exitApp < 1) {
          shortToast('Для выхода из приложения нажмите еще раз');
        } else {
          BackHandler.exitApp();
        }
        setTimeout(() => {
          setExitApp(0);
        }, 2000);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [exitApp]),
  );

  return (
    <Box flex={1} px={3}>
      <Search input={input} setInput={setInput} />
      {input.length ? (
        <>
          <Sort sort={sort} setSort={setSort} />
          <ProductList data={foundProducts} />
        </>
      ) : (
        <CatalogList
          children={catalog}
          header={
            <>
              {promotions.length > 0 && (
                <>
                  <TouchableOpacity onPress={() => navigate(Route.Promotions)}>
                    <View style={UIStyles.flexRow}>
                      <Text style={UIStyles.font30b}>Акции</Text>
                      <Icon name="right" style={UIStyles.iconD} />
                    </View>
                  </TouchableOpacity>
                  <PromotionsList horizontal={true} />
                </>
              )}
              <Text bold fontSize={'2xl'}>Каталог</Text>
            </>
          }
        />
      )}
    </Box>
  );
};
