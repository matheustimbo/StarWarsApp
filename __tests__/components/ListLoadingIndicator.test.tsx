import React from 'react';
import renderer from 'react-test-renderer';
import ListLoadingIndicator from '../../src/screens/Home/components/ListLoadingIndicator';

test('renders correctly when loading people', () => {
  const tree = renderer
    .create(<ListLoadingIndicator loadingPeople={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('return null when not loading', () => {
  const tree = renderer
    .create(<ListLoadingIndicator loadingPeople={false} />)
    .toJSON();
  expect(tree).toBe(null);
});
