import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      
      {/* Register as User Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/registeruser')}
      >
        <Text style={styles.buttonText}>Register as User</Text>
      </TouchableOpacity>

      {/* Login as User Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/loginuser')}
      >
        <Text style={styles.buttonText}>Login as User</Text>
      </TouchableOpacity>

      {/* Register as Shop Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/registershop')}
      >
        <Text style={styles.buttonText}>Register as Shop</Text>
      </TouchableOpacity>

      {/* Login as Shop Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/loginshop')}
      >
        <Text style={styles.buttonText}>Login as Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});