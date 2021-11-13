import React, {useEffect, useRef} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Colors, UIStyles} from '../../assets';
import {productsActions, IState, authSelectors} from '../../store';
import {SearchBar} from 'react-native-elements';
import VIcon from 'react-native-vector-icons/AntDesign';
import {Box, Icon} from 'native-base';

export const Search = ({
  input,
  setInput,
  categoryId = '',
}: {
  input: string;
  setInput: (input: string) => void;
  categoryId?: string;
}) => {
  const dispatch = useDispatch();
  const textInput = useRef<any>();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const pending = typedUseSelector(authSelectors.pending);
  useEffect(() => {
    input.length > 0 &&
      dispatch(productsActions.searchProducts(input, categoryId));
  }, [dispatch, input, categoryId]);
  return (
    <Box
      mt={5}
      _light={{
        backgroundColor: 'gray.100',
      }}>
      <SearchBar
        showLoading={pending}
        ref={textInput}
        containerStyle={styles.container}
        inputStyle={UIStyles.whiteBoldFont}
        inputContainerStyle={styles.input}
        round
        placeholder="Поиск"
        placeholderTextColor={Colors.WHITE}
        onChangeText={setInput}
        value={input}
        loadingProps={{color: Colors.WHITE}}
        searchIcon={() => (
          <Icon
            onPress={() => textInput.current.focus()}
            size={'sm'}
            color={Colors.WHITE}
            as={<VIcon name="search1" />}
          />
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayForm,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  input: {
    borderRadius: 30,
    backgroundColor: Colors.PINK7,
  },
  search: {
    color: Colors.WHITE,
    fontSize: 20,
    paddingLeft: 5,
  },
});
