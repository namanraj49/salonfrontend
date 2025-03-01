import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="registeruser" options={{ headerShown: false }} />
      <Stack.Screen name="registershop" options={{ headerShown: false }} />
      <Stack.Screen name="loginuser" options={{ headerShown: false }} />
      <Stack.Screen name="loginshop" options={{ headerShown: false }} />
    </Stack>
  );
}
