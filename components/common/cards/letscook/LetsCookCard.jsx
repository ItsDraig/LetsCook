import { React, useState, useRef, useEffect} from 'react'
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'

import LetsCookModal from '../../../../app/letscook_modal'
import TabLayout from '../../../../app/(tabs)/_layout'
import styles from './letscookcard.style'
import * as SQLite from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons'; 

const idb = SQLite.openDatabase('ingredients.db');

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


const LetsCookCard = ({ item, selectedRecipe, handleCardPress}) => {
  const [size, setSize] = useState(105);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeData, setRecipeData] = useState(item);
  const [pantryIngredients, setPantryIngredients] = useState([]);

  // Background color gradient
  const ingredientPercentage = useRef(new Animated.Value(0)).current;
  const containerRef = useRef(null);
  const gradientColors = ['#FFFFFF', "#312651"];
  const recipeIngredientsCount = item.ingredients.filter((ingredient) => pantryIngredients.includes(ingredient)).length;

  useEffect(() => {
    const tableName = 'ingredients';
    const columnName = 'name';

    getFirstColumnAsArray(idb, tableName, columnName)
      .then((result) => setPantryIngredients(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    ingredientPercentage.setValue((recipeIngredientsCount / item.ingredients.length) * 100 + 20); // remove the + 20 but change recipe card somehow
    if (ingredientPercentage.__getValue() >= 100) {
        // increase value of a counter in _layout.tsx
    }
  }, []);

  useEffect(() => {
    ingredientPercentage.setValue((recipeIngredientsCount / item.ingredients.length) * 100 + 20); // remove the + 20 but change recipe card somehow
    const interpolatedColor = ingredientPercentage.interpolate({
      inputRange: [0, 100],
      outputRange: gradientColors,
      extrapolate: 'clamp'
    });
    const color = interpolatedColor.__getValue();
    containerRef.current.setNativeProps({style: [styles.container, {backgroundColor: color}]});
  }, [recipeIngredientsCount]);

  // Image animation
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const translateXAnimation = useRef(new Animated.Value(0)).current;
  const translateYAnimation = useRef(new Animated.Value(0)).current;

  const animateSize = () => {
    Animated.parallel([
      Animated.timing(scaleAnimation, {
        toValue: 2.5,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(translateXAnimation, {
        toValue: size * 0.7,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnimation, {
        toValue: size * 0.45,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start(() => {
      //setSize(size + 50);
    });
    setSize(size - 10);
    setIsEnlarged(true);
  };

  const resetSize = () => {
    Animated.parallel([
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(translateXAnimation, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnimation, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start(() => {
      //setSize(size - 50);
    });
    setSize(size + 10);
    setIsEnlarged(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity 
      ref={containerRef}
      onPress={() => handleCardPress(item)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={[styles.logoContainer, {zIndex: 2}]} onPress={isEnlarged ? resetSize : animateSize}>
            <Animated.Image
              source={{ uri: item.thumbnail }}
              style={[stylesAnimate.logoImageAnimate, {width: 105, height: size,
                transform: [
                  { translateX: translateXAnimation },
                  { translateY: translateYAnimation },
                  { scale: scaleAnimation },
                ],}]}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'  }}>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.cardName}>Servings: </Text>
              <Text style={styles.companyName}> {item.servings} </Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.cardName}>Prep Time: </Text>
              <Text style={styles.companyName}> {item.preptime} minutes</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.cardName}>Cook Time: </Text>
              <Text style={styles.companyName}> {item.cooktime} minutes</Text>
            </View>
          </View>    
        </View>
        
        <Text style={styles.companyName} numberOfLines={1}><FontAwesome name="clock-o" size={19} color="#B3AEC6" style={{ position: 'relative', lineHeight: 15, top: 1 }} />{` ${item.totaltime} mins`}</Text>

        <View style={[styles.infoContainer, { flexDirection: 'row'}]}>
          <Text style={styles.jobName(selectedRecipe, item)} numberOfLines={1}>
            {item.name} 
          </Text>
          <Text style={styles.companyName}></Text>
        </View>
      </TouchableOpacity>
      <LetsCookModal
        recipe={recipeData}
        visible={modalVisible}
        toggleModal={() => setModalVisible(!modalVisible)}/>
    </View>
  )

  function handleCardPress(item) {
    console.log(item.name);
    setRecipeData(item);
    toggleModal();
  }
}

const stylesAnimate = StyleSheet.create({
  containerAnimate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImageAnimate: {
    resizeMode: 'cover',
    borderRadius: 15,
  },
});


export default LetsCookCard