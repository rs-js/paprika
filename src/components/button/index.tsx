import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {UIStyles} from '../../assets/styles';

export const UIButton = ({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[UIStyles.button, UIStyles.shadow]}
      disabled={disabled}>
      <Text style={[UIStyles.whiteBoldFont, disabled && UIStyles.disabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
