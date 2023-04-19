import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import { Stack, Button } from "@react-native-material/core";
import { AddRecipe } from '../firebase';
import { RecipeCard } from '../RecipeCard';
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import IngredientTab from '../components/common/cards/IngredientTab';

interface ModalProps {
  visible: boolean;
  toggleModal: () => void;
}

const AddRecipeModal = ({visible, toggleModal }: ModalProps) => {
  const [recipe, setRecipeData] = React.useState({recipeName: '', preptime: '', cooktime: '', servings: '', ingredients: [''], instructions: ['']});
  const [isIngredientInputClicked, setIsIngredientInputClicked] = useState(false);
  const [isInstructionInputClicked, setIsInstructionInputClicked] = useState(false);
  const [numIngredients, setNumIngredients] = useState(0);
  const [ingredients, setIngredients] = useState(['']);
  const [numInstructions, setNumInstructions] = useState(0);
  const [instructions, setInstructions] = useState(['']);

  const [canCookBG, setCanCookBG] = useState(COLORS.secondary);
  const [canCookText, setCanCookText] = useState(COLORS.gray);

  // Checks to see if all fields are filled out
  const checkFieldValues = () => {
    setCanCookText(COLORS.white);
    setCanCookBG(COLORS.tertiary);
  }

  // Clears all fields
  function ClearFields()
  {
    console.log("Clearing text fields");
    setRecipeData({recipeName: '', preptime: '', cooktime: '', servings: '', ingredients: [''], instructions: ['']})
    setNumIngredients(1);
    setIngredients(['']);
    setNumInstructions(1);
    setInstructions(['']);
    toggleModal();
  }

  // Creates a new RecipeCard and adds it to the database
  function onPressAddRecipe(newRecipe: any)
  {
    console.log("Adding recipe to firebase database");
    let recipe = new RecipeCard(newRecipe.recipeName, '', parseInt(newRecipe.preptime), parseInt(newRecipe.cooktime),
    parseInt(newRecipe.preptime) + parseInt(newRecipe.cooktime), newRecipe.servings, [''], newRecipe.ingredients, newRecipe.instructions);
    AddRecipe(recipe);
    toggleModal();
    ClearFields();
  }

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

  const handleIngredientChange = (text: string) => {
    const newIngredients = [...ingredients];
    newIngredients[numIngredients] = text;
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
          onChangeText={(text) => handleIngredientChange(text)}
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleModal}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <View style={styles.logoContainer}>
              <Image source={{ uri: 'https://static.thenounproject.com/png/3322766-200.png' }} style={styles.logoImage}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                <TextInput style={styles.input} 
                  onChangeText={(text) => setRecipeData({...recipe, recipeName: text})}
                  value={recipe.recipeName}
                  placeholder="Recipe Name"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.boldText}>Servings: <Text style={styles.stepText}>{recipe.servings}</Text></Text>
                <TextInput style={styles.input} 
                  onChangeText={(text) => setRecipeData({...recipe, servings: text})}
                  value={recipe.servings}
                  placeholder="Servings"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.boldText}>Prep Time: <Text style={styles.stepText}>{recipe.preptime} mins</Text></Text>
                <TextInput style={styles.input} 
                  onChangeText={(text) => setRecipeData({...recipe, preptime: text})}
                  value={recipe.preptime}
                  placeholder="Prep Time (minutes)"
                  keyboardType="numeric"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.boldText}>Cook Time: <Text style={styles.stepText}>{recipe.cooktime} mins</Text></Text>
                <TextInput style={styles.input} 
                  onChangeText={(text) => setRecipeData({...recipe, cooktime: text})}
                  value={recipe.cooktime}
                  placeholder="Cook Time (minutes)"
                  keyboardType="numeric"/>
            </View>
            <Text style={styles.boldText}>Total Time: <Text style={styles.stepText}>{recipe.preptime + recipe.cooktime} mins</Text></Text>
            <Text style={styles.subtitleText}>Ingredients:</Text>
            <ScrollView style={styles.tabContainer} horizontal centerContent showsHorizontalScrollIndicator={false}>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <IngredientTab item={ingredient}/>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input}
                value={recipe.ingredients[numIngredients]}
                onChangeText={(text) => handleIngredientChange(text)}
                placeholder={`Ingredient`}
                onFocus={handleIngredientInputFocus}
                onBlur={handleIngredientInputBlur}/>
                  <Button title="Add ingredient" onPress={handleAddIngredient} disabled={!isIngredientInputClicked}/>
              </View>
            <View style={styles.inputContainer}>
              <ScrollView style={styles.instructions} centerContent contentContainerStyle={{ paddingRight: 14 }}>
                <Text style={styles.subtitleText}>Steps:</Text>
                  {recipe.instructions.map((step:any, index:any) => (
                    <Text style={index % 2 === 0 ? styles.boldStepText : styles.stepText} key={index}>{step}</Text>))}
              </ScrollView>
            </View>
            <View style={styles.inputContainer}>
                {renderInstructions()}
                <Button title="Add step" onPress={handleAddInstruction} disabled={!isInstructionInputClicked}/>
              </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={ClearFields} style={styles.tab}>
                    <Text style={styles.tabText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={[styles.letsCookTab, { backgroundColor: canCookBG }]}>
                    <Text style={[styles.letsCookTabText, { color: canCookText }]}>Add Recipe</Text>
                </TouchableOpacity>
            </View>
              
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'web' ? '55%' : '95%',
    height: Platform.OS === 'web' ? '90%' : '85%',
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  instructions: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },
  numRatings: {
    fontSize: 12,
    marginLeft: 6,
    marginTop: 1,
    color: "#B3AEC6",
  },
  logoImage: {
      width: "100%",
      height: "100%",
      borderRadius: 15,
      resizeMode: "cover",
      borderWidth: 0
  },
  tabContainer: {
    marginTop: SIZES.xSmall - 2,
    marginBottom: SIZES.xSmall,
    width: "100%",
    display: "flex",
    flexGrow: 0,
  },
  tab: {
    marginTop: SIZES.medium,
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginHorizontal: 3,
  },
  letsCookTab: {
    marginTop: SIZES.medium,
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginHorizontal: 3,
  },
  tabText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },
  letsCookTabText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
  },
  recipeName: {
    fontSize: SIZES.xLarge + 2,
    fontFamily: FONT.medium,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 12,
  },
  boldText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 12,
},
  boldStepText: {
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.bold,
      color: COLORS.white,
      paddingTop: SIZES.xSmall,
  },
  stepText: {
      fontSize: SIZES.small + 1,
      fontFamily: FONT.regular,
      color: "#B3AEC6",
      marginBottom: SIZES.small / 2,
  },


  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  input: {
    height: 25,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'grey'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default AddRecipeModal;