import {Text, TextInput, LogBox, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';

StatusBar.setBarStyle('light-content', true);
LogBox.ignoreAllLogs();
enableScreens();

// @ts-ignore
Text.defaultProps = {...(Text.defaultProps || {}), allowFontScaling: false};

// @ts-ignore
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
