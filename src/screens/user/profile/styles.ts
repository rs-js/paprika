import {Dimensions, StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  title: {
    ...UIStyles.font25b,
    paddingBottom: 21,
  },
  subtitle: {
    ...UIStyles.font20b,
    marginBottom: 21,
  },
  button: {
    ...UIStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D93931',
    borderRadius: 30,
  },
  deliveryButton: {
    marginTop: 24,
    paddingVertical: 10,
  },
  userInfo: {
    ...UIStyles.shadow,
    backgroundColor: '#D93931',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 21,
  },
  userText: {
    ...UIStyles.whiteFont,
    paddingBottom: 5,
  },
  info: {
    ...UIStyles.whiteBoldFont,
    paddingVertical: 20,
  },
  userHistory: {
    ...UIStyles.whiteBoldFont,
    paddingVertical: 20,
  },
  deliveryInfo: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  icon: {
    fontSize: 12,
  },
  pdf: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  productBlock: {
    ...UIStyles.flexRow,
    flexWrap: 'wrap',
  },
  delivery: {
    ...UIStyles.flexRow,
    paddingBottom: 15,
  },
  actionButton: {
    paddingVertical: 15,
    marginBottom: 10,
  },
  addAddressButton: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 36,
    justifyContent: 'space-between',
    height: 325,
  },
});
