import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function LoginUser() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://172.20.10.3:3000/users/login", { email, password });
      const { token, role, userId } = response.data; // ✅ Get userId from response

      if (token) {
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("userId", userId);  // ✅ Store userId

        Alert.alert("Success", "Logged in successfully!");
        router.replace("/screens/AppointmentScreen");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
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
    borderColor: "#888",
    borderWidth: 1.5, 
    marginBottom: 15, 
    paddingHorizontal: 15,
    borderRadius: 8, 
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
  },
});
