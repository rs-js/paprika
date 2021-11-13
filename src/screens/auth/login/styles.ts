import {StyleSheet} from 'react-native';
import { Colors, UIStyles } from "../../../assets";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.WHITE
  },
  image: {
    alignItems: 'center',
  },
  google: {
    ...UIStyles.shadow,
    backgroundColor: '#D93931',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  osSignIn: {
    height: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  textButton: {
    ...UIStyles.whiteFont,
    paddingLeft: 10,
  },
  apple: {
    borderWidth: 1,
  },

  buttons: {
    paddingBottom: 10,
  },
});
