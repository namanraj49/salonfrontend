import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://172.20.10.3:3000/users/getappointments");
      const data = await response.json();
      console.log("Fetched Appointments:", data);
      setAppointments(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAccept = (id) => {
    console.log(`Appointment ${id} accepted!`);
  };

  const handleReject = (id) => {
    console.log(`Appointment ${id} rejected!`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointments}>No Appointments Available</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>📅 Date: <Text style={styles.value}>{new Date(item.appointmentDate).toDateString()}</Text></Text>
              <Text style={styles.label}>🕒 Time: <Text style={styles.value}>{item.time}</Text></Text>
              <Text style={styles.label}>💇 Service: <Text style={styles.value}>{item.service || "Not specified"}</Text></Text>
              <Text style={styles.label}>👤 Customer: <Text style={styles.value}>{item.customer || "Not available"}</Text></Text>
              <Text style={styles.label}>📌 Status: <Text style={styles.value}>{item.status}</Text></Text>
              <Text style={styles.label}>📝 Notes: <Text style={styles.value}>{item.notes || "No notes"}</Text></Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item._id)}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item._id)}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  noAppointments: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#666" },
  card: { 
    backgroundColor: "white", 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 4 
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#444" },
  value: { fontWeight: "normal", color: "#666" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  acceptButton: { flex: 1, backgroundColor: "#28a745", padding: 10, borderRadius: 5, alignItems: "center", marginRight: 5 },
  rejectButton: { flex: 1, backgroundColor: "#dc3545", padding: 10, borderRadius: 5, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" }
});

export default HomeScreen;
