import {StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    ...UIStyles.container,
    justifyContent: 'space-between',
  },
  order: {
    ...UIStyles.flexRow,
    flexWrap: 'wrap',
  },
  orderText: {
    ...UIStyles.whiteBoldFont,
    paddingBottom: 10,
  },
  orders: {
    ...UIStyles.shadow,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D93931',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 17,
  },
  orderTextBlock: {
    flex: 1,
    paddingLeft: 17,
  },
  weight: {
    fontSize: 15,
    color: '#fff',
    paddingBottom: 10,
  },
  flatList: {
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
});
