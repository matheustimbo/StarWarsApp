import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {People} from '../../../providers/peopleContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../utils/colors';

const {width} = Dimensions.get('window');

const PeopleItem: React.FC<{
  people: People;
  onPressBookmark: Function;
  isBookmarked: Function;
  goToDetails: Function;
}> = ({people, onPressBookmark, isBookmarked, goToDetails}) => {
  const bookmarked = isBookmarked(people);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.starPositioner}
        onPress={() => {
          onPressBookmark(people);
        }}>
        <Icon
          size={24}
          name="star"
          color={bookmarked !== undefined ? colors.gold : colors.disabled}
        />
      </TouchableOpacity>

      <Text style={styles.label}>
        Name: <Text style={styles.info}>{people.name}</Text>
      </Text>
      <Text style={styles.label}>
        Gender: <Text style={styles.info}>{people.gender}</Text>
      </Text>
      <TouchableOpacity onPress={() => goToDetails()}>
        <Text style={styles.btnTxt}>See details</Text>
      </TouchableOpacity>
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
    backgroundColor: colors.darkPurple,
    marginVertical: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 6,
    elevation: 5,
  },
  starPositioner: {
    position: 'absolute',
    top: 32,
    right: 24,
    zIndex: 10,
  },
  btnTxt: {
    color: colors.orange,
    textTransform: 'uppercase',
    marginTop: 24,
    fontWeight: 'bold',
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
});

export default PeopleItem;
