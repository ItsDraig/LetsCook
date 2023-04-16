import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '../../components/Themed';
import * as SQLite from 'expo-sqlite';
import { SQLError } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import IngredientTab from '../../components/common/cards/IngredientTab';

const db = SQLite.openDatabase('ingredients.db');

type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  handleDelete: (id : number) => void;
};

export default function TabFiveScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const noRecipeText = 'You currently have nothing in your pantry. Add items using the button above!'


  const fetchIngredients = () => {
    console.log('fetching ingredients');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (_, result) => {
          const len = result.rows.length;
          if (len > 0) {
            let ingredients = [];
            for (let i = 0; i < len; i++) {
              const row = result.rows.item(i);
              const ingredient = {
                id: row.id,
                name: row.name,
                quantity: row.quantity,
                handleDelete: row.handleDelete
              };
              ingredients.push(ingredient);
            }
            setIngredients(ingredients);
          }
        },
        (_, error: SQLError) => {
          console.log(error);
          return false;
        }
      );
    });
  };

  const handleDelete = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM ingredients WHERE id = ?', [id]);
      },
      undefined,
      () => {
        const newIngredients = ingredients.filter(
          (ingredient) => ingredient.id !== id
        );
        setIngredients(newIngredients);
      }
    );
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity TEXT);'
      );
    });

    fetchIngredients();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );

  const renderItem = ({ item }: { item: Ingredient }) => {
    console.log('Rendering item:', item);
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
        <View>
        <Text>{item.name}</Text>
        <Text>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        </View>  
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantry</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <FlatList
            data={ingredients}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginTop: 10, flex: 1 }}
            ListEmptyComponent={<Text style={styles.bodyText}>{noRecipeText}</Text>}
          />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    borderRadius: 10,
    padding: 10
  },
  title: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  deleteButtonText: {
    color: "#fff",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
