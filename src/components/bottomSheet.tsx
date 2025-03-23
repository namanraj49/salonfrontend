import React, { useImperativeHandle, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface Slot {
  date: string;
  time: string;
  status: 'Available' | 'Booked' | 'Unavailable';
}

interface SlotBottomSheetProps {
  selectedDate: string;
  slotsData: Slot[];
}
const SlotBottomSheet = forwardRef<BottomSheetMethods, SlotBottomSheetProps>(
    ({ selectedDate, slotsData }, ref) => {
        const bottomSheetRef = useRef<BottomSheetMethods>(null);

        // Expose the ref methods to the parent
        useImperativeHandle(ref, () => ({
            snapToIndex: (index) => bottomSheetRef.current?.snapToIndex(index),
            snapToPosition: (position) => bottomSheetRef.current?.snapToPosition(position),
            collapse: () => bottomSheetRef.current?.collapse(),
            forceClose: () => bottomSheetRef.current?.forceClose(),
            expand: () => bottomSheetRef.current?.expand(),
            close: () => bottomSheetRef.current?.close(),
          }));
        const filteredSlots = slotsData.filter((slot) => slot.date === selectedDate);
    
 
  return (
    <BottomSheet ref={ref} snapPoints={["50%"]} index={-1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Slots for {selectedDate}</Text>
          <TouchableOpacity onPress={() => bottomSheetRef?.current?.close()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        {filteredSlots.length > 0 ? (
          <FlatList
            data={filteredSlots}
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.slot,
                  item.status === "Booked" && styles.booked,
                  item.status === "Unavailable" && styles.unavailable,
                ]}
              >
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noSlotsText}>No slots available for this date</Text>
        )}
      </View>
    </BottomSheet>
  );
}
);

export default SlotBottomSheet;

const styles = StyleSheet.create({
container: { padding: 16 },
header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
title: { fontSize: 18, fontWeight: "bold" },
closeButton: { fontSize: 20, color: "red" },
slot: {
  padding: 12,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 5,
  flexDirection: "row",
  justifyContent: "space-between",
},
booked: { backgroundColor: "lightgray" },
unavailable: { backgroundColor: "#ffcccc" },
time: { fontSize: 16 },
status: { fontSize: 14, color: "gray" },
noSlotsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "red" },
});