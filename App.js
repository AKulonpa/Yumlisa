import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import RecipeListScreen from './RecipeListScreen';
import AllRecipes from './AllRecipes';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="Second"
          component={RecipeListScreen}
          options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="All"
          component={AllRecipes}
          options={{
            headerShown: false, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}