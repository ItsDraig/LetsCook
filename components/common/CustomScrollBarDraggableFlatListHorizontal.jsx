import React, { useRef, useState } from 'react';
import { Text, Animated, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';
import { DraggableFlatList } from './DraggableFlatList';
import LetsCookCard from './cards/letscook/LetsCookCard';
import PopularRecipeCard from './cards/popular/PopularRecipeCard';
import FavoriteRecipeCard from './cards/favorite/FavoriteRecipeCard';
import MyRecipesCard from './cards/myrecipes/MyRecipesCard';
import PantryIngredientCard from './cards/pantry/PantryIngredientCard';

const CustomScrollBarDraggableFlatListHorizontal = props => {
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
      ? visibleScrollBarWidth - scrollIndicatorSize - SIZES.xSmall + 2
      : 0;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarWidth / completeScrollBarWidth
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp'
  });

  return (
    <View style={{ flex: 1, flexDirection: 'column'}}>
        <Pressable onHoverIn={() => setShowScrollBar(true)} onHoverOut={() => setShowScrollBar(false)}>
          <DraggableFlatList data={props.recipeList}
            renderItem={({item}) => {
                switch(props.cardType)
                {
                    case "LetsCookCard":
                        return <LetsCookCard item={item} />;
                    case "PopularRecipeCard":
                        return <PopularRecipeCard item={item}/>;
                    case "FavoriteRecipeCard":
                        return <FavoriteRecipeCard item={item}/>;
                    case "MyRecipesCard":
                        return <MyRecipesCard item={item}/>;
                    case "PantryIngredientCard":
                        return <PantryIngredientCard item={item}/>;
                }
            }}
            keyExtractor={(item, index) => index} contentContainerStyle={{ columnGap: SIZES.medium }}
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
  );
};

const styles = StyleSheet.create({
    instructions: {
      height: '100%',
    },
    tabContainer: {
      marginTop: SIZES.xSmall - 2,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexGrow: 0,
      alignContent: "center",
      justifyContent: "center",
    },
    subtitleText: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingTop: SIZES.xSmall - 1,
    },
    boldStepText: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
        paddingTop: SIZES.xSmall,
    },
    stepText: {
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginBottom: SIZES.small / 2,
    },
});

export default CustomScrollBarDraggableFlatListHorizontal;