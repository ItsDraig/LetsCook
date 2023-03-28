import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Stack, Button } from "@react-native-material/core";
import { AddRecipe } from '../firebase';
import { RecipeCard } from '../RecipeCard';

export default function AddRecipeScreen() {
  const [recipe, setRecipeData] = React.useState({recipeName: '', preptime: '', cooktime: '', servings: ''});
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Recipe</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SafeAreaView>
        <TextInput style={styles.input} 
        onChangeText={(text) => setRecipeData({...recipe, recipeName: text})}
        value={recipe.recipeName}
        placeholder="Recipe Name"
        />
        <TextInput style={styles.input} 
        onChangeText={(text) => setRecipeData({...recipe, preptime: text})}
        value={recipe.preptime}
        placeholder="Prep Time (minutes)"
        keyboardType="numeric"
        />
        <TextInput style={styles.input} 
        onChangeText={(text) => setRecipeData({...recipe, cooktime: text})}
        value={recipe.cooktime}
        placeholder="Cook Time (minutes)"
        keyboardType="numeric"
        />
        <TextInput style={styles.input} 
        onChangeText={(text) => setRecipeData({...recipe, servings: text})}
        value={recipe.servings}
        placeholder="Servings (number)"
        keyboardType="numeric"
        />
        <Stack direction="row" spacing={10}>
          <Button onPress={() => setRecipeData({recipeName: '', preptime: '', cooktime: '', servings: ''})} title="Clear" variant="contained" color='primary'/>
          <Button onPress={() => onPressAddRecipe(recipe)} title="Add Recipe" variant="contained" color="secondary"/>
        </Stack>
      </SafeAreaView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

// Clears all text fields
function onPressClear()
{
  console.log("Clearing text fields");
}

// Creates a new RecipeCard and adds it to the database
function onPressAddRecipe(newRecipe: any)
{
  console.log("Adding recipe to firebase database");
  let recipe = new RecipeCard(newRecipe.recipeName, '', parseInt(newRecipe.preptime), parseInt(newRecipe.cooktime),
  parseInt(newRecipe.preptime) + parseInt(newRecipe.cooktime), parseInt(newRecipe.servings));
  AddRecipe(recipe);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'grey'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
