import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";
type HomeScreenNavigationProp = NativeStackNavigationProp<any>;

const HomeScreen = ({ navigation }:{navigation:HomeScreenNavigationProp}) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [topSalons, setTopSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [allSalons, setAllSalons] = useState<Salon[]>([]);

  useEffect(() => {
    fetchSalons();
  }, []);

  
  type Salon = {
    id: number;
    name: string;
    address: string;
    image: string;
    rating: string;
  };
  
  

  const fetchSalons = async () => {
    try {
      const response = await axios.get(API_URL);
      const salonData: Salon[] = response.data.map((item:Salon) => ({
        id: item.id,
        name: item.name,
        location: item.address,
        image: "https://via.placeholder.com/100", // Dummy image
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating 3.5 - 5.0
      }));
      setSalons(salonData);
      setAllSalons(salonData)
      setTopSalons(salonData.slice(0, 5)); // Taking top 5 salons
    } catch (error) {
      console.error("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text:string) => {
    setSearch(text);
    if (text) {
      const filtered = salons.filter((salon) =>
        salon.name.toLowerCase().includes(text.toLowerCase())
      );
      setSalons(filtered);
    } else {
      setSalons(allSalons);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search salons..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          {/* Horizontal Sliding Cards for Top Salons */}
          <Text style={styles.sectionTitle}>Top Salons</Text>
          <FlatList
            data={topSalons}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("SalonDetails", { salon: item })}
                style={styles.salonCardHorizontal}
              >
                <Image source={{ uri: item.image }} style={styles.salonImage} />
                <Text style={styles.salonName}>{item.name}</Text>
                <Text style={styles.salonLocation}>{item.address}</Text>
                <Text style={styles.salonRating}>⭐ {item.rating}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Vertical List for Nearest Salons */}
          <Text style={styles.sectionTitle}>Nearest Salons</Text>
          <FlatList
            data={salons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("SalonDetails", { salon: item })}
                style={styles.salonCard}
              >
                <Text style={styles.salonName}>{item.name}</Text>
                <Text style={styles.salonLocation}>{item.address}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 40 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  salonCardHorizontal: {
    width: 140,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  salonImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  salonCard: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  salonName: { fontSize: 16, fontWeight: "bold" },
  salonLocation: { color: "gray" },
  salonRating: { fontWeight: "bold", marginTop: 5 },
});

export default HomeScreen;
