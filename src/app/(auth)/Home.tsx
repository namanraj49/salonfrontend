import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken"); // ✅ Remove token
    router.replace("/loginuser"); // ✅ Redirect to login page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dummy Page!</Text>
      <Text style={styles.subtitle}>You are logged in.</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
});
