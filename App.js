import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import RecipeListScreen from './RecipeListScreen';
import AllRecipes from './AllRecipes';
import MakeRecipe from './MakeRecipe';
import Description from './Description';
import SearchRecipes from './SearchRecipes';

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
        <Stack.Screen
          name="Make"
          component={MakeRecipe}
          options={{
            headerShown: false, 
          }}
          />
          <Stack.Screen
          name="Search"
          component={SearchRecipes}
          options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{
            headerShown: false, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}