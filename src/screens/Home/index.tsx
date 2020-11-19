import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import usePeople from '../../hooks/usePeople';
import {People} from '../../providers/starWarsContext';
import PeopleItem from './components/PeopleItem';
import ListLoadingIndicator from './components/ListLoadingIndicator';

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
  const {people, loadingPeople, fetchPeoples} = usePeople();

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        style={styles.list}
        onEndReached={() => fetchPeoples()}
        onEndReachedThreshold={0.5}
        keyExtractor={({index}) => index}
        renderItem={({item}) => <PeopleItem people={item} />}
        ListFooterComponent={() => (
          <ListLoadingIndicator loadingPeople={loadingPeople} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height - 100,
  },
  list: {
    width,
    height: height - 100,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default Home;
