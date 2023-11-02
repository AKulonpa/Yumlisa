import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import RecipeListScreen from './RecipeListScreen';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isIngredientMenuOpen, setIngredientMenuOpen] = useState(false);
  const [isRecipeMenuOpen, setRecipeMenuOpen] = useState(false);
  const [limitations, setLimitations] = useState('Select limitation')
  const [showRecipeList, setShowRecipeList] = useState(false);
  const navigation = useNavigation();

  const navigateToRecipes = () => {
    navigation.navigate('All');
  };

  const navigateToMake = () => {
    navigation.navigate('Make');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const toggleRecipeList = () => {
    setShowRecipeList(!showRecipeList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Yumlisa!</Text>

      <TouchableOpacity onPress={navigateToRecipes} style={styles.button}>
      <Text style={styles.buttonText}>Show all recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToMake} style={styles.button}>
      <Text style={styles.buttonText}>Submit a recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSearch} style={styles.button}>
      <Text style={styles.buttonText}>Search recipes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  header: {
    marginBottom: 30,
    fontSize: 30,
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8, 
    width: 50,
    height: 30,
  },
 
  text:{
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 30
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  }
});  