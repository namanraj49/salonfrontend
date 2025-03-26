import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Alert, 
  StyleSheet, Platform, ActivityIndicator 
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://172.20.10.3:3000/users";

const ManageServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const barberId = await AsyncStorage.getItem("shopId");
      if (!barberId) {
        Alert.alert("Error", "No shop ID found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/shop/${barberId}`);
      setServices(response.data);
    } catch (error) {
      console.error("Fetch Error:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (service) => {
    setEditingService(service._id);
    setName(service.name);
    setDescription(service.description);
    setPrice(String(service.price));
    setDuration(String(service.duration));
  };

  const updateService = async () => {
    try {
      if (!name || !description || !price || !duration) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await axios.put(`${API_URL}/service/${editingService}`, {
        name,
        description,
        price: Number(price),
        duration: Number(duration),
      });

      Alert.alert("Success", "Service updated successfully!");
      setEditingService(null);
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      fetchServices();
    } catch (error) {
      console.error("Update Error:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to update service.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Manage Services</Text>

        {editingService && (
          <View style={styles.editContainer}>
            <Text style={styles.subHeading}>Edit Service</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Service Name" />
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
            <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" />
            <TextInput style={styles.input} value={duration} onChangeText={setDuration} placeholder="Duration (mins)" keyboardType="numeric" />

            <TouchableOpacity style={styles.saveButton} onPress={updateService}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingService(null)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.serviceItem}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Duration: {item.duration} mins</Text>

                <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  serviceItem: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "#DC3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ManageServicesScreen;
