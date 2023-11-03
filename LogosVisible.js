import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import PartnerLogos from './assets/logos/partners_grouped_logos.png';

const width = 1300;
const height = 800;

const LogosVisible = ({ startAnimation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    if (startAnimation) {
      Animated.timing(
        fadeAnim,
        {
          delay: 500,
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [startAnimation]);

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Image 
        source={PartnerLogos}  // Update the path to your image
        style={styles.logo}
        resizeMode='contain'
      />
    </Animated.View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
  logo: {        
    alignItems: 'center',
    justifyContent: 'center',
    width: 1400,
    height: 1000,
  }
};

export default LogosVisible;