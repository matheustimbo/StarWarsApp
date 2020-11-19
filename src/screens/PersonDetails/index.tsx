import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import usePeopleDetails from '../../hooks/usePeopleDetails';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  PersonDetails: {index: number};
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'PersonDetails'>;

type Props = {
  route: ProfileScreenRouteProp;
};

const PersonDetails: React.FC<Props> = ({route}) => {
  const {index} = route.params;
  console.log('o index', index);
  const {people, filmsDetails, loadingFilms} = usePeopleDetails(index);

  return (
    <View>
      <Text>Name: {people.name}</Text>
      <Text>Height: {people.height}</Text>
      <Text>Mass: {people.mass}</Text>
      <Text>Hair color: {people.hair_color}</Text>
      <Text>Skin color: {people.skin_color}</Text>
      <Text>Birth Year: {people.birth_year}</Text>
      <Text>Gender: {people.gender}</Text>
      <Text>Homeworld: {people.homeworld}</Text>
      <Text>Filmes:</Text>
      {loadingFilms ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        filmsDetails.map((film) => <Text>{film.title}</Text>)
      )}
    </View>
  );
};

export default PersonDetails;
