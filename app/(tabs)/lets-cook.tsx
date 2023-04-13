import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Popular } from '../../components'
import { COLORS, icons, images, SIZES } from '../../constants';

export default function TabThreeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcome}>
          <Text style={styles.title}>Lets Cook!</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Popular/>
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
    width: '80%'
  }
});
