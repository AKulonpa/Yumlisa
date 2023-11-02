import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import RecipeListScreen from './RecipeListScreen';
import { useNavigation } from '@react-navigation/native';

export default function SearchRecipes() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isIngredientMenuOpen, setIngredientMenuOpen] = useState(false);
    const [isDietMenuOpen, setDietMenuOpen] = useState(false);
    const [isRecipeMenuOpen, setRecipeMenuOpen] = useState(false);
    const [limitations, setLimitations] = useState([])
    const [showRecipeList, setShowRecipeList] = useState(false);
    const navigation = useNavigation();

    const navigateToRecipeList = () => {
        navigation.navigate('Second', {
            selectedIngredients: selectedIngredients,
            limitations: limitations,
          });
      };

      const navigateToRecipes = () => {
        navigation.navigate('All');
      };

      const ingredientsData = [
        { label: 'Potatoes', value: 'Potatoes' },
        { label: 'Pasta', value: 'Pasta' },
        { label: 'Chicken', value: 'Chicken' },
        { label: 'Beef', value: "Beef" },
        { label:"Pork", value: "Pork" },
        { label: "Fish", value: "Fish" },
        { label: "Carrot", value: "Carrot" },
        { label: "Rice", value: 'Rice' },
        { label: "Onion", value: 'Onion' },
        { label: "Egg", value: "Egg" },
        { label: "Bread", value: "Bread" },
        { label: "Tofu", value: "Tofu" },
        { label: "Apple", value: "Apple" },
        { label: "Banana", value: "Banana" },
        { label: "Cheese", value: "Cheese" },
        { label: "Tomato", value: "Tomato" },
        { label: "Dairy", value: "Dairy" },
        { label: "Corn", value: "Corn" },
        { label: "Avocado", value: "Avocado" },
        { label: "Legumes", value: "Legumes" }
      ];
      
        const dietaryOptions = [
        { label: 'Lactose-free', value: 'Lactose-free' },
        { label: 'Gluten-free', value: 'Gluten-free' },
        { label: 'Vegetarian', value: 'Vegetarian' },
        { label: 'Pescatarian', value: 'Pescatarian' },
        { label: 'Ketogenic', value: 'Ketogenic' },
        { label: 'Vegan', value: 'Vegan' },
        ];

        const toggleDietaryOption = (value) => {
            if (limitations.includes(value)) {
              setLimitations(limitations.filter((option) => option !== value));
            } else {
              setLimitations([...limitations, value]);
            }
          };
    
      const toggleIngredient = (value) => {
        if (selectedIngredients.includes(value)) {
          setSelectedIngredients(selectedIngredients.filter(item => item !== value));
        } else {
          setSelectedIngredients([...selectedIngredients, value]);
        }
      };
    
      const toggleRecipeList = () => {
        setShowRecipeList(!showRecipeList);
      };


      return (
        <View style={styles.container}>
          <Text style={styles.header}>Search for recipes</Text>
    
          <Text style={styles.text}>What are your main ingredients?</Text>
          <TouchableOpacity
            onPress={() => setIngredientMenuOpen(!isIngredientMenuOpen)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isIngredientMenuOpen ? 'Hide Ingredients' : 'Select Ingredients'}
            </Text>
          </TouchableOpacity>
          {isIngredientMenuOpen && (
            <FlatList
              data={ingredientsData}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleIngredient(item.value)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <CheckBox
                    title={item.label}
                    checked={selectedIngredients.includes(item.value)}
                    onPress={() => toggleIngredient(item.value)}
                  />
                </TouchableOpacity>
              )}
            />
            )}
    
          <Text style={styles.text}>Do you have dietary limitations?</Text>
          <TouchableOpacity
            onPress={() => setDietMenuOpen(!isDietMenuOpen)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isDietMenuOpen ? 'Hide limitations' : 'Select limitations'}
            </Text>
          </TouchableOpacity>
          {isDietMenuOpen && (
            <FlatList
              data={dietaryOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleDietaryOption(item.value)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <CheckBox
                    title={item.label}
                    checked={limitations.includes(item.value)}
                    onPress={() => toggleDietaryOption(item.value)}
                  />
                </TouchableOpacity>
              )}
            />
            )}
          
          <Text style={styles.text}>Let's see what you should make!</Text>
          <TouchableOpacity onPress={navigateToRecipeList} style={styles.button}>
          <Text style={styles.buttonText}>
              {isRecipeMenuOpen ? 'Select again' : 'Show recipes'}
            </Text>
          </TouchableOpacity>
          {isRecipeMenuOpen && (
            <RecipeListScreen
              selectedIngredients={selectedIngredients}
              limitations={limitations}
            />
          )}

        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backbutton}>
            <Text style={styles.backbuttonText}>Go Back</Text>
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
      },
      
      backbutton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,

      },

      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
      backbuttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        
      }
    });  