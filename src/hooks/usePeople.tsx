/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {People} from '../providers/starWarsContext';
import api from '../services/api';
import {Context as StarWarsContext} from '../providers/starWarsContext';

export default () => {
  const [count, setCount] = useState<Number>(0);
  const [nextLink, setNextLink] = useState<string | null>('people');

  const {
    requestLoad,
    loadFailure,
    loadSuccess,
    state: {people, loadingPeople},
  } = useContext(StarWarsContext);

  const hasNext: Boolean = nextLink !== null;

  useEffect(() => {
    fetchPeoples();
  }, []);

  const fetchPeoples = async () => {
    if (!loadingPeople && nextLink !== null) {
      requestLoad();
      try {
        const newPeoplesResponse = await api.get(nextLink);
        const newPeoples = newPeoplesResponse.data;
        if (newPeoples.results?.length > 0) {
          setNextLink(newPeoples.next);
          loadSuccess(newPeoples.results);
        }
      } catch (e) {
        loadFailure();
      }
    }
  };

  return {
    count,
    people,
    loadingPeople,
    nextLink,
    hasNext,
    fetchPeoples,
  };
};
