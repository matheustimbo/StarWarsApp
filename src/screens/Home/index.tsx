import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import usePeople from '../../hooks/usePeople';
import {People} from '../../providers/starWarsContext';

const Home: React.FC = () => {
  const {people, loadingPeople, fetchPeoples} = usePeople();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => fetchPeoples()}>
        <Text>fetch</Text>
      </TouchableOpacity>
      <Text>Loading people: {loadingPeople}</Text>
      {people.map((p: People) => (
        <Text>{p.name}</Text>
      ))}
      <FlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
