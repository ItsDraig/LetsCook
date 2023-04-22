import { React, useState, useRef, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, Animated, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GetRecipes } from '../../../firebase'
import CustomScrollBarDraggableFlatListHorizontal from '../../common/CustomScrollBarDraggableFlatListHorizontal'
import styles from './popular.style'
import { COLORS, SIZES } from '../../../constants';
import PopularRecipeCard from '../../common/cards/popular/PopularRecipeCard';

const Popular = ({ activeRecipeType, recipesNeedSorting, setRecipesNeedSorting }) => {
  const router = useRouter();
  var isLoading = false;
  const error = false;

  const [recipeList, setRecipeList] = useState();

  useEffect(() => {
    if (recipesNeedSorting) {
      getRecipesFromDB();
      setRecipesNeedSorting(false);
    }
  }, [recipesNeedSorting, activeRecipeType]);

  if(recipeList == null) getRecipesFromDB();

  async function getRecipesFromDB() {
    console.log("Getting recipes from DB");
    var recipes = await GetRecipes();

    if (activeRecipeType !== 'All Ingredients') {
      recipes.sort((a, b) => {
        return a.tags[0] === activeRecipeType && b.tags[0] !== activeRecipeType ? -1 : 1;
      });
    }

    isLoading = false;
    setRecipeList(recipes);
  }

  const platformChecker = () => {
    if (Platform.OS === 'web') {
      return <CustomScrollBarDraggableFlatListHorizontal recipeList={recipeList} cardType={'PopularRecipeCard'}/>
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