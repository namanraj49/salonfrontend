import React, { useState, useEffect } from "react";
import { 
    View, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
    Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceCard from "../components/serviceCard";
import SalonCard from "../components/salonCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SalonStackParamList } from "../stacks/types";

// ✅ Fix local image import
const defaultSalonImage = require("../../../assets/images/Salonimage.png");


type HomeScreenNavigationProp = NativeStackNavigationProp<SalonStackParamList, "Home">;

const services = [
    { id: "1", name: "Haircut", image: "https://example.com/haircut.jpg" },
    { id: "2", name: "Facial", image: "https://example.com/facial.jpg" },
    { id: "3", name: "Massage", image: "https://example.com/massage.jpg" },
];

type Salon = {
    shop: any;
    _id: string;
   // id: string;
    name: string;
    address: string;
    image: string;
    // Add any other fields returned from your backend
  };
  
const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch salons from backend
    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/getAllSalons");
                
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received from server");
                }

                setSalons(data);
            } catch (error) {
                console.error("Error fetching salons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalons();
    }, []);

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for salons or services"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                        <Ionicons name="close" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Services List */}
            <FlatList 
                data={services}
                keyExtractor={(item) => item.id}
                horizontal
                renderItem={({ item }) => (
                    <ServiceCard 
                        service={item} 
                        onPress={() => console.log(`Selected: ${item.name}`)} 
                    />
                )}
                contentContainerStyle={styles.serviceList}
            />

            {/* Show Loading Indicator */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
                <FlatList
                    data={salons}
                    keyExtractor={(item) => item._id} // Use MongoDB _id
                    horizontal
                    renderItem={({ item }) => {
                        console.log("Salon Image URL:", item.shop.shopImage); // ✅ Debug Image URL

                        return (
                            <SalonCard
                                salon={{
                                    id: item._id, 
                                    name: item.shop.shopName,
                                    image: item.shop.shopImage && item.shop.shopImage.startsWith("http") 
                                        ? { uri: item.shop.shopImage } // ✅ Online Image
                                        : defaultSalonImage, // ✅ Local Image
                                    location: item.shop.address,
                                    rating: 4.5, 
                                }}
                                onPress={() => navigation.navigate("SalonDetail", {
                                    salon: {
                                        id: item._id, 
                                        name: item.shop.shopName,
                                        image: item.shop.shopImage && item.shop.shopImage.startsWith("http") 
                                            ? { uri: item.shop.shopImage } 
                                            : defaultSalonImage, 
                                        location: item.shop.address,
                                        rating: 4.5, 
                                    }
                                })}
                                
                            />
                        );
                    }}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    serviceList: {
        marginTop: 16,
    },
    listContainer: {
        paddingVertical: 10,
    },
    loading: {
        marginTop: 20,
    }
});

export default HomeScreen;
