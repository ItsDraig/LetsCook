import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularrecipecard.style'

const PopularRecipeCard = ({ item, selectedRecipe, handleCardPress}) => {
  return (
    <TouchableOpacity 
    style={styles.container(selectedRecipe, item)}
    onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedRecipe, item)}>
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

export default PopularRecipeCard