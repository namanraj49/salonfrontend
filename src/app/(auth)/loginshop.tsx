import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function ShopLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://172.20.10.3:3000/users/loginClient", {
        email,
        password,
      });

      const { token, role, shopId } = response.data; // ✅ Get shopId from response

      if (token) {
        await AsyncStorage.setItem("shopAuthToken", token);
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("shopId", shopId);  // ✅ Store shopId

        Alert.alert("Success", "Login successful!");
        router.replace("/(shop)/profile");  
      }
    } catch (error) {
      console.error("Login Failed:", error);
      Alert.alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5, backgroundColor: "#f9f9f9", color: "#000" },
});
