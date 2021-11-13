import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {UIStyles} from '../../../assets';

export const DrawerHeader = () => {
  const {toggleDrawer} = useNavigation();
  return (
    <TouchableOpacity onPress={() => toggleDrawer()}>
      <Icon name="menu" style={UIStyles.iconD} />
    </TouchableOpacity>
  );
};
