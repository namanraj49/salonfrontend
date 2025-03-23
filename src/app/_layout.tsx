import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [role, setRole] = useState(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log("Checking login status...");
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const userRole = await AsyncStorage.getItem("role");
        const userId = await AsyncStorage.getItem("userId");  // ✅ Fetch userId
        const shopId = await AsyncStorage.getItem("shopId");  // ✅ Fetch shopId

        console.log("Login Status:", loggedIn, "Role:", userRole, "User ID:", userId, "Shop ID:", shopId);
        setIsLogin(loggedIn === "true");
        setRole(userRole);
      } catch (error) {
        console.error("Error fetching login status:", error);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLogin ? (
        role === "shop" ? (
          <Stack.Screen name="(shop)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        )
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default RootLayout;
