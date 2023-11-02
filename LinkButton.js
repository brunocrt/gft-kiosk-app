import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';

const LinkButton = ({ text, url, buttonStyle, textStyle }) => {
  const handlePress = () => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={handlePress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LinkButton;
