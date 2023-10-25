import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

// StackNavigator: When user taps a link, a new screen is put on top of old screens.

// TabNavigator: User navigates to different screens by tapping on tabs along the top or bottom of the screen.

// DrawerNavigator: A slide-out ‘drawer’ contains links to different screens.

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.circleButton, styles.circleButton1]} onPress={() => animateButton()} />
        <TouchableOpacity style={[styles.circleButton, styles.circleButton2]} />
        <TouchableOpacity style={[styles.circleButton, styles.circleButton3]} />
      </View>
    </View>
  );
}

// When user taps a button, the button should be animated to grow 1.5x its size and slide itself to the center of the screen while the other buttons shrink to 0.5x their size and slide themselves to the edges of the screen. This function will be called on the "onPress" event of the button.
function animateButton() {
  Animated.parallel([
    Animated.timing(scale, {
      toValue: 1.5,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
  ]).start();

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  circleButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginHorizontal: 100,  // Adjust this value to control spacing between the circles
  },
  circleButton1: {
    backgroundColor: '#ADD8E6',
  },
  circleButton2: {
    backgroundColor: '#00BFFF',
  },
  circleButton3: {
    backgroundColor: '#0000FF',
  },
});
