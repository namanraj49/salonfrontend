import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://172.20.10.3:3000/users/addService'; // Your backend API endpoint

const AddServiceScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const navigation = useNavigation(); // Get navigation instance

  const handleAddService = async () => {
    try {
      Keyboard.dismiss(); // Hide keyboard when submitting

      const barberId = await AsyncStorage.getItem("shopId"); // Get shopId

      if (!barberId) {
        Alert.alert("Error", "No shop ID found. Please try again.");
        return;
      }

      const serviceData = {
        barberId, 
        name,
        description,
        price: Number(price),
        duration: Number(duration),
      };

      const response = await axios.post(API_URL, serviceData);

      Alert.alert("Success", "Service added successfully!", [
        { text: "OK", onPress: () => navigation.goBack() } // Navigate back
      ]);

      setName('');
      setDescription('');
      setPrice('');
      setDuration('');
    } catch (error) {
      console.error("❌ Error adding service:", error);
      Alert.alert("Error", "Failed to add service. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add New Service</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter service name"
          placeholderTextColor="#333"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter description"
          placeholderTextColor="#333"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter price"
          placeholderTextColor="#333"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter duration in minutes"
          placeholderTextColor="#333"
          value={duration}
          keyboardType="numeric"
          onChangeText={setDuration}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddService}>
          <Text style={styles.buttonText}>Add Service</Text>
        </TouchableOpacity>

        {/* Back Button (if needed) */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    backgroundColor: "#AAA",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AddServiceScreen;
