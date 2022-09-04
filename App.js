import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import io from 'socket.io-client';

import Detail from './screens/Detail';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export const socket = io('http://127.0.0.1:3000');

socket.on('connect', () => {
  console.log('socket is connected');
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
