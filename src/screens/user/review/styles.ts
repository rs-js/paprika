import {StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    ...UIStyles.container,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...UIStyles.font25b,
    paddingBottom: 33,
  },
  textInput: {
    textAlignVertical: 'top',
  },
  input: {
    borderRadius: 20,
    paddingTop: 16,
    marginBottom: 25,
    paddingHorizontal: 20,
    height: 117,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  review: {
    ...UIStyles.boldFont,
    paddingTop: 20,
    textAlign: 'center',
  },
});
