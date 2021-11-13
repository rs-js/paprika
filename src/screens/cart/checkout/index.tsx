import React, {useState} from 'react';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import styles, {pickerSelectStyles} from './styles';
import {View, Text, FlatList} from 'react-native';
import {UIStyles} from '../../../assets';
import {AnimatedButton} from '../../../components';
import RNPickerSelect from 'react-native-picker-select';
import {ScrollView} from 'native-base';
import {
  authSelectors,
  cartActions,
  cartSelectors,
  IState,
  userSelectors,
} from '../../../store';

export const Checkout = () => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const {deliveries, delivery_term, payments, settings} = typedUseSelector(
    userSelectors.refs,
  );
  const {cart, cartAmount, cartOrder} = typedUseSelector(
    cartSelectors.cartData,
  );
  const {fullAddresses} = typedUseSelector(userSelectors.user);
  const pending = typedUseSelector(authSelectors.pending);
  const [time, setTime] = useState(delivery_term[0].value);
  const [address, setAddress] = useState(fullAddresses[0]?.value);
  const [deliveryId, setDeliveryId] = useState(deliveries[0]?.value);
  const [paymentId, setPaymentId] = useState(payments[0].value);
  const deliveryPrice =
    deliveries[deliveries.findIndex(({value}) => value === deliveryId)].price;
  const bankPayment =
    payments[payments.findIndex(({value}) => value === paymentId)].value ===
    settings.card_payment_id;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} m={3}>
      <FlatList
        ListHeaderComponent={<Text style={styles.header}>Список заказа</Text>}
        contentContainerStyle={styles.flatList}
        data={cart}
        renderItem={({item: {product, quantity}, index}) => (
          <View style={UIStyles.flexRow}>
            <Text numberOfLines={1} style={styles.title}>
              {index + 1}. {product?.title}
            </Text>
            <Text style={styles.total}>
              {quantity}
              {product?.unit} {product?.cost * quantity}₽
            </Text>
          </View>
        )}
      />
      <Text style={styles.subtitle}>Оплата</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={setPaymentId}
          items={payments}
          value={paymentId}
          style={pickerSelectStyles}
        />
      </View>
      <Text style={styles.subtitle}>Время заказа</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={setTime}
          items={delivery_term}
          value={time}
          style={pickerSelectStyles}
        />
      </View>
      <Text style={styles.subtitle}>Доставка {deliveryPrice} ₽</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          // onDonePress={() => console.log(deliveryId)}
          placeholder={{}}
          onValueChange={setDeliveryId}
          items={deliveries}
          value={deliveryId}
          style={pickerSelectStyles}
        />
      </View>
      <Text style={styles.subtitle}>Адрес доставки</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={setAddress}
          items={fullAddresses}
          style={pickerSelectStyles}
        />
      </View>
      <View style={UIStyles.flexRow}>
        <Text style={UIStyles.font20b}>Стоимость: {cartAmount} ₽</Text>
        <Text style={UIStyles.font20b}>
          Итого: {cartAmount + Number(deliveryPrice)} ₽
        </Text>
      </View>
      <AnimatedButton
        title={bankPayment ? 'Оплатить' : 'Оформить доставку'}
        onPress={() => {
          const order = {
            paymentId,
            time,
            address,
            deliveryId,
            deliveryPrice,
            cart: cartOrder,
          };
          bankPayment
            ? dispatch(cartActions.addBankOrder(order))
            : dispatch(cartActions.addCashOrder(order));
        }}
        pending={pending}
        disabled={false}
      />
    </ScrollView>
  );
};
