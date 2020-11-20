/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Film, People} from '../providers/peopleContext';
import api from '../services/api';

export default (person: People) => {
  const [filmsDetails, setFilmsDetails] = useState<Film[]>([]);
  const [loadingFilms, setLoadingFilms] = useState<Boolean>(false);

  const fetchFilms = async () => {
    if (person.films) {
      const filmsUrls = person.films;
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
  }, [person]);

  const people = person;

  return {
    people,
    filmsDetails,
    loadingFilms,
  };
};
