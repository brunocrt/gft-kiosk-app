import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Image, TouchableOpacity, Easing, Text, StyleSheet } from 'react-native';
import { Circle, Path, G, Svg, Image as SVGImage, Text as SVGText } from 'react-native-svg';

import industries from './assets/industries.png'
import LogosVisible from './LogosVisible';
import offerings from './assets/offerings.png'
import partners from './assets/partners.png'


const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCircle = ({ radius, navigation, onIconPress, activeCircle }) => {
  radius = radius * 1.5;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;
  const [logosVisible, setLogosVisible] = useState(false);
  
  const dashOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  let icons = [];
  let icon_names;
  let angleBetweenIcons;
  let angleOffset;
  const iconSize=80;
  icons = [
    require('./assets/icons/GFT_AWS_Offerings_icon.png'),
    require('./assets/icons/competencies_icon.png'), 
    require('./assets/icons/success_icon.png'), 
    require('./assets/icons/partners_icon.png'), 
    require('./assets/icons/partners_icon.png'), 
    require('./assets/icons/offerings_icon.png'), 
    require('./assets/icons/industries_icon.png'), 
    require('./assets/icons/solutions_icon.png'), 
  ];
  icon_names = [
    {label: 'GFT + AWS\nOfferings', align: 'bottom', xOffset: 0, yOffset: 48, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
    {label: 'Competencies & Credentials', align: 'left', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.75},
    {label: 'GFT + AWS\nSuccess Stories', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
    {label: 'Partners', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
    {label: 'AI.DA Marketplace', align: 'top', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
    {label: 'Offerings', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.8},
    {label: 'Industries', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.7},
    {label: 'GFT + AWS Solutions', align: 'right', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.7},
  ];
  angleBetweenIcons = (360 / icons.length) * (Math.PI / 180); // Angle between icons in radians
  angleOffset = -angleBetweenIcons / 2 * 4;  // Offset in radians (positive or negative value)
 

  const animatedIcons = icons.map(() => useRef(new Animated.Value(0)).current);

  const duration=1600;
  const strokeWidth=20;

    // Define the button source and stroke color depending on buttonPressed parameter being 0, 1, 2
    let buttonSource, strokeColor;
  
    strokeColor = 'gray';
  
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0


    const handleIconPress = (index) => {
      
        if (index === 4) {
          
          navigation.navigate('AI_DA');
        }
        if (onIconPress) {
          onIconPress(index);
        }
      console.log('Button Pressed:', index);
    };
    
    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.cubic),
      }).start();
  
      animatedIcons.forEach((animatedIcon, index) => {
        Animated.timing(animatedIcon, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }).start();
      });

      Animated.timing(fadeAnim, {
        delay: 900,
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      
    }, []);

    const xOffset = 0;  // Adjust as needed (positive or negative value)
    const yOffset = 0;  // Adjust as needed (positive or negative value)
    

    

  const svgWidth = (radius + strokeWidth) * 2;
  const svgHeight = (radius + strokeWidth) * 2;
  
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  
  const start = {
    x: centerX - iconSize / 2,
    y: centerY - radius - iconSize / 2,
  };


  const centerFadeAnim = useRef([new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]).current;


  return (
    <View style={styles.wrapper}>
    {logosVisible && <LogosVisible startAnimation={true} />}

    {/* Center Button */}
      {/* <Animated.Image
      source={buttonSource} 
      style={[
          styles.button,
          {
              opacity: centerFadeAnim[0],
          },
      ]} /> */}

    {/* Animated Circle */}

      <View style={{ width: svgWidth, height: svgHeight, position: 'relative' }}>
      <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2} viewBox={`0 0 ${2 * (radius + strokeWidth)} ${2 * (radius + strokeWidth)}`}>
        <G rotation="0" origin={`${(radius + strokeWidth)}, ${(radius + strokeWidth)}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
          />
          <AnimatedPath
            d={`M ${(radius + strokeWidth)} ${(radius + strokeWidth)} m 0,-${radius} a ${radius},${radius} 0 1,1 0,${2 * radius} a ${radius},${radius} 0 1,1 0,-${2 * radius}`}
            fill="transparent"
            strokeWidth={strokeWidth}
            stroke={strokeColor}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
          </G>
        </Svg>
        


        {icons.map((icon, index) => {
          const angle = (index * 2 * Math.PI) / icons.length + angleOffset;
          const x = centerX + (radius * Math.cos(angle)) - (iconSize / 2) + xOffset;
          const y = centerY + (radius * Math.sin(angle)) - (iconSize / 2) + yOffset;

              // Additional offset for text to appear outside the icons
          const textXOffset = icon_names[index].xOffset;  // Adjust this value as needed
          const textYOffset = icon_names[index].yOffset;  // Adjust this value as needed
          const textX = x + (radius/1.7 * Math.cos(angle)) + textXOffset;
          const textY = y + (radius/1.7 * Math.sin(angle)) + textYOffset;

          let textAlignmentStyle = {};
    
          switch (icon_names[index].align) {
            case 'left':
              textAlignmentStyle = {
                textAlign: 'left',
                left: 0,
              };
              break;
            case 'right':
              textAlignmentStyle = {
                textAlign: 'right',
                right: 0,
              };
              break;
            case 'top':
              textAlignmentStyle = {
                textAlign: 'center',
                textAlignVertical: 'top',
                top: 0,
              };
              break;
            case 'bottom':
              textAlignmentStyle = {
                textAlign: 'center',
                textAlignVertical: 'bottom',
                bottom: 0,
              };
              break;
            default:
              textAlignmentStyle = {
                textAlign: 'center',
              };
          }

          let top, left;

          if (icon_names[index].align === 'left') {
            top = y;
            left = x + iconSize;
          } else if (icon_names[index].align === 'right') {
            top = y ;
            left = x - iconSize;
          } else if (icon_names[index].align === 'top') {
            top = y + iconSize;
            left = x;
          } else if (icon_names[index].align === 'bottom') {
            top = y - iconSize;
            left = x;
          }
          return (
            <>
              <TouchableOpacity key={index} style={{ position: 'absolute', top: y, left: x, zIndex: 99 }} onPress={() => handleIconPress(index)}>
                <View style={{
                  width: iconSize,
                  height: iconSize,
                  backgroundColor: icon_names[index].color, 
                  borderRadius: iconSize / 2,
                  borderWidth: 1,
                  borderColor: 'black',
                  zIndex: 99,
                  justifyContent: 'center',
                  alignItems: 'center',
                }} >
                  <View style={{
                    width: iconSize * 0.75,
                    height: iconSize * 0.75,
                    backgroundColor: 'transparent',
                    borderRadius: iconSize * 0.75 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Animated.Image
                      style={{ 
                        width: '100%',
                        height: '100%',
                      }}
                      source={icon}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                 {/* Box */}
                 <View style={{ 
                  position: 'absolute', 
                  top: top,
                  left: left, 
                  width: iconSize, 
                  height: iconSize, 
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  }}>
                <Text style={
                  { 
                    flex: 1,
                    position: 'absolute', 
                    color: icon_names[index].textColor, 
                    fontSize: 18,
                    width: iconSize * 2.75,
                    // Height is two line spaces worth
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    font: 'Arial',
                    padding: 10,
                    ...textAlignmentStyle
                  }
                }>
                  {icon_names[index].label}
                </Text>              
                </View>
              </Animated.View>

            </>
          );
        })}

      </View>
    </View>
  );

};
const styles = {
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
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
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      zIndex: 5,
  }
};

export default AnimatedCircle;
