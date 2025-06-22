import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './screens/MainScreen';
import AccountScreen from './screens/AccountScreen';
import { MD3LightTheme as DefaultTheme, TextInput, IconButton } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CreateAccount from './screens/CreateAccount';
const Stack = createNativeStackNavigator()
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Главная" component={MainScreen} />
          <Stack.Screen name="Войти" component={AccountScreen} />
          <Stack.Screen name="Регистрация" component={CreateAccount} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}