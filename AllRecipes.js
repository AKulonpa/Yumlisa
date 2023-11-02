import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { firestore, collection, getDocs } from './firebase/Config';
import { useRoute } from '@react-navigation/native';

export default function AllRecipes({navigation})  {
    const route = useRoute();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      const fetchRecipes = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'recipes'));
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push(doc.data());
        });
        setRecipes(recipesData);
      };
  
      fetchRecipes();
    }, []);

    const renderItem = ({ item }) => (
        <Text style={styles.text}>{item.name}</Text>
      );
   
      return (
        <View style={styles.container}>
      <Text style={styles.header}>Here are all recipes!</Text>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
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
      fontSize: 25,
    }
  
  }); 
  