// AI.js
import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationButtons from './NavigationButtons';

const images = [
    require('./assets/AI_Content/Slide1.PNG'),
    require('./assets/AI_Content/Slide2.PNG'),
    require('./assets/AI_Content/Slide3.PNG'),
    require('./assets/AI_Content/Slide4.PNG'),
    require('./assets/AI_Content/Slide5.PNG'),
    require('./assets/AI_Content/Slide6.PNG'),
    require('./assets/AI_Content/Slide7.PNG'),
    require('./assets/AI_Content/Slide8.PNG'),
    require('./assets/AI_Content/Slide9.PNG'),
    require('./assets/AI_Content/Slide10.PNG'),
];

const AI = ( route, navigation ) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(navigation)

  const handlePress = () => {
    const url = 'https://www.gft.com/us/en/services/enterprise-ai-and-data/gft-ai-da-marketplace#video'; // Replace with your URL
    if (Platform.OS === 'ios') {
      // WebView implementation or similar for iOS
      console.warn('WebView to be implemented for iOS');
    } else {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  const changeSubCategory = (direction) => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + direction;
      // Ensure the next index is within the valid range
      if (nextIndex < 0) {
        return 0; // Stay at the first image
      } else if (nextIndex >= images.length) {
        return images.length - 1; // Stay at the last image
      }
      return nextIndex;
    });
  };
  

  return (
    <View style={styles.container}>
      <Image source={images[currentIndex]} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[styles.arrowButton, styles.leftArrow]}
          onPress={() => changeSubCategory(-1)}
        >
          <Text style={styles.arrowButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, styles.rightArrow]}
          onPress={() => changeSubCategory(1)}
        >
          <Text style={styles.arrowButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Open Link</Text>
      </TouchableOpacity>
        <View style={styles.bottomButtons}>
            <NavigationButtons navigation={navigation} />
        </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  leftArrow: {
    // additional styling for left arrow if needed
  },
  rightArrow: {
    // additional styling for right arrow if needed
  },
  arrowButtonText: {
    fontSize: 24,
    color: 'black',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    // Styles for the open link button
  },
  buttonText: {
    // Styles for the text inside the open link button
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
});

export default AI;