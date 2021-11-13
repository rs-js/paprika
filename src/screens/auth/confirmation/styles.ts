import {Dimensions, StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    ...UIStyles.container,
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  title: {
    ...UIStyles.font20b,
    textAlign: 'center',
    paddingBottom: 23,
  },
  subtitle: {
    ...UIStyles.defaultFont,
    textAlign: 'center',
    paddingBottom: 23,
  },
  codeBlock: {
    alignItems: 'center',
    alignContent: 'center',
  },
  centerText: {
    ...UIStyles.defaultFont,
    textAlign: 'center',
    paddingTop: 10,
  },
  sendText: {
    paddingBottom: 20,
  },

  cell: {
    overflow: 'hidden',
    backgroundColor: '#D93931',
    width: Dimensions.get('window').width / 8,
    borderRadius: 10,
    marginLeft: 7,
    height: 69,
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 65,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },
  focusCell: {
    borderColor: '#3A3A3A',
  },
});
