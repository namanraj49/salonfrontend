import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ServiceCardProps {
    service:{
        id:string;
  name: string;
  image: string;
    };
  onPress: () => void;
    
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service,onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: service.image }} style={styles.image} />
      <Text style={styles.name}>{service.name}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServiceCard;