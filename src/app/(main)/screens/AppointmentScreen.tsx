import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SalonStackParamList } from "../stacks/types";
import dayjs from "dayjs";

type AppointmentRouteProp = RouteProp<SalonStackParamList, "Appointment">;

export default function AppointmentScreen() {
  const route = useRoute<AppointmentRouteProp>();
  const { salon } = route.params;

  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, index) =>
    dayjs().add(index, "day").format("YYYY-MM-DD")
  );

  // Generate hourly slots from 8 AM to 10 PM
  const slots = Array.from({ length: 15 }, (_, index) => {
    const hour = 8 + index;
    return {
      time: `${hour}:00 ${hour < 12 ? "AM" : "PM"}`,
      status: Math.random() > 0.7 ? "Booked" : "Available", // Random status
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      <Text style={styles.salonName}>Salon: {salon.name}</Text>

      {/* Date Selection (Horizontal FlatList) */}
      <FlatList
        data={dates}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dateButton, selectedDate === item && styles.selectedDate]}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={[styles.dateText, selectedDate === item && styles.selectedDateText]}>
              {dayjs(item).format("DD MMM")}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Available Slots for the Selected Date */}
      <View style={styles.slotsContainer}>
        <Text style={styles.subtitle}>Available Slots for {dayjs(selectedDate).format("DD MMM")}</Text>
        <FlatList
          data={slots}
          numColumns={3}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.slotButton, 
                item.status === "Booked" && styles.bookedSlot,
                selectedSlot === item.time && styles.selectedSlot
              ]}
              onPress={() => item.status === "Available" && setSelectedSlot(item.time)}
              disabled={item.status !== "Available"}
            >
              <Text style={[styles.slotText, item.status === "Booked" && styles.bookedSlotText]}>
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

            {/* Proceed Button */}
            <TouchableOpacity
        style={[styles.proceedButton, (!selectedDate || !selectedSlot) && styles.disabledButton]}
        disabled={!selectedDate || !selectedSlot}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  salonName: { fontSize: 16, fontWeight: "500", marginBottom: 15 },
  dateList: { flexDirection: "row", paddingVertical: 10 },
  dateButton: {
    backgroundColor: "#f0f0f0",
    width: 100, // Square shape
    height: 70, // Square shape
    borderRadius: 8,  // Slightly rounded edges
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,  // Space between squares
  },
  selectedDate: { backgroundColor: "#007BFF" },
  dateText: { fontSize: 14, color: "#333" },
  selectedDateText: { color: "#fff", fontWeight: "bold" },
  slotsContainer: { marginTop: 20,width:910 },
  subtitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  slotButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  selectedSlot: { backgroundColor: "#007BFF" },
  slotText: { fontSize: 14, color: "#333" },
  bookedSlot: { backgroundColor: "#d3d3d3" },
  bookedSlotText: { color: "#888" },
  proceedButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
