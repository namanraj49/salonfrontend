import { View, Text, StyleSheet } from 'react-native';

export default function Loginshop() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      {/* Add your login form or logic here */}
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