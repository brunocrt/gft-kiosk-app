// ImageScreen.js

import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AI_DA = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/AI_Content/AI_DA_bg.png')} // Replace with your image URL
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AI')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to AI Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    right: 40,
    bottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default AI_DA;
