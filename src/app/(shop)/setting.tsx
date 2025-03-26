import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getShopProfile } from '../../utils/shopService.js';

const defaultImage = require('../../assets/images/temp.png');

const ProfileScreen = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const shopId = await AsyncStorage.getItem("shopId"); 
      
        if (!shopId) {
          console.error("No shopId found in AsyncStorage");
          setLoading(false);
          return;
        }
        
        
        const data = await getShopProfile(shopId); // ✅ Pass shopId to API
        setShop(data);
      } catch (error) {
        console.error("Failed to fetch shop details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchShopDetails();
  }, []);
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("authToken"); // Remove user token
      await AsyncStorage.removeItem("shopAuthToken"); // Remove shop token if exists

      Alert.alert("Logout", "You have been logged out successfully!");
      router.replace("/(auth)"); // Redirect to login screen
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Failed to log out. Try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Shop Details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {shop ? (
        <>
          <Image
            source={shop?.shopImage && shop?.shopImage.startsWith('http')
              ? { uri: shop.shopImage }
              : defaultImage
            }
            style={styles.image}
          />

          <Text style={styles.shopName}>{shop?.shopName || "N/A"}</Text>
          <Text style={styles.ownerName}>Owner: {shop?.ownerName || "N/A"}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>📍 Address:</Text>
            <Text style={styles.infoText}>{shop?.address || "N/A"}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>📞 Phone:</Text>
            <Text style={styles.infoText}>{shop?.phone || "N/A"}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>✉️ Email:</Text>
            <Text style={styles.infoText}>{shop?.email || "N/A"}</Text>
          </View>

          {/* ✅ Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>No shop data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  shopName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#333",
  },
  ownerName: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  infoText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
