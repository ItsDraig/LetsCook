import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, Animated, Pressable } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { RecipeCard } from '../../RecipeCard';
import AddRecipeModal from '../../app/addrecipe_modal';
import MyRecipesCard from '../common/cards/myrecipes/MyRecipesCard';
import CustomScrollBarDraggableFlatListHorizontal from '../common/CustomScrollBarDraggableFlatListHorizontal';

import styles from './recipes.style';

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  var isLoading = false;
  const error = false;

  const toggleAddRecipeModal = () => {
    console.log("toggling add recipe modal");
    setAddRecipeModalVisible(!addRecipeModalVisible);
  };

  useEffect(()=>{
		var baseRecipe = new RecipeCard('Recipe Name');
    setRecipeList([...recipeList, baseRecipe]);
	}, [])

  const platformChecker = () => {
    if (Platform.OS === 'web') {
      return <CustomScrollBarDraggableFlatListHorizontal recipeList={recipeList} cardType={'MyRecipesCard'}/>
    } else {
      return <FlatList data={recipeList}
      renderItem={({item}) => <MyRecipesCard item={item}/>}
      keyExtractor={(item, index) => index} contentContainerStyle={{ columnGap: SIZES.medium }}
      horizontal/>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Recipes</Text>
        <TouchableOpacity onPress={toggleAddRecipeModal}>
          <Text style={styles.headerBtn}>Create New Recipe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ?
        (
          <Text>Something went wrong</Text>
        ) :
        (
            platformChecker()
        )}
      </View>
          
      <AddRecipeModal
        visible={addRecipeModalVisible}
        toggleModal={() => setAddRecipeModalVisible(!addRecipeModalVisible)}/>
    </View>
  )
}

export default Recipes;