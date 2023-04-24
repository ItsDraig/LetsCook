import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { RecipeCard } from '../../RecipeCard';
import AddIngredientModal from '../../app/addingredient_modal';
import PantryIngredientCard from '../common/cards/pantry/PantryIngredientCard';
import CustomScrollBarDraggableFlatListHorizontal from '../common/CustomScrollBarDraggableFlatListHorizontal';
import CustomScrollBarScrollViewVertical from "../common/CustomScrollBarScrollViewVertical"
import * as SQLite from 'expo-sqlite';
import { SQLError } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase('ingredients.db');

import styles from './pantry.style';

type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  handleDelete: (id : number) => void;
};

const Pantry = () => {
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [addIngredientModalVisible, setAddIngredientModalVisible] = useState(false);

  const toggleAddIngredientModal = () => {
    console.log("toggling add ingredient modal");
    setAddIngredientModalVisible(!addIngredientModalVisible);
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
    console.log('deleting ingredient with id: ' + id);
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

  const platformChecker = () => {
    if (Platform.OS === 'web') {
      //return <CustomScrollBarDraggableFlatListHorizontal recipeList={ingredients} cardType={'PantryIngredientCard'}/>
      return  <CustomScrollBarScrollViewVertical style={{height: 600}}>
                <FlatList data={ingredients}
                  renderItem={({item}) => <PantryIngredientCard item={item} handleDelete={() => handleDelete(item.id)}/>}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{ alignContent: 'center', columnGap: SIZES.xLarge }}
                  columnWrapperStyle={{justifyContent: "space-between",}}
                  numColumns={5}/>
              </CustomScrollBarScrollViewVertical>
    } else {
      return <FlatList data={ingredients}
        renderItem={({item}) => <PantryIngredientCard item={item} handleDelete={() => handleDelete(item.id)}/>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal/>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Pantry</Text>
        <TouchableOpacity onPress={toggleAddIngredientModal}>
          <Text style={styles.headerBtn}>Add New Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        { platformChecker() }
      </View>

      <AddIngredientModal
        visible={addIngredientModalVisible}
        toggleModal={() => setAddIngredientModalVisible(!addIngredientModalVisible)}/>
    </View>
  )
}

export default Pantry;