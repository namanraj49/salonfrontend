import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ Use useRouter instead of navigation
import { TouchableOpacity } from "react-native";

export default function RegisterShop() {
  const router = useRouter(); // ✅ Get router

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [shopImage, setShopImage] = useState(""); // You may implement file/image upload

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !shopName || !ownerName || !address) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      console.log("Sending Registration Request:", {
        name,
        email,
        phone,
        password,
        shop: { shopName, ownerName, address, shopImage },
      });

      const response = await axios.post("http://172.20.10.3:3000/users/registerShop", {
        name,
        email,
        phone,
        password,
        shopName,  // ✅ Send directly
        ownerName,
        address,
        shopImage,
      });
      

      console.log("Registration Successful:", response.data);
      Alert.alert("Success", "Shop registered successfully!");
      router.push("/(auth)/loginshop");

    } catch (error) {
      console.error("Registration Failed:");
      Alert.alert("Registration failed"  );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Your Shop</Text>
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Shop Name" value={shopName} onChangeText={setShopName} />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Owner Name" value={ownerName} onChangeText={setOwnerName} />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Shop Image URL" value={shopImage} onChangeText={setShopImage} />
      <Button title="Register Shop" onPress={handleRegister} />
      <TouchableOpacity onPress={() => router.push("/(auth)/loginshop")}>
  <Text style={styles.link}>Already have an account? Login</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  link: { marginTop: 10, textAlign: "center", color: "blue" },
});

