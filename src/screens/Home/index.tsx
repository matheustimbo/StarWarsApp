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
import {StackNavigationProp} from '@react-navigation/stack';
import colors from '../../utils/colors';

const {width, height} = Dimensions.get('window');

type RootStackParamList = {};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const {peoples, loadingPeople, fetchPeoples} = usePeople();

  const {
    onPressBookmarkPerson,
    isPersonAlreadyBookmarked,
    bookmarkedPeople,
  } = useFavoritePeople();

  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeaderContainer}>
        <Text style={styles.fixedHeaderTitle}>CHARACTERS</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Show bookmarked</Text>
          <Switch
            value={showOnlyBookmarked}
            onValueChange={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            thumbColor={showOnlyBookmarked ? colors.orange : colors.white}
            trackColor={{true: colors.darkOrange, false: colors.darkPurple}}
          />
        </View>
      </View>

      <FlatList
        data={showOnlyBookmarked ? bookmarkedPeople : peoples}
        style={styles.list}
        onEndReached={() => {
          !showOnlyBookmarked && fetchPeoples();
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={({index}) => index}
        renderItem={({item}) => (
          <PeopleItem
            people={item}
            goToDetails={() =>
              navigation.navigate('PersonDetails', {person: item})
            }
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
    backgroundColor: colors.darkestPurple,
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
  fixedHeaderContainer: {
    width,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  fixedHeaderTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    color: colors.secondaryLabel,
  },
});

export default Home;
