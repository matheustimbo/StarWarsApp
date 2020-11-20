import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {People} from '../providers/peopleContext';

export default () => {
  const getBookmarkedPeople = async () => {
    try {
      const value = await AsyncStorage.getItem('bookmarked');

      if (value !== null) {
        const parsedPeople = await JSON.parse(value);
        setBookmarkedPeople([...parsedPeople]);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeBookmarkedPeople = async (peoples: People[]) => {
    try {
      const stringfied = await JSON.stringify(peoples);
      await AsyncStorage.setItem('bookmarked', stringfied);
    } catch (e) {
      // saving error
    }
  };

  const [bookmarkedPeople, setBookmarkedPeople] = useState<People[]>([]);

  useEffect(() => {
    getBookmarkedPeople();
  }, []);

  const isPersonAlreadyBookmarked = (person: People) =>
    bookmarkedPeople.find((aux) => aux.url === person.url);

  const addBookmarkedPerson = (person: People) => {
    let bookmarkedIndex = 0;
    for (var i = 0; i < bookmarkedPeople.length; i++) {
      if (bookmarkedPeople[i].url === person.url) {
        bookmarkedIndex = i;
        break;
      }
    }
    let bookmarkedAux = bookmarkedPeople;
    bookmarkedAux.splice(bookmarkedIndex, 1);
    setBookmarkedPeople([...bookmarkedAux]);
    storeBookmarkedPeople(bookmarkedAux);
  };

  const removeBookmarkedPerson = (person: People) => {
    let bookmarkedAux = bookmarkedPeople;
    bookmarkedAux.push(person);
    setBookmarkedPeople([...bookmarkedAux]);
    storeBookmarkedPeople(bookmarkedAux);
  };

  const onPressBookmarkPerson = (person: People) => {
    if (isPersonAlreadyBookmarked(person)) {
      addBookmarkedPerson(person);
    } else {
      removeBookmarkedPerson(person);
    }
  };

  return {
    onPressBookmarkPerson,
    isPersonAlreadyBookmarked,
    bookmarkedPeople,
  };
};
