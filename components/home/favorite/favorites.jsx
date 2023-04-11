import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './favorites.style'
import { COLORS, SIZES } from '../../../constants';
import FavoriteRecipeCard from '../../common/cards/favorite/FavoriteRecipeCard';
import { NearbyJobCard } from '../..';

const Favorite = () => {
  const router = useRouter();
  const data = null;
  /*
  const { data, isLoading, errpr } = useFetch
  ('search', {
    query: 'Pizza spring rolls',
    num_pages: 1
  })
  */
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
            data?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              >
              </NearbyJobCard>

            ))
          )}
      </View>
    </View>
  )
}

export default Favorite