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
          source={{ uri: item.thumbnail }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{`~ ${item.totaltime} mins`}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedRecipe, item)} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  function handleCardPress(item) {
    console.log(item.name);
  }
}

export default PopularRecipeCard