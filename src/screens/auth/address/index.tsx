import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import styles from './styles';
import {Colors, UIStyles} from '../../../assets';
import {AnimatedButton} from '../../../components';
import {
  CheckCircleIcon,
  Icon,
  Text,
  Input,
  Pressable,
  Box,
  ScrollView,
  FormControl,
  TextArea,
  HStack,
  VStack,
  KeyboardAvoidingView,
} from 'native-base';
import {
  authActions,
  userActions,
  IState,
  userSelectors,
  authSelectors,
} from '../../../store';
import {AddressProps} from '../../../navigation';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';

export const Address = ({
  navigation: {goBack},
  route: {
    params: {item, user},
  },
}: AddressProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const pending = typedUseSelector(authSelectors.pending);
  const token = typedUseSelector(authSelectors.token);
  const userData = typedUseSelector(userSelectors.user);
  const dispatch = useDispatch();
  const suggestions = typedUseSelector(userSelectors.suggestions);
  const [suggestion, setSuggestion] = useState({
    data: {},
    visible: false,
    show: 'street',
  });
  const [values, setValues] = useState({
    city: 'Подольск',
    street: '',
    house: '',
    building: '',
    corpus: '',
    porch: '',
    intercomCode: '',
    floor: '',
    apartment: '',
    comment: '',
  });
  const {
    city,
    street,
    house,
    building,
    corpus,
    porch,
    intercomCode,
    floor,
    apartment,
    comment,
  } = values;
  const isEnabled = Object.values({
    // city,
    street,
    house,
  }).every((val: string) => val.length > 0);

  useEffect(() => {
    item && token && setValues({...item});
  }, [item, token]);

  const handleSubmit = useCallback(() => {
    const saveUserAddress = () => {
      let id = item ? item.id : '';
      const addresses = item
        ? userData.addresses.filter(address => address.id !== item.id) // edit
        : userData.addresses; // add
      dispatch(
        userActions.editUserData({
          ...userData,
          addresses: [{...values, id}, ...addresses],
        }),
      );
      goBack();
    };
    token
      ? saveUserAddress()
      : user && dispatch(authActions.signUp({...user, addresses: [values]}));
  }, [dispatch, goBack, item, token, user, userData, values]);

  const onChangeText = useCallback(
    (name: 'house' | 'entrance' | 'street' | 'apartment' | 'floor') => {
      return async (value: string) => {
        if (name === 'street') {
          dispatch(userActions.fetchDaDataStreets(value));
          setSuggestion({...suggestion, visible: true, show: 'street'});
        } else if (name === 'house') {
          // @ts-ignore
          dispatch(
            userActions.fetchDaDataHouses(
              value,
              suggestion.data.street_fias_id,
            ),
          );
          setSuggestion({...suggestion, visible: true, show: 'house'});
        }
        setValues({...values, [name]: value});
      };
    },
    [dispatch, suggestion, values],
  );

  const onSelectSuggestion = useCallback(
    ({data}) => {
      setSuggestion({show: '', data, visible: false});
      data.street &&
        setValues({
          ...values,
          street: data.street,
        });
      data.house &&
        setValues({
          ...values,
          house: data.house,
        });
    },
    [values],
  );

  const renderSuggestion = useCallback(() => {
    const isSearchHome = suggestion.show === 'house';
    const top = isSearchHome ? 255 : 190;

    const arr = isSearchHome ? suggestions.houses : suggestions.streets;

    const items = arr.map((a: any, i: number) => (
      <Pressable onPress={() => onSelectSuggestion(a)}>
        <Text
          style={{
            paddingHorizontal: 8,
            paddingTop: i === 0 ? 16 : 8,
            paddingBottom: i + 1 === isSearchHome ? 16 : 8,
          }}
          children={a.value}
          key={a.value}
          onPress={() => onSelectSuggestion(a)}
        />
      </Pressable>
    ));

    return (
      suggestion.visible && (
        <Box style={[styles.suggestions, {top}]}>
          <Box children={items} style={styles.suggestionsWrapper} />
        </Box>
      )
    );
  }, [
    onSelectSuggestion,
    suggestion.show,
    suggestion.visible,
    suggestions.houses,
    suggestions.streets,
  ]);

  return (
    <ScrollView
      mb={3}
      flexGrow={1}
      px={3}
      keyboardShouldPersistTaps={'handled'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        flex={1}>
        <VStack space={1}>
          <FormControl isRequired>
            <FormControl.Label style={UIStyles.whiteFont}>
              Город
            </FormControl.Label>
            <Input
              fontSize="md"
              variant="rounded"
              bg={Colors.PINK}
              editable={false}
              // autoFocus
              value={city}
              style={UIStyles.whiteFont}
              // onChangeText={(text) => setValues({...values, city: text})}
              // placeholder="Введите город"
              // placeholderTextColor="#ccc"
            />
            <FormControl.Label style={UIStyles.whiteFont}>
              Улица
            </FormControl.Label>
            <Input
              fontSize="md"
              variant="rounded"
              InputRightElement={
                <CheckCircleIcon
                  size={4}
                  color={street.length === 0 ? Colors.RED : Colors.green}
                  paddingRight={10}
                />
              }
              bg={Colors.PINK}
              autoFocus
              onFocus={() => setSuggestion({...suggestion, show: 'street'})}
              value={street}
              onChangeText={onChangeText('street')}
              style={UIStyles.whiteFont}
              placeholder="Введите улицу"
              placeholderTextColor="#ccc"
            />
          </FormControl>
          <HStack space={1}>
            <FormControl flex={1} isRequired>
              <Input
                fontSize="md"
                variant="rounded"
                InputRightElement={
                  <CheckCircleIcon
                    size={4}
                    color={house.length > 0 ? Colors.green : Colors.RED}
                    paddingRight={10}
                  />
                }
                bg={Colors.PINK}
                InputLeftElement={
                  <Icon
                    pl={1}
                    as={<VIcon name="home" />}
                    style={UIStyles.iconW}
                  />
                }
                onFocus={() => setSuggestion({...suggestion, show: 'house'})}
                value={house}
                style={UIStyles.whiteFont}
                onChangeText={onChangeText('house')}
                placeholder="Дом"
                placeholderTextColor="#ccc"
              />
            </FormControl>
            <Input
              fontSize="md"
              variant="rounded"
              bg={Colors.PINK}
              flex={1}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="office-building" />}
                  style={UIStyles.iconW}
                />
              }
              value={building}
              style={UIStyles.whiteFont}
              onChangeText={text => setValues({...values, building: text})}
              placeholder="Строение"
              placeholderTextColor="#ccc"
            />
          </HStack>
          <HStack space={1}>
            <Input
              fontSize="md"
              variant="rounded"
              bg={Colors.PINK}
              flex={1}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="office-building" />}
                  style={UIStyles.iconW}
                />
              }
              style={UIStyles.whiteFont}
              value={corpus}
              onChangeText={text => setValues({...values, corpus: text})}
              placeholder="Корпус"
              placeholderTextColor="#ccc"
            />
            <Input
              fontSize="md"
              variant="rounded"
              bg={Colors.PINK}
              flex={1}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="door-open" />}
                  style={UIStyles.iconW}
                />
              }
              style={UIStyles.whiteFont}
              value={porch}
              onChangeText={text => setValues({...values, porch: text})}
              placeholder="Подъезд"
              keyboardType="number-pad"
              placeholderTextColor="#ccc"
            />
          </HStack>
          <HStack space={1}>
            <Input
              fontSize="md"
              variant="rounded"
              flex={1}
              bg={Colors.PINK}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="gesture-tap-hold" />}
                  style={UIStyles.iconW}
                />
              }
              placeholder="Домофон"
              value={intercomCode}
              onChangeText={text => setValues({...values, intercomCode: text})}
              style={UIStyles.whiteFont}
              placeholderTextColor="#ccc"
            />
            <Input
              fontSize="md"
              variant="rounded"
              flex={1}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="elevator-passenger" />}
                  style={UIStyles.iconW}
                />
              }
              bg={Colors.PINK}
              value={floor}
              onChangeText={text => setValues({...values, floor: text})}
              style={UIStyles.whiteFont}
              keyboardType="number-pad"
              placeholder="Этаж"
              placeholderTextColor="#ccc"
            />
          </HStack>
          <HStack>
            <Input
              fontSize="md"
              variant="rounded"
              bg={Colors.PINK}
              flex={0.5}
              InputLeftElement={
                <Icon
                  pl={1}
                  as={<VIcon name="door-closed" />}
                  style={UIStyles.iconW}
                />
              }
              value={apartment}
              onChangeText={text => setValues({...values, apartment: text})}
              style={UIStyles.whiteFont}
              keyboardType="number-pad"
              placeholder="Квартира"
              placeholderTextColor="#ccc"
            />
          </HStack>
          <TextArea
            flex={1}
            fontSize="md"
            variant="rounded"
            bg={Colors.PINK}
            placeholder="Комментарий"
            placeholderTextColor="#ccc"
            value={comment}
            style={styles.commentText}
            onChangeText={text => setValues({...values, comment: text})}
          />
          {renderSuggestion()}
        </VStack>
        <AnimatedButton
          title={token ? 'Сохранить' : 'Зарегистроваться'}
          onPress={handleSubmit}
          pending={pending}
          disabled={!isEnabled}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
