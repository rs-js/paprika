import {Platform, StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  subtitle: {
    ...UIStyles.font20b,
    paddingVertical: 20,
  },
  infoBlock: {
    ...UIStyles.shadow,
    backgroundColor: '#D93931',
    borderRadius: 20,
    padding: 20,
  },
  infoText: {
    ...UIStyles.whiteBoldFont,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    marginTop: 15,
  },
  mapView: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    height: 269,
  },
  flatList: {
    paddingTop: 15,
    paddingBottom: 25,
  },
  headerStyle: {
    backgroundColor: '#fff',
    shadowOpacity: 0,
    elevation: 0,
  },
  rightHeader: {
    paddingRight: 29,
  },
  leftHeader: {
    paddingLeft: Platform.OS === 'ios' ? 15 : 29,
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
});
