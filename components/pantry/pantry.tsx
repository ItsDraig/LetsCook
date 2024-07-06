import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { RecipeCard } from '../../RecipeCard';
import AddIngredientModal from '../../app/addingredient_modal';
import PantryIngredientCard from '../common/cards/pantry/PantryIngredientCard';
import CustomScrollBarDraggableFlatListHorizontal from '../common/CustomScrollBarDraggableFlatListHorizontal';
import CustomScrollBarScrollViewVertical from "../common/CustomScrollBarScrollViewVertical"
import { useFocusEffect } from '@react-navigation/native';

import styles from './pantry.style';
import { DeleteIngredient, GetIngredients } from '../../firebase';
import { Ingredient } from '../../Ingredient';

const Pantry = () => {
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [addIngredientModalVisible, setAddIngredientModalVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const toggleAddIngredientModal = () => {
    console.log("toggling add ingredient modal");
    setAddIngredientModalVisible(!addIngredientModalVisible);
    fetchIngredients();
    setRefreshList(!refreshList);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    console.log('fetching ingredients');
    const ingredientsList = await GetIngredients();
    setIngredients(ingredientsList);
  };

  const handleDelete = (ingredientToDelete: Ingredient) => {
    console.log('deleting ingredient with name: ' + ingredientToDelete.name);
    DeleteIngredient(ingredientToDelete);
    setRefreshList(true);
    setRefreshList(false);
  };

  const platformChecker = () => {
    if (Platform.OS === 'web') {
      //return <CustomScrollBarDraggableFlatListHorizontal recipeList={ingredients} cardType={'PantryIngredientCard'}/>
      return  <CustomScrollBarScrollViewVertical style={{height: 600}}>
        <FlatList data={ingredients}
          extraData={refreshList}
          renderItem={({item}) => <PantryIngredientCard item={item} handleDelete={() => handleDelete(item)}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ alignContent: 'center', columnGap: SIZES.xLarge }}
          columnWrapperStyle={{justifyContent: "space-between",}}
          numColumns={5}/>
      </CustomScrollBarScrollViewVertical>
    } else {
      return <FlatList data={ingredients}
        renderItem={({item}) => <PantryIngredientCard item={item} handleDelete={() => handleDelete(item)}/>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal/>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Pantry</Text>
        <TouchableOpacity onPress={toggleAddIngredientModal}>
          <Text style={styles.headerBtn}>Add New Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        { platformChecker() }
      </View>

      <AddIngredientModal
        visible={addIngredientModalVisible}
        toggleModal={() => setAddIngredientModalVisible(!addIngredientModalVisible)}/>
    </View>
  )
}

export default Pantry;