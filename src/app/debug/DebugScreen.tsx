import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";

const DebugScreen = () => {
  const [status, setStatus] = useState<string>("Not Set");

  const setValues = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("role", "user");
      console.log("✅ Values set in AsyncStorage!");
      setStatus("Values Set!");
    } catch (error) {
      console.error("❌ Error setting values:", error);
      setStatus("Failed to Set Values");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Testing AsyncStorage</Text>
      <Text>Status: {status}</Text>
      <Button title="Set Login Data" onPress={setValues} />
    </View>
  );
};

export default DebugScreen;
