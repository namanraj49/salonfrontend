import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  appointments: [
    { id: "1", salon: "Salon A", date: "2024-03-15", status: "Completed" },
    { id: "2", salon: "Salon B", date: "2024-03-10", status: "Cancelled" },
  ],
};

export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Avatar (Circular Image) */}
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profilePic || "https://via.placeholder.com/100" }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Appointments History */}
      <Text style={styles.sectionTitle}>Appointment History</Text>
      <FlatList
        data={user.appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.salonName}>{item.salon}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  profileSection: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ddd", marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 16, color: "gray" },
  editButton: { marginTop: 10, backgroundColor: "#007BFF", padding: 8, borderRadius: 5 },
  editButtonText: { color: "#fff", fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, marginBottom: 10 },
  salonName: { fontSize: 16, fontWeight: "bold" },
  logoutButton: { marginTop: 20, backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center" },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
