import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import PersonDetails from './screens/PersonDetails';
import {Provider as PeopleProvider} from './providers/peopleContext';

const Stack = createStackNavigator();

function StackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PersonDetails" component={PersonDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <PeopleProvider>
        <StackScreens />
      </PeopleProvider>
    </NavigationContainer>
  );
}
