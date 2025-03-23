import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function Index() {
  const [isLogin, setIsLogin] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("Fetching login status in Index.js...");
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      const userRole = await AsyncStorage.getItem("role");
      const userId = await AsyncStorage.getItem("userId");  // ✅ Fetch userId
      const shopId = await AsyncStorage.getItem("shopId");  // ✅ Fetch shopId

      console.log("Login Status:", loggedIn, "Role:", userRole, "User ID:", userId, "Shop ID:", shopId);
      setIsLogin(loggedIn === "true");
      setRole(userRole);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLogin) {
    console.log("User not logged in. Redirecting to Auth.");
    return <Redirect href="/(auth)" />;
  }

  return role === "shop" ? <Redirect href="/(shop)" /> : <Redirect href="/(main)" />;
}
