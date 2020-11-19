import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Switch,
} from 'react-native';
import usePeople from '../../hooks/usePeople';
import PeopleItem from './components/PeopleItem';
import ListLoadingIndicator from './components/ListLoadingIndicator';
import useFavoritePeople from '../../hooks/useFavoritePeople';

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
  const {peoples, loadingPeople, fetchPeoples} = usePeople();

  const {
    onPressBookmarkPerson,
    isPersonAlreadyBookmarked,
    bookmarkedPeople,
  } = useFavoritePeople();

  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Switch
          value={showOnlyBookmarked}
          onValueChange={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
        />
        <Text>Show bookmarked</Text>
      </View>

      <FlatList
        data={showOnlyBookmarked ? bookmarkedPeople : peoples}
        style={styles.list}
        onEndReached={() => {
          !showOnlyBookmarked && fetchPeoples();
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={({index}) => index}
        renderItem={({item, index}) => (
          <PeopleItem
            people={item}
            index={index}
            onPressBookmark={onPressBookmarkPerson}
            isBookmarked={isPersonAlreadyBookmarked}
          />
        )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;
