import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import {Provider as StarWarsProvider} from './providers/starWarsContext';

const Stack = createStackNavigator();

function StackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StarWarsProvider>
        <StackScreens />
      </StarWarsProvider>
    </NavigationContainer>
  );
}
