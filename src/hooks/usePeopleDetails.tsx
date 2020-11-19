/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {Film} from '../providers/peopleContext';
import {Context as PeopleContext} from '../providers/peopleContext';
import api from '../services/api';

export default (peopleIndex: number) => {
  const {
    state: {peoples},
  } = useContext(PeopleContext);

  const people = peoples[peopleIndex];

  const [filmsDetails, setFilmsDetails] = useState<Film[]>([]);
  const [loadingFilms, setLoadingFilms] = useState<Boolean>(false);

  const fetchFilms = async () => {
    if (people.films) {
      const filmsUrls = people.films;
      const splitedFilmsUrls = filmsUrls.map(
        (filmUrl: string) => filmUrl.split('/api/')[1],
      );
      let filmsData: Film[] = [];
      setLoadingFilms(true);
      const filmsPromises = splitedFilmsUrls.map((filmUrl: string) => {
        return new Promise(async (resolve, reject) => {
          try {
            const filmResponse = await api.get(filmUrl);
            const film = filmResponse.data;
            filmsData.push(film);
            resolve();
          } catch (e) {
            reject();
          }
        });
      });
      await Promise.all(filmsPromises);
      setLoadingFilms(false);
      setFilmsDetails([...filmsData]);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [people]);

  return {
    people,
    filmsDetails,
    loadingFilms,
  };
};
