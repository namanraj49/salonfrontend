import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../tabs/home";
import SalonDetailScreen from "../screens/salonDetailscreen";
import AppointmentScreen from "../screens/AppointmentScreen";
//import { SalonStackParamList } from "./types";

export type SalonStackParamList = {
    Home: undefined;
    SalonDetail: { salon: { id: string; name: string; image: string; location: string; rating: number } };
    Appointment: { salon: { id: string; name: string; image: string; location: string; rating: number } };
  };

const Stack = createNativeStackNavigator<SalonStackParamList>();

const SalonStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SalonDetail" component={SalonDetailScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Book Appointment" }} />

    </Stack.Navigator>
  );
};

export default SalonStack;
