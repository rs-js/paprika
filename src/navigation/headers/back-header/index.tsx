import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {UIStyles} from '../../../assets';

export const BackHeader = () => {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity onPress={() => goBack()}>
      <Icon name="left" style={UIStyles.iconD} />
    </TouchableOpacity>
  );
};
