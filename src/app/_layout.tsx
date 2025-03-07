import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  //here i have to make the changes on the basis of the toggle
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLogin(loggedIn === 'true'); // ✅ Convert string to boolean
      await SplashScreen.hideAsync();
    };

    checkLoginStatus();
  }, []);

  if (isLogin === null) return null; // Avoid flickering

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLogin ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default RootLayout;
