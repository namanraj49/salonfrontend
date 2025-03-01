import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ Use useRouter instead of navigation

export default function RegisterUser() {
  const router = useRouter(); // ✅ Get router

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        name,
        email,
        phone,
        password,
      });

      Alert.alert("Success", "Registered successfully!");
      // ✅ Use router.push instead of navigation.navigate
      router.push("/(auth)/loginuser");  
    } catch (error) {
      Alert.alert( "Registration failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input}  placeholderTextColor="#888"   placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input}  placeholderTextColor="#888"   placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input}   placeholderTextColor="#888"   placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input}   placeholderTextColor="#888"   placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Text onPress={() => router.push("/(auth)/loginuser")} style={styles.link}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  link: { marginTop: 10, textAlign: "center", color: "blue" },
});
