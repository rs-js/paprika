import {StyleSheet} from 'react-native';
import {Colors, UIStyles} from '../../../assets';

export default StyleSheet.create({
  flatList: {
    ...UIStyles.shadow,
    backgroundColor: '#D93931',
    borderRadius: 20,
    padding: 20,
  },
  order: {
    paddingBottom: 180,
  },
  title: {
    ...UIStyles.whiteFont,
    flex: 1,
    marginRight: 5,
    textAlign: 'left',
  },
  total: {
    ...UIStyles.whiteFont,
    textAlign: 'right',
  },
  header: {
    ...UIStyles.whiteBoldFont,
    paddingBottom: 10,
    textAlign: 'center',
  },
  promoCode: {
    marginTop: 32,
    backgroundColor: 'rgba(217,57,49,.7)',
    paddingLeft: 20,
  },
  subtitle: {
    ...UIStyles.font20b,
    paddingVertical: 15,
  },
  picker: {
    backgroundColor: 'rgba(217,57,49,.7)',
    borderRadius: 30,
    paddingLeft: 20,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...UIStyles.whiteBoldFont,
    paddingVertical: 20,
    shadowColor: 'rgba(217, 10, 0, 0.2)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
  },
  inputAndroid: {
    ...UIStyles.whiteBoldFont,
    paddingVertical: 20,
    elevation: 4,
  },
  iconContainer: {
    top: 13,
    right: 20,
  },
});
