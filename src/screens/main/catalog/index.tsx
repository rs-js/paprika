import React, {useCallback, useState} from 'react';
import {View, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import {Box, Pressable, Text} from 'native-base';
import {Constants} from '../../../utils';
import {UIStyles} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  CatalogProps,
  MainScreenNavigationProp,
  Route,
} from '../../../navigation';
import {Category, productsActions} from '../../../store';

export const CatalogList = ({
  children,
  header = null,
}: {
  children: Category[];
  header?: JSX.Element | null;
}) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(productsActions.fetchCatalog());
    setRefresh(false);
  }, [dispatch]);
  const {push, navigate} = useNavigation<MainScreenNavigationProp>();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onScroll={() => Keyboard.dismiss()}
      numColumns={2}
      columnWrapperStyle={UIStyles.column}
      ListHeaderComponent={header}
      ItemSeparatorComponent={() => <View style={UIStyles.dividerV} />}
      data={children}
      refreshing={refresh}
      onRefresh={() => {
        setRefresh(true);
        fetchData();
      }}
      contentContainerStyle={UIStyles.paddingV20}
      renderItem={({item}) => (
        <Pressable
          flex={1}
          mr={2}
          // style={UIStyles.dimensions2_5}
          onPress={() => {
            item.children.length > 0
              ? push(Route.Catalog, {
                  name: item.title,
                  children: item.children,
                })
              : navigate(Route.Section, {name: item.title, id: item.id});
          }}>
          <Box
            flex={1}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <FastImage
              source={{
                uri: Constants.baseURL + item.image,
              }}
              style={UIStyles.image}
            />
            <Text textAlign={'center'} bold p={1}>
              {item.title}
            </Text>
          </Box>
        </Pressable>
      )}
    />
  );
};

export const Catalog = ({
  route: {
    params: {children},
  },
}: CatalogProps) => {
  return (
    <View style={UIStyles.paddingH15}>
      <CatalogList children={children} />
    </View>
  );
};
