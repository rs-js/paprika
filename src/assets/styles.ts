import {Dimensions, PixelRatio, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export enum Colors {
  green = '#0f0',
  grayForm = '#f4f4f5',
  RED = '#D93931',
  BLACK = '#3A3A3A',
  WHITE = '#fff',
  Gray = '#ccc',
  PINK = 'rgba(217,57,49,.5)',
  PINK7 = 'rgba(217, 57, 49, .7)',
  POLYGON = 'rgba(217,57,49,.3)',
}

const Color = {
  black: {color: Colors.BLACK},
  white: {color: Colors.WHITE},
  red: {color: Colors.RED},
  gray: {color: Colors.Gray},
};

const fontB = {
  ...Color.black,
  fontWeight: 'bold',
};

const font = {
  ...Color.black,
};

const fontDb = {
  ...Color.red,
  fontWeight: 'bold',
};

const fontW = {
  ...Color.white,
};

const fontWb = {
  ...Color.white,
  fontWeight: 'bold',
};

export const UIStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  font30Db: {
    ...fontDb,
    fontSize: 30,
  },
  font30Wb: {
    ...fontWb,
    fontSize: 30,
  },
  font30b: {
    ...fontB,
    fontSize: 30,
  },
  font25Wb: {
    ...fontWb,
    fontSize: 25,
  },
  font25b: {
    ...fontB,
    fontSize: 25,
  },
  font20b: {
    ...fontB,
    fontSize: 20,
  },
  font20w: {
    ...fontW,
    fontSize: 20,
  },
  boldFont: {
    ...fontB,
    fontSize: moderateScale(15),
  },
  defaultFont: {
    ...font,
  },
  redBoldFont: {
    ...fontDb,
  },
  whiteFont: {
    ...fontW,
  },
  whiteBoldFont: {
    ...fontWb,
  },
  systemFont: {
    fontSize: 14,
  },
  heart: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  iconW: {
    ...Color.white,
  },
  iconD: {
    fontSize: 30,
    ...Color.red,
  },
  icon15: {
    ...Color.black,
    fontSize: 15,
  },
  icon15D: {
    ...Color.red,
    fontSize: 15,
  },
  whiteIcon: {
    ...Color.white,
  },
  icon20W: {
    ...Color.white,
    fontSize: 20,
  },
  icon20g: {
    ...Color.gray,
    fontSize: 20,
  },
  icon20D: {
    ...Color.red,
    fontSize: 20,
  },
  icon25W: {
    ...Color.white,
    fontSize: 25,
  },
  icon25D: {
    ...Color.red,
    fontSize: 25,
  },
  icon30W: {
    ...Color.white,
    fontSize: 30,
  },
  icon30D: {
    ...Color.red,
    fontSize: 30,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#D93931',
  },
  cartButton: {
    // ...UIStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.RED,
    borderRadius: 30,
    marginTop: 5,
    paddingVertical: 5,
  },
  title: {
    ...fontB,
    fontSize: 30,
    paddingBottom: 10,
  },
  title25: {
    ...fontB,
    fontSize: 25,
    paddingBottom: 25,
  },
  subtitle: {
    ...fontB,
    fontSize: 25,
    paddingBottom: 20,
  },
  image: {
    resizeMode: 'contain',
    height: moderateScale(200),
  },
  productImage: {
    resizeMode: 'contain',
    height: moderateScale(150),
  },
  image79: {
    width: Dimensions.get('window').width / 5,
    height: 79,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#D93931',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  flex: {
    flex: 1,
  },
  scale12: {
    fontSize: 12 / PixelRatio.getFontScale(),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  column: {
    justifyContent: 'space-between',
  },
  dividerH: {
    marginRight: 10,
  },
  dividerV: {
    marginBottom: 20,
  },
  dividerL: {
    ...Color.black,
    borderBottomWidth: 1,
  },
  padding: {
    padding: 10,
  },
  padding20: {
    padding: 20,
  },
  paddingV10: {
    paddingVertical: 10,
  },
  paddingV20: {
    paddingVertical: 20,
  },
  paddingL15: {
    paddingLeft: 15,
  },
  paddingTop15: {
    paddingTop: 15,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  paddingBottom20: {
    paddingBottom: 20,
  },
  paddingH15: {
    paddingHorizontal: 10,
  },
  flatList: {
    paddingBottom: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  discount: {
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dimensions2_5: {
    width: Dimensions.get('window').width / 2.2,
  },
  header: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  headerStyle: {
    backgroundColor: Colors.WHITE,
    shadowOpacity: 0,
    elevation: 0,
  },
  centerText: {
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
});
