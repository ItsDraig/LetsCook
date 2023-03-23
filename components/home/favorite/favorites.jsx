import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './favorites.style'
import { COLORS, SIZES } from '../../../constants';
import FavoriteRecipeCard from '../../common/cards/favorite/FavoriteRecipeCard';

const Favorite = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Recipes</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={[1,2,3,4]}
            renderItem={({item}) => (
              <FavoriteRecipeCard
                item={item}
              />
            )}
            keyExtractor={item => item?.recipe_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />)}
      </View>
    </View>
  )
}

export default Favorite