import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Animated, Text, TouchableOpacity } from 'react-native';

const LogosVisible = ({ radius, buttonPressed }) => {
  let icon_names;
  let angleBetweenIcons;
  let angleOffset;

  let icon_angles = [];

  if (buttonPressed === 0) {
    icon_names = [
      'Collaboration',
      'Automation',
      'Digital Assets',
      'Customer Centricity',
      'Game Changers',
      'Cloud Engineering',
      'Platform Engineering',
      'Data Engineering',
      'Regulatory & Risks',
      'Business & IT Consulting',
    ];
    angleBetweenIcons = (360 / icon_names.length) * (Math.PI / 180);
    angleOffset = -angleBetweenIcons / 2 * 7;
    icon_angles = icon_names.map((icon_name, index) => {
        return ((index * 2 * Math.PI) / icon_names.length + angleOffset);
    });
    console.log(icon_angles);
  } else if (buttonPressed === 2) {
    icon_names = [
      'Cooperatives',
      'Telecom',
      'Health',
      'Retail',
      'Utilities',
      'Financial Services',
      'Payment Methods',
      'Government',
    ];
    angleBetweenIcons = (360 / icon_names.length) * (Math.PI / 180);
    angleOffset = -angleBetweenIcons * 2;
  }

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      delay: 500,
      toValue: 1,
      duration: 1000,
    }).start();
  }, []);

  const strokeWidth = 32;
  const svgWidth = (radius + strokeWidth) * 2;
  const svgHeight = (radius + strokeWidth) * 2;

  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  const xOffset = 0;
  const yOffset = 0;

  return (
    <View style={styles.wrapper}>
        <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
            
            <Text style={styles.label}>TEST</Text>
        {buttonPressed !== 1 &&
            icon_names.map((icon_name, index) => {
            const angle = (index * angleBetweenIcons) + angleOffset;
            const x = centerX + (radius * Math.cos(icon_angles[index]));
            const y = centerY + (radius * Math.sin(icon_angles[index]));

            const textXOffset = 0; // Adjust as needed
            const textYOffset = 0; // Adjust as needed

            const textX = x + (textXOffset * Math.cos(angle));
            const textY = y + (textYOffset * Math.sin(angle));

            return (
                <Text style={{...styles.label, top: textY, left: textX}}>
                    {icon_name.label}
                </Text>
            );
            })}
        </Animated.View>
    </View>
  );
};

const styles = {
    wrapper: {
        position: 'absolute', 
        width: '50%', 
        height: '90%', 
        borderWidth: 1, 
        borderColor: 'red' 
    },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'blue',
  },
  label: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'green',
    zIndex: 99,
  },
};

export default LogosVisible;
