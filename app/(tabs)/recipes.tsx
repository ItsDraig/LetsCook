import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

const TextInANest = () => {
  
}

export default function TabFourScreen() {
  // need a way to hide these if the user has recipes
  const noRecipeText = 'You currently have no recipes. Add more recipes using '
  const search = 'Search'
  const noRecipeTextCont = ' or by adding your own recipes using the button above! '
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.bodyText}> {noRecipeText}
        <Text style={styles.boldText}>{search}</Text>
        {noRecipeTextCont}
      </Text>
    </View>
  );
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
  boldText: {
    fontWeight: 'bold',
  },
  bodyText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
