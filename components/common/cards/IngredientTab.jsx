import { React, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'
import * as SQLite from 'expo-sqlite';

const idb = SQLite.openDatabase('ingredients.db');

//const pantryIngredients = ["Vegetable oil", "1 cup soy milk", "1 teaspoon garlic powder", "1 teaspoon onion powder"];

function getFirstColumnAsArray(db, table, column) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(`SELECT ${column} FROM ${table}`, [], (tx, results) => {
          const rows = results.rows;
          const resultArray = [];
  
          for (let i = 0; i < rows.length; i++) {
            const { name } = rows.item(i); // extract the name property from the object
            resultArray.push(name);
          }
  
          resolve(resultArray);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

const IngredientTab = (ingredient) => {
    const [pantryIngredients, setPantryIngredients] = useState([]);

    useEffect(() => {
        const tableName = 'ingredients';
        const columnName = 'name';
    
        getFirstColumnAsArray(idb, tableName, columnName)
          .then((result) => setPantryIngredients(result))
          .catch((error) => console.error(error));
      }, []);

    return (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
              style = {[styles.tab(ingredient), { borderColor: pantryIngredients.includes(ingredient.item) ?  COLORS.gray2 : COLORS.secondary}]}
              onPress={() => {console.log(ingredient.item, pantryIngredients)}}>
              <Text style={styles.tabText}>{ingredient.item}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        height: 100,
        marginBottom: Platform.OS === 'web' ? 25 : 40,
    },
    tab: (ingredient) => ({
        marginEnd: SIZES.small,
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1  
    }),
    tabText:{
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
});

export default IngredientTab