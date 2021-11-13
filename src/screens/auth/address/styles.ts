import {StyleSheet} from 'react-native';
import {UIStyles} from '../../../assets';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  fullInput: {
    backgroundColor: 'rgba(217,57,49,.5)',
    marginBottom: 16,
    paddingLeft: 20,
  },
  midInput: {
    backgroundColor: 'rgba(217,57,49,.5)',
    width: '48%',
    marginBottom: 20,
  },
  icon: {
    color: '#ccc',
  },
  heart: {
    paddingRight: 17,
  },
  comment: {
    // backgroundColor: 'rgba(217,57,49,.5)',
    // marginTop: 33,
    textAlignVertical: 'top',
  },
  commentText: {
    ...UIStyles.whiteFont,
    paddingTop: 20,
    paddingLeft: 20,
    textAlignVertical: 'top',
  },
  header: {
    backgroundColor: '#fff',
    shadowOpacity: 0,
    elevation: 0,
  },
  navButtons: {
    ...UIStyles.flexRow,
    paddingRight: 29,
  },
  leftHeader: {
    paddingLeft: 29,
  },
  suggestions: {
    right: 0,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  suggestionsWrapper: {
    shadowRadius: 1,
    borderRadius: 1,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});
