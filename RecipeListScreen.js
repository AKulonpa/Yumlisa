import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {recipesData} from './Recipes';
import { useRoute } from '@react-navigation/native';

export default function RecipeListScreen({navigation})  {
    const route = useRoute();
    const { selectedIngredients, limitations } = route.params;

    const filteredRecipes = recipesData.filter(recipe => {
        const ingredientsMatch = selectedIngredients.every(ingredient =>
          recipe.ingredients.includes(ingredient)
        );
      
        const dietaryMatch =
          limitations === 'Select limitation' || recipe.dietary.includes(limitations);
      
        return ingredientsMatch && dietaryMatch;
      });


      return (
        <View style={styles.container}>
          {selectedIngredients.length > 0 ? (
            filteredRecipes.length > 0 ? (
              <View>
                <Text style={styles.header}>Here are your recipes!</Text>
                <FlatList
                  data={filteredRecipes}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <Text style={styles.header1}>Oops, there are no recipes for your ingredients!</Text>
            )
          ) : (
            <Text style={styles.header1}>Please pick something!</Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
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
      paddingHorizontal: 20,
      paddingBottom: 50,
      paddingTop: 50,
      
    },
    header: {
    marginTop: 60,
      marginBottom: 30,
      fontSize: 30,
    },

    header1: {
        marginTop: 60,
          marginBottom: 30,
          fontSize: 30,
          alignItems: 'center',
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
    },
  
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
  
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    }
  
  }); 
  