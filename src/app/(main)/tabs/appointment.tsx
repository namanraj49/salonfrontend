import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const appointments = [
  {
    id: "1",
    salonName: "Luxury Salon",
    date: "2025-03-15",
    time: "3:00 PM",
    services: "Haircut, Beard Trim",
    status: "Accepted",
  },
  {
    id: "2",
    salonName: "Elite Spa",
    date: "2025-03-18",
    time: "1:00 PM",
    services: "Facial, Massage",
    status: "Rejected",
  },
];

export default function UpcomingAppointmentsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.salonName}>{item.salonName}</Text>
                <Text style={styles.details}>Date: {item.date}</Text>
                <Text style={styles.details}>Time: {item.time}</Text>
                <Text style={styles.details}>Services: {item.services}</Text>
                <Text style={[styles.status, item.status === "Accepted" ? styles.accepted : styles.rejected]}>
                  Status: {item.status}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Chat")}> 
                <FontAwesome name="comment" size={24} color="#007BFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#f8f8f8", padding: 15, borderRadius: 8, marginBottom: 10 },
  cardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  salonName: { fontSize: 16, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555" },
  status: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  accepted: { color: "green" },
  rejected: { color: "red" },
});