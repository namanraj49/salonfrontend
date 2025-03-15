import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(true);  // Start as true (logged in)
  const [role, setRole] = useState<string | null>(null);  // Define role type as string or null

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = 'true';  // Hardcode login as true
      const userRole = 'shop';  // Hardcode role as 'user'
      setIsLogin(loggedIn === 'true');
      setRole(userRole);  // This should work now as role is set to a valid string type
      await SplashScreen.hideAsync();
    };

    checkLoginStatus();
  }, []);

  if (isLogin === null || role === null) return null;  // Avoid flickering

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* If the user is logged in */}
      {isLogin ? (
        // Show Shop Interface if Role is 'shop'
        role === "shop" ? (
          <Stack.Screen name="(shop)" options={{ headerShown: false }} />
        ) : (
          // Show User Interface (Main) if Role is 'user'
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        )
      ) : (
        // Show Auth Screen if Not Logged In
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default RootLayout;
