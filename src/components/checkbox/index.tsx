import React from 'react';
import styles from './styles';
import Checkbox from 'react-native-check-box';

export const UICheckbox = ({
  value,
  setValue,
  checkboxText,
}: {
  value: boolean;
  setValue: (value: boolean) => void;
  checkboxText: string;
}) => {
  return (
    <Checkbox
      rightText={checkboxText}
      rightTextStyle={styles.text}
      onClick={() => setValue(!value)}
      isChecked={value}
      checkBoxColor="#D93931"
    />
  );
};
