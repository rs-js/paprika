import React, {useCallback, useState} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {Colors, UIStyles} from '../../../assets';
import {UIButton} from '../../../components';
import {
  Input,
  Icon,
  FlatList,
  Pressable,
  Box,
  ScrollView,
  Text,
  FormControl,
  CheckCircleIcon,
} from 'native-base';
import {Route} from '../../../navigation';
import IMask from 'imask';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {userActions, IState, userSelectors} from '../../../store';
import VIcon from 'react-native-vector-icons/Octicons';

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {id, name, addresses, email, phoneNumber} = typedUseSelector(
    userSelectors.user,
  );
  const phoneMask = IMask.createMask({
    mask: '+{7} (000) 000-00-00',
  });
  const [userData, setUserData] = useState({
    name,
    phoneNumber: phoneMask.resolve(phoneNumber),
    email,
  });
  const [showModal, setShowModal] = useState({
    openModal: false,
    closeModal: false,
    address: {id: '', title: ''},
  });
  const [validEmail, setValidEmail] = useState(true);

  const fixNumber = (val: string) => val.replace(/[^+0-9]/gim, '');
  const onEmailChanged = useCallback(
    text => {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(text)) {
        setValidEmail(false);
        setUserData({...userData, email: text});
        return false;
      } else {
        setUserData({...userData, email: text});
        setValidEmail(true);
      }
    },
    [userData],
  );

  const isEnabled = userData.name.length > 0 && validEmail;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Box>
        <Text fontSize={'2xl'} mb={3}>
          Редактирование профиля
        </Text>
        <Box style={styles.userInfo}>
          <FormControl>
            <Text color="white">Ваше имя</Text>
            <Input
              InputRightElement={
                <CheckCircleIcon
                  size={4}
                  color={userData.name.length > 0 ? Colors.green : Colors.RED}
                  paddingRight={10}
                />
              }
              variant="rounded"
              bg="white"
              placeholder="Введите ваше имя"
              placeholderTextColor="#808080"
              value={userData.name}
              onChangeText={text => setUserData({...userData, name: text})}
              mb={1}
            />
            <Text color="white">Ваш телефон</Text>
            <Input
              mb={1}
              variant="rounded"
              bg="white"
              editable={false}
              value={userData.phoneNumber}
            />
            <Text color="white">Ваш email</Text>
            <Input
              bg="white"
              variant="rounded"
              InputRightElement={
                <CheckCircleIcon
                  size={4}
                  color={validEmail ? Colors.green : Colors.RED}
                  paddingRight={10}
                />
              }
              placeholder="Введите ваш Email"
              placeholderTextColor="#808080"
              value={userData.email}
              keyboardType={'email-address'}
              style={UIStyles.defaultFont}
              onChangeText={onEmailChanged}
            />
          </FormControl>
          <Text style={styles.address} mt={3}>
            Адреса доставки
          </Text>
          <FlatList
            data={addresses}
            ItemSeparatorComponent={() => <Box style={styles.divider} />}
            renderItem={({item}) => (
              <Box style={styles.addressBlock}>
                <Text style={UIStyles.defaultFont}>
                  {`г.${item.city}, ул.${item.street}, д.${item.house}-${item.apartment}`}
                </Text>
                <Box style={[UIStyles.paddingTop15, UIStyles.row]}>
                  <Pressable
                    onPress={() =>
                      navigate(Route.Address, {
                        item,
                        headerTitle: 'Редактирование адреса',
                      })
                    }>
                    <Icon
                      as={<VIcon name={'pencil'} style={UIStyles.icon20D} />}
                    />
                  </Pressable>
                  {addresses.length > 1 && (
                    <Pressable
                      onPress={() =>
                        setShowModal({
                          closeModal: false,
                          openModal: true,
                          address: {
                            id: item.id,
                            title: `г.${item.city}, ул.${item.street}, д.${item.house}-${item.apartment}`,
                          },
                        })
                      }>
                      <Icon
                        as={<VIcon name={'trashcan'} style={styles.icon} />}
                      />
                    </Pressable>
                  )}
                </Box>
              </Box>
            )}
          />
        </Box>
      </Box>
      <Modal isVisible={showModal.openModal}>
        <Box style={styles.modal}>
          <Box style={UIStyles.flexRow}>
            <Text style={UIStyles.font20b}>Подтверждение</Text>
            <Pressable
              onPress={() =>
                setShowModal({
                  openModal: false,
                  closeModal: true,
                  address: {id: '', title: ''},
                })
              }>
              <Icon as={<VIcon name="x" style={UIStyles.icon30D} />} />
            </Pressable>
          </Box>
          <Text style={UIStyles.defaultFont}>
            Вы действительно хотите удалить данный адрес?
          </Text>
          <Box style={styles.modalAddress}>
            <Text style={UIStyles.whiteFont}>{showModal.address.title}</Text>
          </Box>
          <UIButton
            title="Удалить"
            onPress={() => {
              dispatch(
                userActions.editUserData({delete: showModal.address.id}),
              );
              setShowModal({
                openModal: false,
                closeModal: true,
                address: {id: '', title: ''},
              });
            }}
          />
        </Box>
      </Modal>
      <UIButton
        title="Сохранить"
        onPress={() => {
          dispatch(
            userActions.editUserData({
              id,
              addresses,
              name: userData.name,
              phoneNumber: fixNumber(userData.phoneNumber),
              email: userData.email,
            }),
          );
        }}
        disabled={!isEnabled}
      />
    </ScrollView>
  );
};
