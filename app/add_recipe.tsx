import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Stack, Button } from "@react-native-material/core";
import { AddRecipe } from '../firebase';
import { RecipeCard } from '../RecipeCard';

export default function AddRecipeScreen() {
  const [recipe, setRecipeData] = React.useState({recipeName: '', preptime: '', cooktime: '', servings: '', ingredients: [''], instructions: ['']});
  const [isIngredientInputClicked, setIsIngredientInputClicked] = useState(false);
  const [isInstructionInputClicked, setIsInstructionInputClicked] = useState(false);
  const [numIngredients, setNumIngredients] = useState(1);
  const [ingredients, setIngredients] = useState(['']);
  const [numInstructions, setNumInstructions] = useState(1);
  const [instructions, setInstructions] = useState(['']);

  const handleIngredientInputFocus = () => {
    setIsIngredientInputClicked(true);
  };

  const handleIngredientInputBlur = () => {
    setTimeout(function() {
      setIsIngredientInputClicked(false);
    }, 150);
  };

  const handleInstructionInputFocus = () => {
    setIsInstructionInputClicked(true);
  };

  const handleInstructionInputBlur = () => {
    setTimeout(function() {
      setIsInstructionInputClicked(false);
    }, 150);
  };

  const handleAddIngredient = () => {
    setNumIngredients(numIngredients + 1);
    setIngredients([...ingredients, '']);
  };

  const handleAddInstruction = () => {
    setNumInstructions(numInstructions + 1);
    setInstructions([...instructions, '']);
  };

  const handleIngredientChange = (text: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setRecipeData({...recipe, ingredients: newIngredients});
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (text: string, index: number) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setRecipeData({...recipe, instructions: newInstructions});
    setInstructions(newInstructions);
  };

  const renderIngredients = () => {
    const inputComponents = [];
    for (let i = 0; i < numIngredients; i++) {
      inputComponents.push(
        <TextInput
          style={styles.input}
          key={i}
          value={recipe.ingredients[i]}
          onChangeText={(text) => handleIngredientChange(text, i)}
          placeholder={`Ingredient ${i + 1}`}
          onFocus={handleIngredientInputFocus}
          onBlur={handleIngredientInputBlur}
        />
      );
    }
    return inputComponents;
  };

  const renderInstructions = () => {
    const inputComponents = [];
    for (let i = 0; i < numInstructions; i++) {
      inputComponents.push(
        <TextInput
          style={styles.input}
          key={i}
          value={recipe.instructions[i]}
          onChangeText={(text) => handleInstructionChange(text, i)}
          placeholder={`Instruction ${i + 1}`}
          onFocus={handleInstructionInputFocus}
          onBlur={handleInstructionInputBlur}
        />
      );
    }
    return inputComponents;
  };

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
        
        <View style={{ margin: 5}}>
          {renderIngredients()}
          <Button title="Add ingredient" onPress={handleAddIngredient} disabled={!isIngredientInputClicked}/>
        </View>

        <View style={{ margin: 5}}>
          {renderInstructions()}
          <Button title="Add step" onPress={handleAddInstruction} disabled={!isInstructionInputClicked}/>
        </View>
        
        <Stack direction="row" spacing={10} style={{ marginTop: 20}}>
          <Button onPress={() => setRecipeData({recipeName: '', preptime: '', cooktime: '', servings: '', ingredients: [''], instructions: ['']})} title="Clear" variant="contained" color='primary'/>
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
  parseInt(newRecipe.preptime) + parseInt(newRecipe.cooktime), newRecipe.servings, [''], newRecipe.ingredients, newRecipe.instructions);
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
