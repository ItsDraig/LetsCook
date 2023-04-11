import React from 'react'
import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native'

import styles from './favoriterecipecard.style'

const FavoriteRecipeCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item.recipe_image }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item.recipe_type}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedRecipe, item)} numberOfLines={1}>
          {item.recipe_name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default FavoriteRecipeCard