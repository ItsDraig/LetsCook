import { React, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, Animated, Pressable } from 'react-native'
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
      const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
      const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);
      const [showScrollBar, setShowScrollBar] = useState(false);
      const scrollIndicator = useRef(new Animated.Value(0)).current;
      const scrollIndicatorSize =
        completeScrollBarWidth > visibleScrollBarWidth
          ? (visibleScrollBarWidth * visibleScrollBarWidth) /
            completeScrollBarWidth
          : visibleScrollBarWidth;
      const difference =
        visibleScrollBarWidth > scrollIndicatorSize
          ? visibleScrollBarWidth - scrollIndicatorSize - SIZES.large
          : 0;
      const scrollIndicatorPosition = Animated.multiply(
        scrollIndicator,
        visibleScrollBarWidth / completeScrollBarWidth
      ).interpolate({
        inputRange: [0, difference],
        outputRange: [0, difference],
        extrapolate: 'clamp'
      });
      return <View style={{ flex: 1, flexDirection: 'column'}}>
        <Pressable onHoverIn={() => setShowScrollBar(true)} onHoverOut={() => setShowScrollBar(false)}>
          <DraggableFlatList data={recipeList}
            renderItem={({item}) => <PopularRecipeCard item={item}/>}
            keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={(width, height) => {setCompleteScrollBarWidth(width);}}
            onLayout={({nativeEvent: {layout: { width }}}) => {setVisibleScrollBarWidth(width);}}
            onScroll={Animated.event([{nativeEvent:{contentOffset: {x: scrollIndicator}}}],{useNativeDriver: false})}
            scrollEventThrottle={16}/>
        </Pressable>
        <View style={{ opacity: showScrollBar ? 1 : 0 }}>
          <View style={{ height: 6, width: '99%', backgroundColor: '#52057b', borderRadius: 8, marginTop: SIZES.xSmall - 3, marginHorizontal: SIZES.small}}>
            <Animated.View style={{ height: 6, borderRadius: 8, backgroundColor: '#bc6ff1', width: scrollIndicatorSize, transform: [{ translateX: scrollIndicatorPosition }]}}/>
          </View>
        </View>
      </View>
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