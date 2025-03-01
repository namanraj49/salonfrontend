import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ Use useRouter instead of navigation

export default function LoginUser() {
  const router = useRouter(); // ✅ Get router

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/login", { email, password });

      Alert.alert("Success", "Logged in successfully!");
      // ✅ Use router.push instead of navigation.navigate
      router.push("/(auth)/registeruser"); 
    } catch (error) {
      Alert.alert(  "Login failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input}   placeholderTextColor="#888"   placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input}   placeholderTextColor="#888"   placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push("/(auth)/registeruser")} style={styles.link}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28, 
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#888", // Darker border for visibility
    borderWidth: 1.5, // Slightly thicker border
    marginBottom: 15, 
    paddingHorizontal: 15,
    borderRadius: 8, // Softer edges
    fontSize: 16, // Bigger font
    backgroundColor: "#f9f9f9", // Light background for better contrast
    color: "#000", // Text color
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
  },
});

