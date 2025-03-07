import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ Import useRouter
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Import AsyncStorage

export default function ShopLogin() {
  const router = useRouter(); // ✅ Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      console.log("Sending Login Request:", { email, password });

      const response = await axios.post("http://172.20.10.3:3000/users/loginClient", {
        email,
        password,
      });

      const { token } = response.data;
     // console.log("Login Successful:", response.data);

      if (token) {
        await AsyncStorage.setItem("shopAuthToken", token); // ✅ Store token for shop login
        await AsyncStorage.setItem("isLoggedIn", "true");
        Alert.alert("Success", "Login successful!");
        router.push("/(auth)/Home"); // ✅ Redirect to auth home
      }
    } catch (error) {
      console.error("Login Failed:", error);
      Alert.alert("Login failed");
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

