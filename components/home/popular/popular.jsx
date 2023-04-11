import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popular.style'
import { COLORS, SIZES } from '../../../constants';
import PopularRecipeCard from '../../common/cards/popular/PopularRecipeCard';

const Popular = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

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
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={[1,2,3,4]}
            renderItem={({item}) => (
              <PopularRecipeCard
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

export default Popular