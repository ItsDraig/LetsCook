import { StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';

export default function TabTwoScreen() {

  type SearchBarComponentProps = {};

  const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
    const [search, setSearch] = useState("");
    
    const updateSearch = (search: React.SetStateAction<string>) => {
      setSearch(search);
    };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SearchBar
        placeholder="Search for recipes here..."
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
}}

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

