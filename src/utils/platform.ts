import {Platform, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const platform = {
  ios: Platform.OS === 'ios',
  iosX: Platform.OS === 'ios' && height > 375,
  iosSE: Platform.OS === 'ios' && width < 375,
  android: Platform.OS === 'android',
  version: Platform.Version,
  android4: Platform.OS === 'android' && Platform.Version < 21,
};
