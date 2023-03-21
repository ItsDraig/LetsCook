import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function AddIngredientScreen() {
  const [text, onChangeText] = React.useState('Useless Text'); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Ingredient</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SafeAreaView>
        <TextInput style={styles.input} 
        onChangeText={onChangeText}
        placeholder="Ingredient Name"
        />
        <TextInput style={styles.input} 
        onChangeText={onChangeText}
        placeholder="Quantity (optional)"
        keyboardType="numeric"
        />
        <Pressable style={styles.input}>
            <Text>Add Ingredient</Text>
        </Pressable>
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
