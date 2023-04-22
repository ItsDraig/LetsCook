import React, {useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import { RecipeCard } from '../RecipeCard';
import { AddRecipe } from '../firebase';
import AddIngredientTab from '../components/common/cards/AddIngredientTab';
import CustomScrollBarScrollViewVertical from "../components/common/CustomScrollBarScrollViewVertical"
import CustomScrollBarDraggableScrollViewHorizontal from '../components/common/CustomScrollBarDraggableScrollViewHorizontal';

interface ModalProps {
    visible: boolean;
    toggleModal: () => void;
}

const AddRecipeModal = ({visible, toggleModal }: ModalProps) => {
    const [recipe, setRecipeData] = React.useState({name: '', preptime: '', cooktime: '', servings: '', ingredients: [] as string[], instructions: [''], tags: [] as string[]});
    const [recipeImage, setRecipeImage] = useState('https://static.thenounproject.com/png/3322766-200.png');
    const [isIngredientInputClicked, setIsIngredientInputClicked] = useState(false);
    const [isInstructionInputClicked, setIsInstructionInputClicked] = useState(false);
    const [isTagInputClicked, setIsTagInputClicked] = useState(false);
    const [numIngredients, setNumIngredients] = useState(0);
    const [ingredients, setIngredients] = useState([] as string[]);
    const [numInstructions, setNumInstructions] = useState(0);
    const [instructions, setInstructions] = useState(['']);
    const [numTags, setNumTags] = useState(0);
    const [tags, setTags] = useState([] as string[]);
  
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
      setRecipeData({name: '', preptime: '', cooktime: '', servings: '', ingredients: [''], instructions: [''], tags: ['']})
      setRecipeImage('https://static.thenounproject.com/png/3322766-200.png');
      setNumIngredients(0);
      setIngredients([] as string[]);
      setNumInstructions(0);
      setInstructions(['']);
      setNumTags(0);
      setTags([] as string[]);
      toggleModal();
    }

    // Creates a new RecipeCard and adds it to the database
    function onPressAddRecipe(newRecipe: any)
    {
      console.log("Adding recipe to firebase database");
      if(newRecipe.recipeName == '') newRecipe.recipeName = 'Untitled Recipe';
      if(newRecipe.preptime == '') newRecipe.preptime = '5';
      if(newRecipe.cooktime == '') newRecipe.cooktime = '25';
      if(newRecipe.servings == '') newRecipe.servings = '2 servings';
      if(newRecipe.totaltime == '') newRecipe.totaltime = checkTime();
      if(!newRecipe.ingredients?.length) newRecipe.ingredients = ['No Ingredients'];
      if(!newRecipe.instructions?.length) newRecipe.instructions = ['No Steps', 'Try adding some!'];
      let recipe = new RecipeCard(newRecipe.recipeName, recipeImage, parseInt(newRecipe.preptime), parseInt(newRecipe.cooktime),
      parseInt(newRecipe.preptime) + parseInt(newRecipe.cooktime), newRecipe.servings, [''], newRecipe.ingredients, newRecipe.instructions, newRecipe.tags);
      AddRecipe(recipe);
      toggleModal();
      ClearFields();
    }

    const handleIngredientInputFocus = () => {
      setIsIngredientInputClicked(true);
      setRecipeData({...recipe});
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

    const handleTagInputFocus = () => {
      setIsTagInputClicked(true);
    };

    const handleTagInputBlur = () => {
      setTimeout(function() {
        setIsTagInputClicked(false);
      }, 150);
    };

    const handleAddIngredient = () => {
      setNumIngredients(numIngredients + 1);
      setIngredients([...ingredients, '']);
      setRecipeData({...recipe});
    };

    const handleAddInstruction = () => {
      setNumInstructions(numInstructions + 1);
      setInstructions([...instructions, '']);
      setRecipeData({...recipe});
    };

    const handleAddTag = () => {
      setNumTags(numTags + 1);
      setTags([...tags, '']);
      setRecipeData({...recipe});
    };

    const handleIngredientChange = (text: string) => {
      const newIngredients = [...ingredients];
      newIngredients[numIngredients] = text;
      setRecipeData({...recipe, ingredients: newIngredients});
      setIngredients(newIngredients);
    };

    const handleInstructionChange = (text: string) => {
      const newInstructions = [...instructions];
      newInstructions[numInstructions] = text;
      setRecipeData({...recipe, instructions: newInstructions});
      setInstructions(newInstructions);
    };

    const handleTagChange = (text: string) => {
      const newTags = [...tags];
      newTags[numTags] = text;
      setRecipeData({...recipe, tags: newTags});
      setTags(newTags);
    };

    const handleIngredientPress = (index: any) => {
      setNumIngredients(numIngredients - 1);
      if(numIngredients <= 0) setNumIngredients(0);
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setRecipeData({...recipe, ingredients: newIngredients});
      setIngredients(newIngredients);
    };

    const handleTagPress = (index: any) => {
      setNumTags(numTags - 1);
      if(numTags <= 0) setNumTags(0);
      const newTags = [...tags];
      newTags.splice(index, 1);
      setRecipeData({...recipe, tags: newTags});
      setTags(newTags);
    };

    const onChangeImageText = (text: string) => {
      setRecipeImage(text);
    };

    const onImagePress = () => {
      setRecipeImage('');
      checkFieldValues();
    }

    const checkTime = () => {
      if(isNaN(parseInt(recipe.preptime)) && !isNaN(parseInt(recipe.cooktime)))
      {
        return (5 + parseInt(recipe.cooktime));
      }
      else if(!isNaN(parseInt(recipe.preptime)) && isNaN(parseInt(recipe.cooktime))) {
        return (parseInt(recipe.preptime) + 25);
      }
      else if (isNaN(parseInt(recipe.preptime) + parseInt(recipe.cooktime))){
        return 30;
      }
      else {
        return (parseInt(recipe.preptime) + parseInt(recipe.cooktime));
      }
    }
    const platformIngredients = (recipe: any) => {
      if (Platform.OS === 'web') {
        return <CustomScrollBarDraggableScrollViewHorizontal>
            {recipe.ingredients.map((ingredient: any, index: any) => ( <AddIngredientTab key={index} ingredient={ingredient} onPress={handleIngredientPress} index={index}/> ))}
          </CustomScrollBarDraggableScrollViewHorizontal>
      } else {
        return <ScrollView style={styles.tabContainer} horizontal centerContent showsHorizontalScrollIndicator={false}>
            {recipe.ingredients.map((ingredient: any, index: any) => (
              <AddIngredientTab key={index} ingredient={ingredient} onPress={handleIngredientPress} index={index}/>
            ))}
          </ScrollView>
      }
    }

    const platformInstructions = (recipe: any) => {
      if (Platform.OS === 'web') {
        return <CustomScrollBarScrollViewVertical>{recipe.instructions?.map((step: any, index:any) => (
            <Text style={index % 2 === 0 ? styles.boldStepText : styles.stepText} key={index}>{step}</Text>))}</CustomScrollBarScrollViewVertical>
      } else {
        return <ScrollView style={styles.instructions} centerContent contentContainerStyle={{ paddingRight: 14 }}>
                  <Text style={styles.subtitleText}>Steps:</Text>
                    {recipe.instructions.map((step:any, index:any) => (
                      <Text style={index % 2 === 0 ? styles.boldStepText : styles.stepText} key={index}>{step}</Text>))}
                </ScrollView>
      }
    }

    const platformTags = (recipe: any) => {
      if (Platform.OS === 'web') {
        return <CustomScrollBarDraggableScrollViewHorizontal>
            {recipe.tags.map((tag: any, index: any) => ( <AddIngredientTab key={index} ingredient={tag} onPress={handleTagPress} index={index}/> ))}
          </CustomScrollBarDraggableScrollViewHorizontal>
      } else {
        return <ScrollView style={styles.tabContainer} horizontal centerContent showsHorizontalScrollIndicator={false}>
            {recipe.tags.map((tag: any, index: any) => (
              <AddIngredientTab key={index} ingredient={tag} onPress={handleTagPress} index={index}/>
            ))}
          </ScrollView>
      }
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0)'}}>
            <View style={styles.container}>
              <TouchableOpacity style={[styles.logoContainer, {zIndex: 2, backgroundColor: COLORS.primary}]} onPress={onImagePress}>
                {recipeImage ? (
                  <Image source={{ uri: recipeImage }} style={styles.logoImage} />
                  ) : (
                    <TextInput style={styles.input} 
                      onChangeText={(text) => onChangeImageText(text)}
                      value={recipeImage}
                      placeholder="Paste image URL"/>
                  )}
              </TouchableOpacity>
              <TextInput style={styles.recipeName} 
                onChangeText={(text) => setRecipeData({...recipe, name: text})}
                value={recipe.name}
                placeholder="Untitled Recipe"/>
              <View style={styles.buttonContainer}>
                <Text style={styles.boldText}>Servings:</Text>
                  <TextInput style={[styles.stepText, {width: 75}]} 
                    onChangeText={(text) => setRecipeData({...recipe, servings: text})}
                    value={recipe.servings}
                    placeholder="2 servings"/>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.boldText}>Prep Time:</Text>
                  <TextInput style={[styles.stepText, {width: 25}]} 
                    onChangeText={(text) => setRecipeData({...recipe, preptime: text})}
                    value={recipe.preptime}
                    placeholder="5"
                    keyboardType="numeric"/>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.boldText}>Cook Time:</Text>
                  <TextInput style={[styles.stepText, {width: 25}]} 
                    onChangeText={(text) => setRecipeData({...recipe, cooktime: text})}
                    value={recipe.cooktime}
                    placeholder="25"
                    keyboardType="numeric"/>
              </View>
              <Text style={styles.boldText}>Total Time: <Text style={styles.stepText}>{checkTime()} mins</Text></Text>
              <Text style={styles.subtitleText}>Ingredients:</Text>
              {platformIngredients(recipe)}
              <View style={styles.buttonContainer}>
                <TextInput style={styles.input}
                  value={recipe.ingredients[numIngredients]}
                  onChangeText={(text) => handleIngredientChange(text)}
                  placeholder={`Ingredient`}
                  onFocus={handleIngredientInputFocus}
                  onBlur={handleIngredientInputBlur}/>
                    <TouchableOpacity onPress={handleAddIngredient} disabled={!isIngredientInputClicked}
                      style={[styles.tab, { backgroundColor: isIngredientInputClicked ? COLORS.tertiary : COLORS.secondary,
                                            margin: 0}]}>
                      <Text style={[styles.letsCookTabText, { color: isIngredientInputClicked ? COLORS.primary : COLORS.gray, }]}>Add Ingredient</Text>
                    </TouchableOpacity>
              </View>
              <Text style={[styles.subtitleText, {marginBottom: 5}]}>Steps:</Text>
              {platformInstructions(recipe)}
              <View style={styles.buttonContainer}>
                <TextInput style={styles.input}
                  value={recipe.instructions[numInstructions]}
                  onChangeText={(text) => handleInstructionChange(text)}
                  placeholder={`Instruction`}
                  onFocus={handleInstructionInputFocus}
                  onBlur={handleInstructionInputBlur}/>
                    <TouchableOpacity onPress={handleAddInstruction} disabled={!isInstructionInputClicked}
                      style={[styles.tab, { backgroundColor: isInstructionInputClicked ? COLORS.tertiary : COLORS.secondary, margin: 0}]}>
                      <Text style={[styles.letsCookTabText, { color: isInstructionInputClicked ? COLORS.primary : COLORS.gray, }]}>Add Step</Text>
                    </TouchableOpacity>
              </View>
              <Text style={styles.subtitleText}>Tags:</Text>
              {platformTags(recipe)}
              <View style={styles.buttonContainer}>
                <TextInput style={styles.input}
                  value={recipe.tags[numTags]}
                  onChangeText={(text) => handleTagChange(text)}
                  placeholder={`Tag`}
                  onFocus={handleTagInputFocus}
                  onBlur={handleTagInputBlur}/>
                    <TouchableOpacity onPress={handleAddTag} disabled={!isTagInputClicked}
                      style={[styles.tab, { backgroundColor: isTagInputClicked ? COLORS.tertiary : COLORS.secondary, margin: 0}]}>
                      <Text style={[styles.letsCookTabText, { color: isTagInputClicked ? COLORS.primary : COLORS.gray, }]}>Add Tag</Text>
                    </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={ClearFields} style={styles.tab}>
                      <Text style={styles.tabText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={[styles.tab, { backgroundColor: canCookBG }]}>
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
    width: Platform.OS === 'web' ? '50%' : '95%',
    minWidth: Platform.OS === 'web' ? 500 : '95%',
    height: Platform.OS === 'web' ? '90%' : '85%',
    minHeight: Platform.OS === 'web' ? 500 : '85%',
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    width: '50%',
    height: 100,
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
  logoImage: {
      width: "100%",
      height: "100%",
      borderRadius: 15,
      resizeMode: "cover",
      borderWidth: 0,
  },
  tabContainer: {
    width: "100%",
    flex: 1,
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
    textAlign: "center",
  },
  subtitleText: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 0,
  },
  boldText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.white,
    marginBottom: 12,
    paddingRight: 10,
},
  boldStepText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.white,
    paddingTop: SIZES.xSmall,
  },
  stepText: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginBottom: 12,
    textAlign: "center",
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
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'grey',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default AddRecipeModal;