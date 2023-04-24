import { React, useState, useRef, useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements';

import styles from './PantryIngredientCard.style'
import { FontAwesome5 } from '@expo/vector-icons'; 

const PantryIngredientCard = ({ item, handleDelete}) => {
  return (
    <View style={{marginBottom: 25}}>
      <TouchableOpacity style={[styles.container, {backgroundColor: '#312651'}]} onPress={() => handleCardPress(item)}>
        <Header 
            containerStyle={styles.headerContainer}
            leftComponent={
                <Text style={styles.companyName} numberOfLines={1}>
                    <FontAwesome5 name="ruler" size={19} color="#B3AEC6"/>{` ${item.quantity}`}
                </Text>
            }
            leftContainerStyle={{width: '65%'}}
            placement='left'
            rightComponent={
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <FontAwesome5 name="trash" size={25} color="black" />
                </TouchableOpacity>}>
        </Header>
        <View style={styles.infoContainer}>
          <Text style={styles.jobName}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  function handleCardPress(item)
  {
    console.log('pressed ' + item.name + ' card');
  }
}

export default PantryIngredientCard