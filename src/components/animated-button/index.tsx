import React, {useEffect, memo} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {UIStyles} from '../../assets/styles';

export const AnimatedButton = memo(
  ({
    title,
    onPress,
    disabled,
    pending,
    login = false,
  }: {
    title: string;
    onPress: () => void;
    disabled: boolean;
    pending: boolean;
    login?: boolean;
  }) => {
    const animated = {
      width: new Animated.Value(Dimensions.get('screen').width - 58),
    };
    const width = animated.width;
    useEffect(() => {
      pending
        ? Animated.timing(animated.width, {
            toValue: 60,
            duration: 250,
            useNativeDriver: false,
          }).start()
        : Animated.timing(animated.width, {
            toValue: Dimensions.get('screen').width - 58,
            duration: 250,
            useNativeDriver: false,
          }).start();
    }, [animated.width, pending]);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.center}
        disabled={disabled || pending}>
        <Animated.View
          style={
            login
              ? [styles.login, {width}]
              : [UIStyles.button, UIStyles.shadow, {width}]
          }>
          {pending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={
                disabled
                  ? [UIStyles.whiteBoldFont, UIStyles.disabled]
                  : UIStyles.whiteBoldFont
              }>
              {title}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
