import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { firestore, collection,getDocs} from './firebase/Config';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function RecipeListScreen({navigation})  {
    const route = useRoute();
    const { selectedIngredients, limitations } = route.params;
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
      const fetchRecipes = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'recipes'));
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push(doc.data());
        });
        setRecipes(recipesData);
        setIsLoading(false);
      };
  
      fetchRecipes();
    }, []);
    

    const filteredRecipes = recipes.filter(recipe => {
        const ingredientsMatch = selectedIngredients.every(ingredient =>
          recipe.ingredients.includes(ingredient)
        );
      
        const limitationsMatch = limitations.every(limitation =>
          recipe.limitations.includes(limitation)
        );
      
        return ingredientsMatch && limitationsMatch;
      });


      return (
        <View style={styles.container}>
          {isLoading ? ( 
        <Text>Loading recipes...</Text>
      ) : (
          selectedIngredients.length > 0 ? (
            filteredRecipes.length > 0 ? (
              <View>
                <Text style={styles.header}>Here are your recipes!</Text>
                <FlatList
                  data={filteredRecipes}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Description', { recipe: item })}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <Text style={styles.header1}>Oops, there are no recipes for your ingredients!</Text>
            )
          ) : (
            <Text style={styles.header1}>Please pick something!</Text>
          )
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.button}>
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