import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyOffersScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome Mark!</Text>
      <Text style={styles.homeText}>My Offers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    position: 'absolute',
    top: 80,
    left: 20, 
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MyOffersScreen;
