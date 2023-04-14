import { React, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const pantryIngredients = ["Vegetable oil", "1 cup soy milk", "1 teaspoon garlic powder", "1 teaspoon onion powder"];

const IngredientTab = (ingredient) => {
    return (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
              style = {styles.tab(ingredient)}
              onPress={() => {console.log(ingredient.item)}}>
              <Text style={styles.tabText}>{ingredient.item}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        height: 100,
    },
    tab: (ingredient) => ({
        marginEnd: SIZES.small,
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: pantryIngredients.includes(ingredient.item) ?  COLORS.gray2 : COLORS.secondary,
    }),
    tabText:{
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
});

export default IngredientTab