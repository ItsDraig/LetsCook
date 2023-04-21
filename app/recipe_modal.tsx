import React, {useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, FlatList, TouchableOpacity, Platform, Animated } from 'react-native';
import { RecipeCard } from '../RecipeCard';
import { DraggableScrollView } from '../components/common/DraggableScrollView';
import CustomScrollBarScrollViewVertical from "../components/common/CustomScrollBarScrollViewVertical"
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import IngredientTab from '../components/common/cards/IngredientTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import FavoriteButton from '../components/common/cards/FavoriteButton';
import * as SQLite from 'expo-sqlite';
import { Database, SQLError, SQLTransaction } from 'expo-sqlite';
import CustomScrollBarDraggableScrollViewHorizontal from '../components/common/CustomScrollBarDraggableScrollViewHorizontal';
import LetsCookModal from '../app/letscook_modal'

const idb = SQLite.openDatabase('ingredients.db');
const srdb = SQLite.openDatabase('saved_recipes.db');

interface ModalProps {
    recipe: RecipeCard;
    visible: boolean;
    isFavorite: boolean;
    toggleFavorite: () => void;
    toggleModal: () => void;
}

interface DatabaseRow {
  ingredients: string;
  quantity: string; //change to int
}

const FilledStar = () => (
  <View style={styles.star}>
    <Icon name="star" color="#f1c40f" size={20} />
  </View>
);

const HalfStar = () => (
  <View style={styles.star}>
    <Icon name="star-half" color="#f1c40f" size={20} />
  </View>
);

const EmptyStar = () => (
  <View style={styles.star}>
    <Icon name="star-o" color="#f1c40f" size={20} />
  </View>
);

function checkArrayInDB(db: Database, tableName: string, columnName: string, arr: string[]): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) FROM ${tableName} WHERE ${columnName} IN (${arr.map(() => '?').join(',')})`,
        arr,
        (tx, results) => {
          const rows = results.rows;
          const count = rows && rows.length > 0 ? rows.item(0)['COUNT(*)'] : 0;
          resolve(count === arr.length);
        },
        (tx: SQLTransaction, error: SQLError) => {
          console.error(error);
          return true; // rollback transaction
        }
      );
    });
  });
}

const platformIngredients = (recipe: any) => {
  if (Platform.OS === 'web') {
    return <CustomScrollBarDraggableScrollViewHorizontal recipe={recipe}></CustomScrollBarDraggableScrollViewHorizontal>
  } else {
    return <ScrollView style={styles.tabContainer} horizontal centerContent showsHorizontalScrollIndicator={false}>
    {recipe.ingredients.map((ingredient: any, index: any) => (
      <IngredientTab item={ingredient}/>
    ))}
  </ScrollView>
  }
}

const platformInstructions = (recipe: any) => {
  if (Platform.OS === 'web') {
    return <CustomScrollBarScrollViewVertical recipe={recipe}></CustomScrollBarScrollViewVertical>
  } else {
    return <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
        <ScrollView style={styles.instructions} centerContent contentContainerStyle={{ paddingRight: 14 }}>
          <Text style={styles.subtitleText}>Steps:</Text>
            {recipe.instructions.map((step:any, index:any) => (
              <Text style={index % 2 === 0 ? styles.boldStepText : styles.stepText} key={index}>{step}</Text>))}
        </ScrollView>
      </View>
  }
}

const RecipeModal = ({recipe, visible, isFavorite, toggleFavorite, toggleModal }: ModalProps) => {

    // replace isFavorite from local database (checks recipe names)
    isFavorite = false;

    // replace numRatings and filledStars (average rating) with firebase values
    const numRatings = 0;
    const filledStars = Math.floor(0); 
    const hasHalfStar = 0 - filledStars >= 0.5;

    const tableName = 'ingredients';
    const columnName = 'name';
    const [canCookBG, setCanCookBG] = useState(COLORS.secondary);
    const [canCookText, setCanCookText] = useState(COLORS.gray);

    const [modalVisible, setModalVisible] = useState(false);

    checkArrayInDB(idb, tableName, columnName, recipe.ingredients)
      .then((result) => {
        if (result) {
          console.log('All ingredients exist in the database');
          setCanCookText(COLORS.white);
          setCanCookBG(COLORS.tertiary);
        } else {
          console.log('Some ingredients do not exist in the database');
        }
      })
      .catch((error) => console.error(error));

    const renderStar = (index: number) => {
      if (index < filledStars) {
        return <FilledStar key={index} />;
      } else if (index === filledStars && hasHalfStar) {
        return <HalfStar key={index} />;
      } else {
        return <EmptyStar key={index} />;
      }
    };

    const toggleLetsCookModal = () => {

      console.log("opening letscook modal");
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={styles.container}>
              <Header 
                containerStyle={styles.headerContainer}
                centerComponent={
                <View style={styles.logoContainer}>
                    <Image
                      source={{ uri: recipe.thumbnail }}
                      style={styles.logoImage}
                    />
                </View>
                }
                rightComponent={
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onPress={toggleFavorite}
                    style={styles.favoriteButton}/>}>
                </Header>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => renderStar(index))}
                <Text style={styles.numRatings}>{numRatings} ratings</Text>
              </View>
              <Text style={styles.boldText}>Servings: <Text style={styles.stepText}>{recipe.servings}</Text></Text>
              <Text style={styles.boldText}>Prep Time: <Text style={styles.stepText}>{recipe.preptime} mins</Text></Text>
              <Text style={styles.boldText}>Cook Time: <Text style={styles.stepText}>{recipe.cooktime} mins</Text></Text>
              <Text style={styles.boldText}>Total Time: <Text style={styles.stepText}>{recipe.totaltime} mins</Text></Text>
              <Text style={styles.subtitleText}>Ingredients:</Text>
              {platformIngredients(recipe)}
              {platformInstructions(recipe)}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggleModal} style={styles.tab}>
                      <Text style={styles.tabText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[styles.letsCookTab, { backgroundColor: canCookBG }]}>
                      <Text style={[styles.letsCookTabText, { color: canCookText }]}>Lets Cook!</Text>
                  </TouchableOpacity>
              </View>
                
            </View>
            <LetsCookModal
            recipe={recipe}
            visible={modalVisible}
            toggleModal={() => setModalVisible(!modalVisible)} isFavorite={false} toggleFavorite={function (): void {
              throw new Error('Function not implemented.');
            } }/>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Platform.OS === 'web' ? 650 : '95%',
        height: Platform.OS === 'web' ? 650 : '75%',
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
    },
    instructions: {
      height: '100%',
    },
    headerContainer: {
      width: Platform.OS === 'web' ? 650 : '95%',
      height: Platform.OS === 'web' ? 85 : '20%',
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 0,
      borderColor: 'transparent',
      elevation: 0
  },
    star: {
      marginHorizontal: 2,
    },
    ratingContainer: {
        paddingBottom: SIZES.small,
        flexDirection: 'row',
    },
    favoriteButton: {
      marginRight: Platform.OS === 'web' ? 10 : 0,
      paddingRight: Platform.OS === 'web' ? 4 : 0,
    },
    logoContainer: {
        width: 85,
        height: 85,
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
        paddingTop: SIZES.medium,
        paddingBottom: SIZES.small,
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
});

export default RecipeModal;