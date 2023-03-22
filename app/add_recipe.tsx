import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Stack, Button} from '@mui/material';

export default function AddRecipeScreen() {
  const [text, onChangeText] = React.useState('Useless Text'); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Recipe</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SafeAreaView>
        <TextInput style={styles.input} 
        onChangeText={onChangeText}
        placeholder="Recipe Name"
        />
        <TextInput style={styles.input} 
        onChangeText={onChangeText}
        placeholder="Prep Time (minutes)"
        keyboardType="numeric"
        />
        <TextInput style={styles.input} 
        onChangeText={onChangeText}
        placeholder="Cook Time (minutes)"
        keyboardType="numeric"
        />
        <br></br><br></br>
      <Stack direction="row" spacing={3}>
        <Button variant="outlined" color='primary'>Clear</Button>
        <Button variant="outlined" color="secondary">Add Recipe</Button>
      </Stack>
      </SafeAreaView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
