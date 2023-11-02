import React, { useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { firestore, collection,addDoc} from './firebase/Config';

export default function MakeRecipe({navigation})  {
    const route = useRoute();
    const [chosenIngredients, setChosenIngredients] = useState([]);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [limitations, setLimitations] = useState('Select limitation')
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [isDietMenuOpen, setDietMenuOpen] = useState(false);

    const save = async() => {
      const newRecipeData = {
        name: recipeName,
        ingredients: chosenIngredients,
        dietary: limitations,
        description: description,
      };
      const docRef = await addDoc(collection(firestore, 'recipes'), newRecipeData);
      
      setRecipeName('');
      setChosenIngredients([]);
      setLimitations([]);
    }

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
        if (chosenIngredients.includes(value)) {
          setChosenIngredients(chosenIngredients.filter(item => item !== value));
        } else {
          setChosenIngredients([...chosenIngredients, value]);
        }
      };

      return (
        <View style={styles.container}>
          <Text style={styles.header}>Name your recipe!</Text>
          <TextInput style={styles.textInput} placeholder='Tap here' value={recipeName} onChangeText={text => setRecipeName(text)}/>

          <Text style={styles.header}>Choose ingridients!</Text>
      <TouchableOpacity
        onPress={() => setMenuOpen(!isMenuOpen)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isMenuOpen ? 'Hide Ingredients' : 'Select Ingredients'}
        </Text>
      </TouchableOpacity>
      {isMenuOpen && (
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
                checked={chosenIngredients.includes(item.value)}
                onPress={() => toggleIngredient(item.value)}
              />
            </TouchableOpacity>
          )}
        />
        )}
          <Text style={styles.header}>Is there a specific diet?</Text>
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

        <Text style={styles.header}>Give a description!</Text>
        <TextInput style={styles.textInput} placeholder='Tap here' value={description} onChangeText={text => setDescription(text)}/>

            <Button style={styles.button} title="Save recipe" type="button" onPress={save} />
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
          marginBottom: 10,
          fontSize: 24,
        },
      
        textInput: {
          fontSize: 24,
          marginBottom: 20,
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
      
        buttonText: {
          color: '#fff',
          textAlign: 'center',
        },
        backbutton: {
          backgroundColor: '#4CAF50',
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          marginTop: 40
        },
        backbuttonText: {
          color: '#fff',
          textAlign: 'center',
          fontSize: 24,
        },
      });  
