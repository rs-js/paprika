import React from 'react';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {View, FlatList} from 'react-native';
import {ProductItem} from '../';
import {UIStyles} from '../../../assets';
import {IState} from "../../../store";
import {productsSelectors} from "../../../store";

export const PromotionsList = ({horizontal}: {horizontal: boolean}) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const promotions = typedUseSelector(productsSelectors.promoProducts);
  return (
    <FlatList
      numColumns={horizontal ? 0 : 2}
      horizontal={horizontal}
      columnWrapperStyle={horizontal ? null : UIStyles.column}
      ItemSeparatorComponent={() => (
        <View style={horizontal ? UIStyles.dividerH : UIStyles.dividerV} />
      )}
      data={promotions}
      renderItem={({item}) => <ProductItem product={item} />}
    />
  );
};

export const Promotions = () => {
  return <PromotionsList horizontal={false} />;
};
