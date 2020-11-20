import {renderHook} from '@testing-library/react-hooks';
import usePeopleMovies from '../../src/hooks/usePeopleMovies';

const examplePeople = {
  name: 'test',
  height: 180,
  mass: 50,
  hair_color: 'test',
  skin_color: 'test',
  eye_color: 'test',
  birth_year: 'test',
  gender: 'test',
  homeworld: 'test',
  films: [
    'http://swapi.dev/api/films/1/',
    'http://swapi.dev/api/films/2/',
    'http://swapi.dev/api/films/3/',
    'http://swapi.dev/api/films/6/',
  ],
  species: ['test'],
  vehicles: ['test'],
  starships: ['test'],
  url: 'test',
};

jest.setTimeout(30000);

test('if it returns the person passed', async () => {
  const {result} = renderHook(() => usePeopleMovies(examplePeople));

  expect(result.current.people).toBe(examplePeople);
});

test('if it returns loading true while loading movies', async () => {
  const {result} = renderHook(() => usePeopleMovies(examplePeople));

  expect(result.current.loadingFilms).toBe(true);
});

test('if it returns movies details after fetch', async () => {
  const {result, waitForValueToChange} = renderHook(() =>
    usePeopleMovies(examplePeople),
  );

  await waitForValueToChange(() => result.current.filmsDetails);

  expect(result.current.filmsDetails.length).toBeGreaterThan(0);
});

test('if it isn´t loading after fetch movies', async () => {
  const {result, waitForValueToChange} = renderHook(() =>
    usePeopleMovies(examplePeople),
  );

  await waitForValueToChange(() => result.current.filmsDetails);

  expect(result.current.loadingFilms).toBeFalsy();
});
