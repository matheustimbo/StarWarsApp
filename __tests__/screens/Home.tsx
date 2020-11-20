import React from 'react';
import {render} from '@testing-library/react-native';

import AppNavigator from '../../src/index';

test('Page contains the header', async () => {
  const {findByText} = render(<AppNavigator />);

  const header = await findByText('Star Wars People');

  expect(header).toBeTruthy();
});

test('Page renders show bookmarked label', async () => {
  const {findByText} = render(<AppNavigator />);

  const header = await findByText('Show bookmarked');

  expect(header).toBeTruthy();
});
