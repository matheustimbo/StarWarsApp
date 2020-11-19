import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {People} from '../../../providers/starWarsContext';

const {width} = Dimensions.get('window');

const PeopleItem: React.FC<{people?: People}> = ({people}) => {
  console.log('ta recebendo', people);
  return (
    <View style={styles.container}>
      <Text>Name: {people?.name}</Text>
      <Text>Height: {people?.height}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    marginVertical: 12,
    alignSelf: 'center',
  },
});

export default PeopleItem;
