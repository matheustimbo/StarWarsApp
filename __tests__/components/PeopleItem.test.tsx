import React from 'react';
import renderer from 'react-test-renderer';
import PeopleItem from '../../src/screens/Home/components/PeopleItem';

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
  films: ['test'],
  species: ['test'],
  vehicles: ['test'],
  starships: ['test'],
  url: 'test',
};

test('renders correctly when is bookmarked', () => {
  const tree = renderer
    .create(
      <PeopleItem
        people={examplePeople}
        goToDetails={() => {}}
        onPressBookmark={() => {}}
        isBookmarked={() => true}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when isn´t bookmarked', () => {
  const tree = renderer
    .create(
      <PeopleItem
        people={examplePeople}
        goToDetails={() => {}}
        onPressBookmark={() => {}}
        isBookmarked={() => false}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
