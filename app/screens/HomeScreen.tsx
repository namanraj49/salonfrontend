import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const HomeScreen = ({ navigation }:any) => {
  const [salons, setSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSalons();
  }, []);``

  const fetchSalons = async () => {
    try {
        const response = await axios.get("https://656d88a4bcc5618d3c22f4b5.mockapi.io/api/salons");

      setSalons(response.data);
      setFilteredSalons(response.data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text:string | null| undefined) => {
    setSearch(text);
    if (text) {
      const filtered = salons.filter((salon) =>
        salon.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSalons(filtered);
    } else {
      setFilteredSalons(salons);
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
        <FlatList
          data={filteredSalons}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SalonDetails", { salon: item })}
              style={styles.salonCard}
            >
              <Text style={styles.salonName}>{item.name}</Text>
              <Text style={styles.salonLocation}>{item.location}</Text>
            </TouchableOpacity>
          )}
        />
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
  salonCard: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  salonName: { fontSize: 18, fontWeight: "bold" },
  salonLocation: { color: "gray" },
});

export default HomeScreen;
