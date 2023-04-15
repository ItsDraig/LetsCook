import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { GetRecipes } from '../../../firebase'
import { RecipeCard } from '../../../RecipeCard'
import { DraggableFlatList } from '../../common/DraggableFlatList'

import styles from './popular.style'
import { COLORS, SIZES } from '../../../constants';
import PopularRecipeCard from '../../common/cards/popular/PopularRecipeCard';

const Popular = () => {
  const router = useRouter();
  var isLoading = false;
  const error = false;
  const [recipeList, setRecipeList] = React.useState();

  if(recipeList == null) getRecipesFromDB();
  async function getRecipesFromDB() {
    console.log("Getting recipes from DB");
    var recipes = await GetRecipes();
    isLoading = false;
    setRecipeList(recipes);
  }

  
  const platformChecker = () => {
    if (Platform.OS === 'web') {
      return <DraggableFlatList data={recipeList}
      renderItem={({item}) => <PopularRecipeCard item={item}/>}
      keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
      horizontal/>
    } else {
      return <FlatList data={recipeList}
      renderItem={({item}) => <PopularRecipeCard item={item}/>}
      keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
      horizontal/>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Recipes</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
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
    </View>
  )
}

export default Popular