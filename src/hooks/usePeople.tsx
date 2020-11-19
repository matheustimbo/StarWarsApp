/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import api from '../services/api';
import {Context as PeopleContext} from '../providers/peopleContext';

export default () => {
  const [nextLink, setNextLink] = useState<string | null>('people');

  const {
    requestLoad,
    loadFailure,
    loadSuccess,
    state: {peoples, loadingPeople},
  } = useContext(PeopleContext);

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
          console.log('results', newPeoples.results);
          setNextLink(newPeoples.next);
          loadSuccess(newPeoples.results);
        }
      } catch (e) {
        console.log('ERROOOOO', e);
        loadFailure();
      }
    }
  };

  return {
    peoples,
    loadingPeople,
    nextLink,
    hasNext,
    fetchPeoples,
  };
};
