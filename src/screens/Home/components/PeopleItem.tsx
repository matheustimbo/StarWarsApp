import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {People} from '../../../providers/peopleContext';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Star from '../../../assets/svgs/star.svg';

const {width} = Dimensions.get('window');

const PeopleItem: React.FC<{
  people: People;
  index: number;
  onPressBookmark: Function;
  isBookmarked: Function;
}> = ({people, index, onPressBookmark, isBookmarked}) => {
  const {navigate} = useNavigation();

  const bookmarked = isBookmarked(people);
  console.log('bookmarked', bookmarked);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.starPositioner}
        onPress={() => {
          onPressBookmark(people);
        }}>
        {bookmarked?.name ? (
          <Star width={24} height={24} fill="gold" />
        ) : (
          <Star width={24} height={24} fill="lightgray" />
        )}
      </TouchableOpacity>

      <Text>Name: {people.name}</Text>
      <Text>Height: {people.height}</Text>
      <Text>Mass: {people.mass}</Text>
      <Text>Hair color: {people.hair_color}</Text>
      <Text>Skin color: {people.skin_color}</Text>
      <Text>Birth Year: {people.birth_year}</Text>
      <Text>Gender: {people.gender}</Text>
      <Text>Homeworld: {people.homeworld}</Text>
      <RectButton onPress={() => navigate('PersonDetails', {index})}>
        <Text style={styles.btnTxt}>See details</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 12,
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    marginVertical: 12,
    alignSelf: 'center',
  },
  starPositioner: {
    position: 'absolute',
    top: 32,
    right: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  btnTxt: {
    color: 'blue',
  },
});

export default PeopleItem;
