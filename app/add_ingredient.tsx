import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator } from '@react-native-material/core';
import { SQLError } from 'expo-sqlite';

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

const db = SQLite.openDatabase('ingredients.db');

export default function AddIngredientScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAddIngredient = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO ingredients (name, quantity) values (?, ?)',
        [name, quantity],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log(`Ingredient added with ID: ${insertId}`);
            const newIngredient = { id: insertId || 0, name, quantity };
            setIngredients([...ingredients, newIngredient]);
            setName('');
            setQuantity('');
          }
        }
      );
    });
  };
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text>Add Ingredient</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
        />
        <Button title="Add" onPress={handleAddIngredient} />
      </View>
    </View>
  );
};

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
