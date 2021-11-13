import {StyleSheet} from 'react-native';
import {Colors, UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    ...UIStyles.container,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...UIStyles.font25b,
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: '#D93931',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 42,
    paddingTop: 25,
  },
  input: {
    marginBottom: 18,
    backgroundColor: '#fff',
    paddingLeft: 30,
  },
  address: {
    ...UIStyles.font25Wb,
    paddingTop: 12,
    paddingBottom: 20,
  },
  addressBlock: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  icon: {
    ...UIStyles.icon20D,
    marginLeft: 15,
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
  modalAddress: {
    backgroundColor: Colors.PINK,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  divider: {
    marginBottom: 20,
  },
});
