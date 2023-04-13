import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { RecipeCard } from '../RecipeCard';
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

interface ModalProps {
    recipe: RecipeCard;
    visible: boolean;
    toggleModal: () => void;
}

const RecipeModal = ({recipe, visible, toggleModal }: ModalProps) => {

    const renderIngredient = ({ item }: { item: string }) => {
        return <Text>{item}</Text>;
    };
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                  <Image
                    source={{ uri: recipe.thumbnail }}
                    style={styles.logoImage}
                  />
              </View>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.boldText}>Servings: <Text style={styles.stepText}>{recipe.servings}</Text></Text>
              <Text style={styles.boldText}>Prep Time: <Text style={styles.stepText}>{recipe.preptime} mins</Text></Text>
              <Text style={styles.boldText}>Cook Time: <Text style={styles.stepText}>{recipe.cooktime} mins</Text></Text>
              <Text style={styles.boldText}>Total Time: <Text style={styles.stepText}>{recipe.totaltime} mins</Text></Text>
              <ScrollView>
                <Text style={styles.subtitleText}>Ingredients:</Text>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text style={styles.stepText}>{ingredient}</Text>
                ))}
              </ScrollView>
              <ScrollView>
                <Text style={styles.subtitleText}>Steps:</Text>
                {recipe.instructions.map((step, index) => (
                  <Text style={styles.stepText}>{step}</Text>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={toggleModal} style={styles.tab}>
                  <Text style={styles.tabText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 650,
        height: 650,
        padding: SIZES.xLarge,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    },
    logoContainer: {
        width: 85,
        height: 85,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        resizeMode: "cover",
    },
    tab: {
        marginTop: SIZES.medium,
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    tabText: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },
    recipeName: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingTop: SIZES.medium,
        paddingBottom: SIZES.medium,
    },
    subtitleText: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingTop: SIZES.xSmall - 1,
    },
    boldText: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
        paddingBottom: SIZES.xSmall,
    },
    stepText: {
        fontSize: SIZES.small + 1,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 2,
    },
});

export default RecipeModal;