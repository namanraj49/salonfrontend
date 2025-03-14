import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getShopProfile } from '../../utils/shopService.js';

// ✅ Use require() for local fallback image in React Native
const defaultImage = require('../../assets/images/temp.png');

const ProfileScreen = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const data = await getShopProfile();
        
        setShop(data);
      } catch (error) {
        console.error("Failed to fetch shop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

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
          {/* ✅ Display image only if valid, otherwise fallback */}
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
});

export default ProfileScreen;
