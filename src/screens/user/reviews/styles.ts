import {StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    ...UIStyles.container,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...UIStyles.font25b,
    paddingBottom: 16,
  },
  review: {
    ...UIStyles.shadow,
    backgroundColor: '#D93931',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  name: {
    flexDirection: 'row',
  },
  nameText: {
    ...UIStyles.whiteBoldFont,
    paddingRight: 16,
  },
});
