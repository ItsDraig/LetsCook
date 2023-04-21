import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { icons, SIZES } from '../../../constants'
import styles from './Welcome.style'




const Welcome = ({ activeRecipeType, setActiveRecipeType, onSortRecipes }) => {

  const recipeTypes = ["All Ingredients", "Most Ingredients", "Chinese", "Vegan", "Dessert", "Air Fryer"];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Oliver,</Text>
        <Text style={styles.welcomeMessage}>Let's Cook!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
          style={styles.searchInput}
          value=""
          onChange={() => {}}
          placeholder="What are you craving today?"
          placeholderTextColor={'gray'}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={recipeTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style = {styles.tab(activeRecipeType, item)}
            onPress={() => {
              setActiveRecipeType(item);
              onSortRecipes();
              //router.push(`/search/${item}`)
            }}>
              <Text style={styles.tabText(activeRecipeType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small}}
          horizontal
          ></FlatList>
      </View>
    </View>
  )
}

export default Welcome