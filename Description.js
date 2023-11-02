import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function RecipeDetails({ route, navigation }) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{recipe.name}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
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
  description: {
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
  },
});