import React, {useEffect, useState} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {Share, Platform} from 'react-native';
import {Icon, Text, ScrollView, FlatList, Pressable, Box} from 'native-base';
import {UIStyles} from '../../../assets';
import {
  IState,
  authActions,
  cartActions,
  userActions,
  userSelectors,
  authSelectors,
} from '../../../store';
import {Route, UserProps} from '../../../navigation';
import {OrderItem} from '../';
import {UIButton} from '../../../components';
import IMask from 'imask';
import Modal from 'react-native-modal';
import VIcon from 'react-native-vector-icons/AntDesign';

export const Profile = ({navigation: {navigate}}: UserProps) => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {sortedOrders} = typedUseSelector(userSelectors.orders);
  const token = typedUseSelector(authSelectors.token);
  const {name, phoneNumber, email, addresses} = typedUseSelector(
    userSelectors.user,
  );
  const [showModal, setShowModal] = useState({
    openModal: false,
    closeModal: false,
  });

  useEffect(() => {
    if (token) {
      dispatch(userActions.fetchUserData());
      dispatch(cartActions.fetchOrders());
      dispatch(cartActions.fetchCart());
    } else {
      navigate(Route.Login);
    }
  }, [dispatch, navigate, token]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.OS === 'ios' ? '' : '',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log('Share was successful');
        } else {
          // console.log('Share was dismissed');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share was dismissed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const phoneMask = IMask.createMask({
    mask: '+{7} (000) 000-00-00',
  });
  return (
    <ScrollView contentContainerStyle={UIStyles.container}>
      <Text style={styles.subtitle}>
        Здравствуйте, {name ? name : 'Покупатель'}!
      </Text>
      {token && (
        <Box style={styles.userInfo}>
          <Box style={UIStyles.flexRow}>
            <Text style={styles.info}>Мои данные</Text>
            <Box style={UIStyles.flexRow}>
              <Pressable onPress={() => navigate(Route.ProfileEdit)}>
                <Icon
                  as={
                    <VIcon
                      name="form"
                      style={[UIStyles.icon20W, UIStyles.padding]}
                    />
                  }
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  setShowModal({closeModal: false, openModal: true})
                }>
                <Icon as={<VIcon name="logout" style={UIStyles.icon20W} />} />
              </Pressable>
            </Box>
          </Box>
          <Text style={styles.userText}>
            {token && phoneMask.resolve(phoneNumber)}
          </Text>
          <Text style={styles.userText}>{email}</Text>
          <FlatList
            data={addresses}
            renderItem={({item}) => (
              <Text style={styles.userText}>
                {`г.${item.city}, ул.${item.street}, д.${item.house}-${item.apartment}`}
              </Text>
            )}
          />
          <Pressable
            style={styles.addAddressButton}
            onPress={() =>
              navigate(Route.Address, {
                headerTitle: 'Новый адрес',
                item: null,
                user: null,
              })
            }>
            <Icon as={<VIcon name="plus" style={UIStyles.icon20W} />} />
            <Text style={UIStyles.whiteBoldFont}>Добавить ещё адрес</Text>
          </Pressable>
        </Box>
      )}
      {!token && (
        <Pressable
          style={[styles.button, styles.actionButton]}
          onPress={() => navigate(Route.Login)}>
          <Text style={UIStyles.whiteBoldFont}>Зарегистрироваться</Text>
        </Pressable>
      )}
      <Pressable style={[styles.button, styles.actionButton]} onPress={onShare}>
        <Text style={UIStyles.whiteBoldFont}>Поделиться приложением</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.actionButton]}
        onPress={() => navigate(Route.Reviews)}>
        <Text style={UIStyles.whiteBoldFont}>Отзывы</Text>
      </Pressable>
      {token && (
        <Box style={styles.userInfo}>
          <Pressable
            onPress={() => navigate(Route.Orders)}
            style={UIStyles.flexRow}>
            <Text style={styles.userHistory}>История покупок</Text>
            <Icon as={<VIcon name="right" style={UIStyles.whiteIcon} />} />
          </Pressable>
          {sortedOrders.length > 0 ? (
            <OrderItem order={sortedOrders[0]} />
          ) : (
            <Box style={styles.deliveryInfo}>
              <Text style={UIStyles.defaultFont}>Нет активных заказов</Text>
            </Box>
          )}
        </Box>
      )}
      <Modal isVisible={showModal.openModal}>
        <Box style={styles.modal}>
          <Box style={UIStyles.flexRow}>
            <Text style={UIStyles.font20b}>Подтверждение</Text>
            <Pressable
              onPress={() =>
                setShowModal({
                  openModal: false,
                  closeModal: true,
                })
              }>
              <Icon as={<VIcon name="close" style={UIStyles.icon30D} />} />
            </Pressable>
          </Box>
          <Text style={UIStyles.defaultFont}>
            Вы действительно хотите выйти из профиля?
          </Text>
          <UIButton
            title="Да, я хочу выйти"
            onPress={() => {
              dispatch(authActions.signOut());
              setShowModal({
                openModal: false,
                closeModal: true,
              });
            }}
          />
          <UIButton
            title="Нет, я останусь"
            onPress={() => {
              setShowModal({
                openModal: false,
                closeModal: true,
              });
            }}
          />
        </Box>
      </Modal>
    </ScrollView>
  );
};
