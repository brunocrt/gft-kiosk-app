import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import logos from './logos';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LogosVisible = ({ startAnimation, circleSize }) => {
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


    const logoCount = logos.length;
    const angleStep = 2 * Math.PI / logoCount;
  
    const innerEllipseWidth = circleSize;
    const innerEllipseHeight = innerEllipseWidth;
    const outerEllipseWidth = innerEllipseWidth * 1.5;
    const outerEllipseHeight = innerEllipseHeight * 1.1;

    const innerEllipseRadiusX = innerEllipseWidth / 2;
    const innerEllipseRadiusY = innerEllipseHeight / 2;
    const outerEllipseRadiusX = outerEllipseWidth / 2;
    const outerEllipseRadiusY = outerEllipseHeight / 2;
  
    const [logoPositions, setLogoPositions] = useState([]);
  
    useEffect(() => {
      const newLogoPositions = logos.map((logo, index) => {
        const angle = index * angleStep;
        const ring = index % (logoCount / 2); // Change this value to adjust the number of rings
        const radiusX = innerEllipseRadiusX + ring * (outerEllipseRadiusX - innerEllipseRadiusX) / (logoCount / 2);
        const radiusY = innerEllipseRadiusY + ring * (outerEllipseRadiusY - innerEllipseRadiusY) / (logoCount / 2);
        return {
          translateX: radiusX * Math.cos(angle),
          translateY: radiusY * Math.sin(angle),
          width: 0,
          height: 0,
          scale: 1,
        };
      });
      setLogoPositions(newLogoPositions);
    }, []);
  
    const [imagesLoaded, setImagesLoaded] = useState(Array(logos.length).fill(false));

    const handleImageLoad = (index, event) => {
      if (event.nativeEvent && event.nativeEvent.source) {
        const { width, height } = event.nativeEvent.source;
        const maxDimension = Math.max(width, height);
        const scaleFactor = outerEllipseRadiusX / maxDimension; // Change this value to adjust the scale factor
        setLogoPositions(prevLogoPositions => {
          const newLogoPositions = [...prevLogoPositions];
          newLogoPositions[index].translateX -= width / 2 * scaleFactor;
          newLogoPositions[index].translateY -= height / 2 * scaleFactor;
          newLogoPositions[index].width = width;
          newLogoPositions[index].height = height;
          newLogoPositions[index].scale = scaleFactor;
          return newLogoPositions;
        });
        setImagesLoaded(prevImagesLoaded => {
          const newImagesLoaded = [...prevImagesLoaded];
          newImagesLoaded[index] = true;
          return newImagesLoaded;
        });
      }
    };
  
    if (imagesLoaded.some(loaded => !loaded)) {
      return null; // or a loading spinner
    }
  
  
    return (
        <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
          <View style={styles.logosContainer}>
            {logos.map((logo, index) => {
              const logoStyle = {
                ...styles.logo,
                width: logoPositions[index]?.width || 0,
                height: logoPositions[index]?.height || 0,
                transform: [
                  { translateX: logoPositions[index]?.translateX || 0 },
                  { translateY: logoPositions[index]?.translateY || 0 },
                  { scale: logoPositions[index]?.scale || 1 },
                ],
              };
              return (
                <Image 
                  key={index}
                  source={logo}
                  style={logoStyle}
                  resizeMode='contain'
                  onLoad={event => handleImageLoad(index, event)}
                />
              );
            })}
            <View style={{...styles.ellipse, width: innerEllipseWidth, height: innerEllipseHeight}} />
            <View style={{...styles.ellipse, width: outerEllipseWidth, height: outerEllipseHeight}} />
          </View>
          <View style={{...styles.circle, width: circleSize, height: circleSize}} />
        </Animated.View>
      );
    };
    
  
  const styles = {
    container: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', 
      height: '100%',
    },
    logosContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {        
      position: 'absolute',
      margin: 5, // Adjust this value to add space between the logos
      borderColor: 'blue',
      borderWidth: 2,
    },
    ellipse: {
      position: 'absolute',
      borderRadius: 9999,
      backgroundColor: 'transparent',
      borderColor: 'red',
      borderWidth: 2,
    },
    circle: {
      position: 'absolute',
      borderRadius: 9999,
      backgroundColor: 'transparent',
      borderColor: '#red',
      borderWidth: 2,
    },
  };
  
  export default LogosVisible;