import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import usePeople from '../../hooks/usePeople';
import {People} from '../../providers/starWarsContext';
import PeopleItem from './components/PeopleItem';

const Home: React.FC = () => {
  const {people, loadingPeople, fetchPeoples} = usePeople();
  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        renderItem={({item}) => <PeopleItem people={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
