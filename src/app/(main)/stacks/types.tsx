import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SalonStackParamList = {
  Home: undefined;
  SalonDetail: { salon: { id: string; name: string; image: string; location: string; rating: number } };
  Appointment: { salon: { id: string; name: string; image: string; location: string; rating: number } };
};

export type SalonDetailScreenProps = NativeStackScreenProps<SalonStackParamList, "SalonDetail">;
