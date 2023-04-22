import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const AddIngredientTab = ({ingredient, onPress, index}) => {
  
    const handlePress = () => {
        onPress(index)
    }

    return (
      <TouchableOpacity
        style = {styles.tab}
        onPress={handlePress}>
        <Text style={styles.tabText}>{ingredient}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tab: {
        marginEnd: SIZES.small,
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderColor: COLORS.gray2,
        borderWidth: 1,
        height: 30,
    },
    tabText:{
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
});

export default AddIngredientTab