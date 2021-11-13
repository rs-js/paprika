import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {AirbnbRating} from 'react-native-ratings';
import styles from './styles';
import {UIButton} from '../../../components';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {UIStyles} from '../../../assets';
import {Box, FlatList, Text} from 'native-base';
import {
  Review,
  IState,
  userSelectors,
  authSelectors,
  userActions,
} from '../../../store';
import {Route, MainProps} from '../../../navigation';

export const ReviewItem = ({item}: {item: Review}) => (
  <Box style={styles.review}>
    <Box style={styles.header}>
      <Box style={styles.name}>
        <Text style={styles.nameText}>{item.user.name}</Text>
        <AirbnbRating
          defaultRating={item.rate}
          isDisabled={true}
          showRating={false}
          count={5}
          size={10}
          // @ts-ignore
          selectedColor="#fff"
        />
      </Box>
      <Text style={[UIStyles.whiteFont, UIStyles.scale12]}>
        {format(new Date(item.createdAt), 'dd.MM.yy HH:mm')}
      </Text>
    </Box>
    <Text style={UIStyles.whiteFont}>{item.comment}</Text>
  </Box>
);

export const Reviews = ({navigation: {navigate}}: MainProps) => {
  const typedUseSelector: TypedUseSelectorHook<IState> = useSelector;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.fetchReviews());
  }, [dispatch]);
  const reviews = typedUseSelector(userSelectors.reviews);
  const token = typedUseSelector(authSelectors.token);
  return (
    <FlatList
      flex={1}
      data={reviews}
      renderItem={({item}) => <ReviewItem item={item} />}
      ListFooterComponent={
        <Box px={3}>
          {token && (
            <UIButton
              title="Оставить отзыв"
              onPress={() => navigate(Route.Review)}
            />
          )}
        </Box>
      }
    />
  );
};
