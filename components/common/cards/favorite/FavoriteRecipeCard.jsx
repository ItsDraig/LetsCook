import { React, useState, useRef, useEffect} from 'react'
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'

import RecipeModal from '../../../../app/recipe_modal'

import styles from './favoriterecipecard.style'

const FavoriteRecipeCard = ({ item, handleCardPress }) => {
  const [size, setSize] = useState(85);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeData, setRecipeData] = useState(item);

  // Background color gradient
  const ingredientPercentage = useRef(new Animated.Value(0)).current;
  const containerRef = useRef(null);
  const gradientColors = ['#FFFFFF', "#312651"];
  const recipeIngredientsCount = 10;// item.ingredients.filter((ingredient) => pantryIngredients.includes(ingredient)).length;
  
  useEffect(() => {
    ingredientPercentage.setValue((recipeIngredientsCount / item.ingredients.length) * 100);
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
        <TouchableOpacity style={[styles.logoContainer, {zIndex: 2}]} onPress={isEnlarged ? resetSize : animateSize}>
          <Animated.Image
            source={{ uri: item.thumbnail }}
            style={[stylesAnimate.logoImageAnimate, {width: 85, height: size,
              transform: [
                { translateX: translateXAnimation },
                { translateY: translateYAnimation },
                { scale: scaleAnimation },
              ],}]}
          />
        </TouchableOpacity>
        <Text style={styles.companyName} numberOfLines={1}>{`~ ${item.totaltime} mins`}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
      <RecipeModal
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

export default FavoriteRecipeCard