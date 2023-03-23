import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import { COLORS, icons, images, SIZES } from '../../constants';
import { Favorite, Popular, ScreenHeaderBtn, Welcome } from '../../components'
import { Stack } from 'expo-router';


export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcome}>
          <Welcome/>
          <Popular/>
          <Favorite/>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.lightWhite,
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.lightWhite,
    marginRight: 20,
    marginLeft: 20,
    marginVertical: 30,
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
    fontWeight: 'bold',
    color: COLORS.gray
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
