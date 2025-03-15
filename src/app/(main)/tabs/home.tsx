import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceCard from "../components/serviceCard";
import SalonCard from "../components/salonCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SalonStackParamList } from "../stacks/types";


const services = [
    { id: "1", name: "Haircut", image: "https://example.com/haircut.jpg" },
    { id: "2", name: "Facial", image: "https://example.com/facial.jpg" },
    { id: "3", name: "Massage", image: "https://example.com/massage.jpg" },
  
]

const salons = [
    {
      id: "1",
      name: "Luxury Cuts",
      image: "https://example.com/luxurycuts.jpg",
      location: "Downtown, City",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Elite Spa & Salon",
      image: "https://example.com/elitespa.jpg",
      location: "Main Street, City",
      rating: 4.5,
    },
    {
      id: "3",
      name: "Glamour Hub",
      image: "https://example.com/glamourhub.jpg",
      location: "Uptown, City",
      rating: 4.7,
    },
  ];

  type HomeScreenNavigationProp = NativeStackNavigationProp<SalonStackParamList, "Home">;


const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for salons or services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>


       
      <FlatList 
      data={services}
      keyExtractor={(item)=>item.id}
      horizontal
      renderItem={({item})=><ServiceCard service={item} onPress={() => console.log(`Selected:${item.name}`)}/>}
      contentContainerStyle={styles.serviceList}
      />


<FlatList
        data={salons}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <SalonCard salon={item} onPress={()=>navigation.navigate("SalonDetail" , {salon:item})} />
        )}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  serviceList: {
    marginTop: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },

});

export default HomeScreen;
