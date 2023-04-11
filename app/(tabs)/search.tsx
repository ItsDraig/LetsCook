import { StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { COLORS, icons, images, SIZES } from '../../constants';
import styles from '../search.style'

export default function TabTwoScreen() {

  type SearchBarComponentProps = {};

  const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
    const [search, setSearch] = useState("");
    
    const updateSearch = (search: React.SetStateAction<string>) => {
      setSearch(search);
    };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
          style={styles.searchInput}
          value=""
          onChange={() => {}}
          placeholder="What are you craving today?"
          placeholderTextColor={'gray'}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            //style={styles.searchBtnImage}
            />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}}
