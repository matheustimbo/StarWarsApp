/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import api from '../services/api';
import {PeopleContext} from '../providers/peopleContext';

export default ({
  requestLoad,
  loadFailure,
  loadSuccess,
  state: {peoples, loadingPeople},
}: {
  requestLoad: Function;
  loadFailure: Function;
  loadSuccess: Function;
  state: PeopleContext;
}) => {
  const [nextLink, setNextLink] = useState<string | null>('people');

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
    peoples,
    loadingPeople,
    nextLink,
    hasNext,
    fetchPeoples,
  };
};
