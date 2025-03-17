import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function Index() {
  const [isLogin, setIsLogin] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    (async () => {
      console.log("Fetching login status in Index.js...");
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      const userRole = await AsyncStorage.getItem("role");

      console.log("Login Status:", loggedIn, "Role:", userRole);
      setIsLogin(loggedIn === "true"); // Convert to boolean
      setRole(userRole);
      setLoading(false); // Done loading
    })();
  }, []);

  // 🔹 Show loading screen while checking login status
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // 🔹 If not logged in, go to Auth screen
  if (!isLogin) {
    console.log("User not logged in. Redirecting to Auth.");
    return <Redirect href="/(auth)" />;
  }

  // 🔹 If logged in, check role and redirect
  return role === "shop" ? <Redirect href="/(shop)" /> : <Redirect href="/(main)" />;
}
