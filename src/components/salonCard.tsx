import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface SalonCardProps {
  salon: {
    id: string;
    name: string;
    image: string;
    rating: number;
    location: string;
  };
  onPress: () => void;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: salon.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{salon.name}</Text>
        <Text style={styles.rating}>⭐ {salon.rating}</Text>
        <Text style={styles.location}>{salon.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "gray",
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
});

export default SalonCard;