import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import usePeopleDetails from '../../hooks/usePeopleDetails';
import {RouteProp} from '@react-navigation/native';
import colors from '../../utils/colors';
import {People} from '../../providers/peopleContext';

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
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Name: <Text style={styles.info}>{people.name}</Text>
        </Text>
        <Text style={styles.label}>
          Height: <Text style={styles.info}>{people.height}</Text>
        </Text>
        <Text style={styles.label}>
          Mass: <Text style={styles.info}>{people.mass}</Text>
        </Text>
        <Text style={styles.label}>
          Hair color: <Text style={styles.info}>{people.hair_color}</Text>
        </Text>
        <Text style={styles.label}>
          Skin color: <Text style={styles.info}>{people.hair_color}</Text>
        </Text>
        <Text style={styles.label}>
          Birth Year: <Text style={styles.info}>{people.birth_year}</Text>
        </Text>
        <Text style={styles.label}>
          Gender: <Text style={styles.info}>{people.gender}</Text>
        </Text>
        <Text style={styles.moviesLabel}>Movies</Text>
        {loadingFilms ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          filmsDetails.map((film) => (
            <Text style={styles.info}>{film.title}</Text>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkestPurple,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkPurple,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 6,
    elevation: 5,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  label: {
    color: colors.label,
    marginRight: 8,
    marginTop: 8,
  },
  info: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  moviesLabel: {
    marginTop: 24,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
});

export default PersonDetails;
