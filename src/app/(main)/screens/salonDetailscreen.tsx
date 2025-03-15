import { StyleSheet,View, Text, Image, Button } from "react-native";
import { RouteProp, useRoute,useNavigation } from "@react-navigation/native";
import { SalonDetailScreenProps, SalonStackParamList } from "../stacks/types";
import { ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type SalonDetailRouteProp = RouteProp<SalonStackParamList, "SalonDetail">;
type NavigationProp = NativeStackNavigationProp<SalonStackParamList, "SalonDetail">;


export default function SalonDetailScreen() {
  const route = useRoute<SalonDetailRouteProp>();
  const { salon } = route.params;
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Salon Image */}
      <Image source={{ uri: salon.image }} style={styles.image} />

      {/* Salon Name */}
      <Text style={styles.name}>{salon.name}</Text>

      {/* Location */}
      <Text style={styles.location}>📍 {salon.location}</Text>

      {/* Rating */}
      <Text style={styles.rating}>⭐ {salon.rating} / 5</Text>

      {/* Description (Dummy for now) */}
      <Text style={styles.description}>
        Welcome to {salon.name}! We offer premium salon services with experienced professionals. Book an appointment now to experience top-notch grooming.
      </Text>

      <Button 
      title="Book Appointment"
      onPress={() => navigation.navigate("Appointment",{salon})}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
  },
  location: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f39c12",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    color: "#555",
    paddingHorizontal: 10,
  },
});