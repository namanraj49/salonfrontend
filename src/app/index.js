import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = 'true';  // Hardcode login as true
      const userRole = 'main';  // Hardcode role as 'user'
      setIsLogin(loggedIn === 'true');
      setRole(userRole);
    };
  
    checkLoginStatus();
  }, []);
  

  if (isLogin === null || role === null) return null;  // Avoid flickering

  return isLogin ? (
    role === "shop" ? <Redirect href="/(shop)" /> : <Redirect href="/(main)" />
  ) : (
    <Redirect href="/(auth)" />
  );
}
