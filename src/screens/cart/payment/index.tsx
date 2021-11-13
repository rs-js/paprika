import React, {useCallback, useLayoutEffect} from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';
// import {Icon, Pressable} from 'native-base';
import {UIStyles} from '../../../assets';
import {useFocusEffect} from '@react-navigation/native';
import Axios from 'axios';
import {BackHandler} from 'react-native';
import {Route, PaymentProps} from '../../../navigation';

// import VIcon from 'react-native-vector-icons/AntDesign';

interface NavState {
  url: string;
}

export const Payment = ({
  navigation: {navigate, pop, setOptions},
  route: {
    params: {formUrl, order},
  },
}: PaymentProps) => {
  const onNavigationStateChange = async (navState: NavState) => {
    if (navState.url.includes('success')) {
      await Axios.get(navState.url);
      navigate(Route.Main, {screen: Route.Tracking, params: {order}});
    }
    return;
  };
  useLayoutEffect(() => {
    setOptions({
      title: '',
      gestureEnabled: false,
      headerBackVisible: false,
      // headerLeft: () => (
      //   <Pressable style={UIStyles.paddingL15} onPress={() => pop()}>
      //     <Icon as={<VIcon name="left" style={UIStyles.iconD} />} />
      //   </Pressable>
      // ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        pop();
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <AutoHeightWebView
      androidHardwareAccelerationDisabled
      style={UIStyles.flex}
      javaScriptEnabled
      thirdPartyCookiesEnabled
      domStorageEnabled
      automaticallyAdjustContentInsets={false}
      scrollEnabled
      source={{uri: formUrl}}
      scalesPageToFit
      viewportContent={'width=device-width, user-scalable=no'}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};
