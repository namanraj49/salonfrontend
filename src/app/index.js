import { Redirect } from 'expo-router';
import { useMemo } from 'react';

export default function Index() {
  const isLogin = useMemo(() => {
    // Determine based on some logic, e.g., checking a token
    return false; // or true
  }, []);

  return isLogin ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />;
}