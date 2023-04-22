import { React, useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'
import * as SQLite from 'expo-sqlite';
import { FontAwesome5 } from '@expo/vector-icons'; 

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
    const [showCartIcon, setShowCartIcon] = useState(false);
    const containerRef = useRef(null);
    

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowCartIcon(false);
      }
    };

    const handleCartPress = () => {
      console.log('test');
    };

    useEffect(() => {
        const tableName = 'ingredients';
        const columnName = 'name';
    
        getFirstColumnAsArray(idb, tableName, columnName)
          .then((result) => setPantryIngredients(result))
          .catch((error) => console.error(error));
      }, []);

    useEffect(() => {
      if (Platform.OS === 'web')
      {
        if (showCartIcon) {
          document.addEventListener('mousedown', handleOutsideClick);
        } else {
          document.removeEventListener('mousedown', handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }     
    }, [showCartIcon]);

    const handleTabPress = () => {
      if (!showCartIcon) {
        setShowCartIcon(true);
      }
    }

    return (
      <View>
        <TouchableOpacity 
          ref={containerRef}
          style = {[styles.tab(ingredient), { borderColor: pantryIngredients.includes(ingredient.item) ?  COLORS.gray2 : COLORS.secondary, opacity: showCartIcon ? 0.3 : 1,}]}
          onPress={handleTabPress}>
            <View>
              <Text style={styles.tabText}>{ingredient.item}</Text>
            </View>
        </TouchableOpacity>
        {showCartIcon && (
              <View style={styles.cartIconContainer}>
                <TouchableOpacity
                style = {[styles.tab(ingredient), { borderColor: pantryIngredients.includes(ingredient.item) ?  COLORS.gray2 : COLORS.secondary}]}
                onPress={handleCartPress}>
                  <FontAwesome5 style={{ marginTop: -5 }}name="cart-plus" size={24} color='#B3AEC6' />
                </TouchableOpacity>
              </View>
            )}
      </View>
      
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        //height: 100,
        //marginBottom: Platform.OS === 'web' ? 25 : 40,
    },
    tab: (ingredient) => ({
        marginEnd: SIZES.small,
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        height: 30,
    }),
    addToShoppingList: {
      marginEnd: SIZES.small,
      paddingVertical: SIZES.small / 2,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.medium,
      borderWidth: 2,
      height: 30,
    },
    tabText:{
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
    cartIconContainer: {
      position: 'absolute',
      //top: '100%',
      left: 10,
      //padding: 12,
      //marginTop: -40,
      zIndex: 9999,
    },
});

export default IngredientTab