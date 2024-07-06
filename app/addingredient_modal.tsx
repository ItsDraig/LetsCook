import React, {useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import { ActivityIndicator } from '@react-native-material/core';
import { AddIngredient } from '../firebase';
import { Ingredient } from '../Ingredient';

interface ModalProps {
    visible: boolean;
    toggleModal: () => void;
}

const AddIngredientModal = ({visible, toggleModal }: ModalProps) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingredients, setIngredients] = useState([] as Ingredient[]);

    const [canCookBG, setCanCookBG] = useState(COLORS.secondary);
    const [canCookText, setCanCookText] = useState(COLORS.gray);

    const addButtonRef = useRef<TouchableOpacity>(null);
    const quantityInputRef = useRef<TextInput>(null);

    const handleAddIngredient = () => {
      const newIngredient = new Ingredient(name, quantity);
      AddIngredient(new Ingredient(name, quantity));
      setIngredients([...ingredients, newIngredient]);
      ClearFields();
      CheckFieldValues();
    };

    // Clears all fields
    function ClearFields()
    {
      setIngredients([] as Ingredient[]);
      setQuantity('');
      setName('');
      CheckFieldValues();
      toggleModal();
    }

    // Checks to see if all fields are filled out
    const CheckFieldValues = () => {
      if(name != '' && quantity != '')
      {
        setCanCookText(COLORS.white);
        setCanCookBG(COLORS.tertiary);
      }
      else
      {
        setCanCookBG(COLORS.secondary);
        setCanCookText(COLORS.gray);
      }
    }

    const handleNameChange = (text: string) => {
        setName(text);
        CheckFieldValues();
    };

    const handleNameSubmit = () => {
        CheckFieldValues();
        quantityInputRef.current?.focus();
    };

    const handleQuantityChange = (text: string) => {
        setQuantity(text);
        CheckFieldValues();
    };

    const handleQuantitySubmit = () => {
        CheckFieldValues();
        addButtonRef.current?.focus();
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0)'}}>
            <View style={styles.container}>
                <Text style={styles.recipeName}>Add Ingredient</Text>
              <View style={styles.buttonContainer}>
                <Text style={styles.boldText}>Name:</Text>
                  <TextInput style={[styles.stepText, {width: 100, borderWidth: 1, borderColor: 'white', padding: 3}]} 
                    onChangeText={handleNameChange}
                    value={name}
                    placeholder="Butter"
                    placeholderTextColor={COLORS.gray}
                    onSubmitEditing={handleNameSubmit}/>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.boldText}>Quantity:</Text>
                  <TextInput style={[styles.stepText, {width: 100, borderWidth: 1, borderColor: 'white', padding: 3}]}
                    ref={quantityInputRef}
                    onChangeText={handleQuantityChange}
                    value={quantity}
                    placeholder="450 grams"
                    placeholderTextColor={COLORS.gray}
                    onSubmitEditing={handleQuantitySubmit}/>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={ClearFields} style={styles.tab}>
                      <Text style={styles.tabText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity ref={addButtonRef} onPress={handleAddIngredient} style={[styles.tab, { backgroundColor: canCookBG }]}>
                    <Text style={[styles.letsCookTabText, { color: canCookText }]}>Add Ingredient</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'web' ? '25%' : '85%',
    minWidth: Platform.OS === 'web' ? 300 : '85%',
    height: '25%',
    minHeight: Platform.OS === 'web' ? 235 : '30%',
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
    marginTop: 8,
    marginBottom: 16,
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

export default AddIngredientModal;