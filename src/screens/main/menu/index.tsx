import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import {Images} from '../../../assets';
import Icon from 'react-native-vector-icons/AntDesign';
import {UIStyles} from '../../../assets';
import {Route, MenuProps} from '../../../navigation';
import url from '../../../utils/constants';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {userSelectors, IState} from '../../../store';
import {getVersion} from 'react-native-device-info';

export const Menu = ({navigation: {navigate, closeDrawer}}: MenuProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {settings} = typedUseSelector(userSelectors.refs);

  return (
    <ScrollView style={UIStyles.container}>
      <TouchableOpacity onPress={() => closeDrawer()}>
        <Icon name="left" style={UIStyles.iconD} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Image source={Images.logo} style={UIStyles.logo} />
      </View>
      <TouchableOpacity
        onPress={() => navigate(Route.Pdf, {doc: url.aboutURL, name: 'О нас'})}>
        <Text style={styles.text}>О нас</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(Route.Profile)}>
        <Text style={styles.text}>Профиль</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Служба поддержки</Text>
      <View style={styles.infoBlock}>
        <Text
          style={styles.supportText}
          onPress={() => Linking.openURL(`mailto:${settings.email}`)}>
          Почта:{'\n'}
          {settings.email}
        </Text>
        <Text
          style={styles.supportText}
          onPress={() => Linking.openURL(`tel:${settings.phone}`)}>
          Телефон:{'\n'}
          {settings.phone}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.privacyButton]}
        onPress={() =>
          navigate(Route.Pdf, {
            doc: url.licenseURL,
            name: 'Лицензионное соглашение',
          })
        }>
        <Text style={UIStyles.whiteBoldFont}>Лицензионное соглашение</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.privacyButton]}
        onPress={() =>
          navigate(Route.Pdf, {
            doc: url.confidentialURL,
            name: 'Политика конфиденциальности',
          })
        }>
        <Text style={UIStyles.whiteBoldFont}>Политика конфиденциальности</Text>
      </TouchableOpacity>
      <Text style={[UIStyles.paddingTop15, styles.center]}>
        Версия приложения: {getVersion()}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    ...UIStyles.font20b,
    paddingBottom: 20,
  },
  logo: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  subtitle: {
    ...UIStyles.font25b,
    paddingVertical: 25,
  },
  infoBlock: {
    ...UIStyles.shadow,
    borderRadius: 20,
    backgroundColor: '#D93931',
    padding: 20,
  },
  supportText: {
    ...UIStyles.whiteBoldFont,
    paddingBottom: 10,
  },
  button: {
    ...UIStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D93931',
    borderRadius: 30,
    paddingVertical: 15,
  },
  privacyButton: {
    marginTop: 25,
  },
  center: {
    textAlign: 'center',
  },
});
