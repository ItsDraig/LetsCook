import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import SQLite, { ResultSet } from 'react-native-sqlite-storage';
import { ActivityIndicator } from '@react-native-material/core';

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});

export default function AddIngredientScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(true);

  getIngredientsFromDB();
  async function getIngredientsFromDB() {
    (await db).transaction((tx) => {
      tx.executeSql('SELECT * FROM ingredients', []).then(([tx, results]) => {
        const rows = results.rows.raw();
        setIngredients(rows);
        setLoading(false);
      });
    });
  }

  async function addIngredientsToDB() {
    const newIngredient: Ingredient = {
      id: Date.now(),
      name,
      quantity,
    };
    (await db).transaction((tx) => {
      tx.executeSql(
        'INSERT INTO ingredients (id, name, quantity) VALUES (?, ?, ?)',
        [newIngredient.id, newIngredient.name, newIngredient.quantity],
      ).then(([tx, results]) => {
        setIngredients([...ingredients, newIngredient]);
        setName('');
        setQuantity('');
      });
    });
  }

  const handleSubmit = () => {
    addIngredientsToDB();   
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>
      
      {ingredients.length ? (
        ingredients.map((ingredient) => (
          <Text key={ingredient.id}>
            {ingredient.name} - {ingredient.quantity}
          </Text>
        ))
      ) : (
        <Text>No ingredients found</Text>
      )}
        <TextInput style={styles.input} 
        onChangeText={setName}
        placeholder="Ingredient Name"
        value={name}
        />
        <TextInput style={styles.input} 
        onChangeText={setQuantity}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Add</Text>
        </TouchableOpacity>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'grey'
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
