import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SalonStackParamList } from "../stacks/types";
import { io } from "socket.io-client";
import dayjs from "dayjs";

type AppointmentRouteProp = RouteProp<SalonStackParamList, "Appointment">;

const socket = io("http://your-backend-url"); // Replace with actual backend URL

export default function AppointmentScreen() {
  const route = useRoute<AppointmentRouteProp>();
  const { salon, customerId } = route.params;

  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState("");

  useEffect(() => {
    // Listen for appointment updates
    socket.on("appointment_update", (data) => {
      if (data.slotId === selectedSlot) {
        setAppointmentStatus(data.status);
        if (data.status === "accepted") {
          Alert.alert("Success", "Your appointment has been confirmed!");
        } else if (data.status === "rejected") {
          Alert.alert("Rejected", "Your appointment request was rejected.");
          setSelectedSlot(null); // Reset selection
        }
      }
    });

    return () => {
      socket.off("appointment_update");
    };
  }, [selectedSlot]);

  // Fetch booked slots for selected date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/booked-slots/${salon._id}?date=${selectedDate}`
        );
        const data = await response.json();
        setBookedSlots(data); // Set booked slots list
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
      setLoading(false);
    };

    fetchBookedSlots();
  }, [selectedDate]);

  // Function to book slot
  const bookSlot = () => {
    if (!selectedSlot) return;
    
    // Emit socket event to book the slot
    socket.emit("bookSlot", {
      slotId: selectedSlot,
      barberId: salon._id, // Assuming salon._id is the barberId
      customerId: customerId,
    });

    Alert.alert("Request Sent", "Waiting for salon confirmation...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      <Text style={styles.salonName}>Salon: {salon.name}</Text>

      {/* Date Selection (Horizontal FlatList) */}
      <FlatList
        data={Array.from({ length: 7 }, (_, index) => dayjs().add(index, "day").format("YYYY-MM-DD"))}
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

      {/* Available Slots */}
      <View style={styles.slotsContainer}>
        <Text style={styles.subtitle}>Available Slots for {dayjs(selectedDate).format("DD MMM")}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={Array.from({ length: 15 }, (_, index) => {
              const hour = 8 + index;
              return `${hour}:00 ${hour < 12 ? "AM" : "PM"}`;
            })}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isBooked = bookedSlots.includes(item);

              return (
                <TouchableOpacity
                  style={[
                    styles.slotButton,
                    isBooked && styles.bookedSlot,
                    selectedSlot === item && styles.selectedSlot,
                  ]}
                  onPress={() => !isBooked && setSelectedSlot(item)}
                  disabled={isBooked}
                >
                  <Text style={[styles.slotText, isBooked && styles.bookedSlotText]}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[styles.proceedButton, (!selectedDate || !selectedSlot) && styles.disabledButton]}
        disabled={!selectedDate || !selectedSlot}
        onPress={bookSlot}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Show Status if Available */}
      {appointmentStatus ? (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
          Appointment Status: {appointmentStatus}
        </Text>
      ) : null}
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
    width: 100,
    height: 70,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },
  selectedDate: { backgroundColor: "#007BFF" },
  dateText: { fontSize: 14, color: "#333" },
  selectedDateText: { color: "#fff", fontWeight: "bold" },
  slotsContainer: { marginTop: 20 },
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
  disabledButton: { backgroundColor: "#ccc" },
  proceedButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
