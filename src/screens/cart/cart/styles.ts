import {StyleSheet} from 'react-native';
import {Colors, UIStyles} from '../../../assets';

export default StyleSheet.create({
  order: {
    ...UIStyles.shadow,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D93931',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  counterBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  counter: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 99,
  },
  button: {
    borderWidth: 0,
  },
  productBlock: {
    ...UIStyles.flexRow,
    flexWrap: 'wrap',
  },
  orderTextBlock: {
    flex: 1,
    paddingLeft: 17,
  },
  weight: {
    ...UIStyles.whiteFont,
    paddingVertical: 10,
  },
  divider: {
    marginBottom: 17,
  },
  trash: {
    paddingRight: 18,
  },
  countTextStyle: {
    ...UIStyles.redBoldFont,
    paddingLeft: 0,
    paddingRight: 0,
  },
  productTitle: {
    ...UIStyles.whiteBoldFont,
    marginRight: 1,
  },
  flatList: {
    paddingBottom: 130,
    paddingHorizontal: 15
  },
  footer: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: 15,
    paddingBottom: 10,
    alignSelf: 'center',
  },
});
