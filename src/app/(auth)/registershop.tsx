import { View, Text, StyleSheet } from 'react-native';

export default function RegisterShopScreen() {
  return (
    <View style={styles.container}>
      <Text>Register as Shop Screen</Text>
      {/* Add your registration form or logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});