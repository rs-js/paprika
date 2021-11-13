import {StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  button: {
    flex: 1,
    backgroundColor: '#D93931',
    borderRadius: 20,
    paddingVertical: 15,
  },
  buttonText: {
    ...UIStyles.whiteBoldFont,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  list: {
    marginRight: 15,
  },
  favorite: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
  },
  discounts: {
    marginRight: 34,
  },
});
