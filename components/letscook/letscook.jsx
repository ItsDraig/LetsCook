import { React, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, Animated, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GetRecipes } from '../../firebase'
import { DraggableFlatList } from '../common/DraggableFlatList'

import styles from './letscook.style'
import { COLORS, SIZES } from '../../constants';
import LetsCookCard from '../common/cards/letscook/LetsCookCard';
import CustomScrollBarDraggableFlatListHorizontal from '../common/CustomScrollBarDraggableFlatListHorizontal'

const LetsCook = () => {
  const router = useRouter();
  var isLoading = false;
  const error = false;
  const [recipeList, setRecipeList] = useState();

  if(recipeList == null) getRecipesFromDB();
  async function getRecipesFromDB() {
    console.log("Getting recipes from DB");
    var recipes = await GetRecipes();
    isLoading = false;
    setRecipeList(recipes);
  }
  
  const platformChecker = () => {
    if (Platform.OS === 'web') {
      return <CustomScrollBarDraggableFlatListHorizontal recipeList={recipeList} cardType={'LetsCookCard'}/>
    } else {
      return <FlatList data={recipeList}
      renderItem={({item}) => <LetsCookCard item={item}/>}
      keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
      horizontal/>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Let's Cook!</Text>
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

export default LetsCook