import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, Animated, Pressable } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { DraggableFlatList } from '../common/DraggableFlatList';
import { RecipeCard } from '../../RecipeCard';

import styles from './recipes.style';

const Recipes = () => {
  const [recipeList, setRecipeList] = useState();
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  var isLoading = false;
  const error = false;

  const toggleAddRecipeModal = () => {
    setAddRecipeModalVisible(!addRecipeModalVisible);
  };

  const addBaseRecipe = () => {
    var baseRecipe = new RecipeCard('Base Recipe');
    var newRecipeList = RecipeCard[1];
    newRecipeList.push(baseRecipe);
    setRecipeList(newRecipeList);
  };

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
          ? visibleScrollBarWidth - scrollIndicatorSize - SIZES.large + 5
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
            renderItem={({item}) => <LetsCookCard item={item}/>}
            keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
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
      renderItem={({item}) => <LetsCookCard item={item}/>}
      keyExtractor={item => item?.name} contentContainerStyle={{ columnGap: SIZES.medium }}
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
    </View>
  )
}

export default Recipes;