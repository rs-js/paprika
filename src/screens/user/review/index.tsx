import React, {useState} from 'react';
import styles from './styles';
import {Colors} from '../../../assets';
import {UIButton} from '../../../components';
import {AirbnbRating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import {ScrollView, Text, Box, Input} from 'native-base';
import {userActions} from '../../../store';

export const Review = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(4);
  const reviews = ['Очень плохо', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Box>
        <Text bold fontSize="2xl" mb={1}>Оставить отзыв</Text>
        <Box>
          <Input
            fontSize={"lg"}
            placeholder="Напишите ваш отзыв, предложения и пожелания"
            placeholderTextColor={Colors.BLACK}
            style={[styles.textInput, styles.input]}
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={6}
          />
        </Box>
        <Text bold fontSize="xl">Оценка</Text>
        <AirbnbRating
          onFinishRating={rating => setRate(rating)}
          showRating={false}
          defaultRating={4}
          size={55}
          // @ts-ignore
          selectedColor={Colors.RED}
        />
        <Text style={styles.review}>{reviews[rate - 1]}</Text>
      </Box>
      <UIButton
        title="Сохранить"
        onPress={() => dispatch(userActions.addReview({comment, rate}))}
      />
    </ScrollView>
  );
};
