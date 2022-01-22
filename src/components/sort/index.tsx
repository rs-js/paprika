import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {UIStyles} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';

export interface SortProducts {
  default: boolean;
  price: {
    enabled: boolean;
    asc: boolean;
  };
  alpha: {
    enabled: boolean;
    asc: boolean;
  };
}

export const Sort = ({sort, setSort}: {sort: SortProducts; setSort: any}) => {
  return (
    <View style={[UIStyles.flexRow, UIStyles.paddingV10]}>
      <TouchableOpacity
        style={UIStyles.row}
        onPress={() =>
          setSort((previous: SortProducts) => ({
            ...previous,
            default: false,
            price: sort.price.enabled
              ? {enabled: true, asc: !sort.price.asc}
              : {
                  enabled: true,
                  asc: true,
                },
            alpha: {...sort.alpha, enabled: false},
          }))
        }>
        <FIcon
          name="ruble"
          style={sort.price.enabled ? UIStyles.icon20D : UIStyles.icon20g}
        />
        <FIcon
          name={sort.price.asc ? 'sort-amount-asc' : 'sort-amount-desc'}
          style={sort.price.enabled ? UIStyles.icon20D : UIStyles.icon20g}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setSort((previous: SortProducts) => ({
            ...previous,
            default: true,
            alpha: {...sort.alpha, enabled: false},
            price: {...sort.price, enabled: false},
          }))
        }>
        <IIcon name="refresh" style={UIStyles.icon20D} />
      </TouchableOpacity>
      <TouchableOpacity
        style={UIStyles.row}
        onPress={() =>
          setSort((previous: SortProducts) => ({
            ...previous,
            default: false,
            alpha: sort.alpha.enabled
              ? {enabled: true, asc: !sort.alpha.asc}
              : {
                  enabled: true,
                  asc: true,
                },
            price: {...sort.price, enabled: false},
          }))
        }>
        <Icon
          name="alphabet-cyrillic"
          style={sort.alpha.enabled ? UIStyles.icon20D : UIStyles.icon20g}
        />
        <FIcon
          name={sort.alpha.asc ? 'sort-alpha-asc' : 'sort-alpha-desc'}
          style={sort.alpha.enabled ? UIStyles.icon20D : UIStyles.icon20g}
        />
      </TouchableOpacity>
    </View>
  );
};
