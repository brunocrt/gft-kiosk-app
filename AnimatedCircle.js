import React, { useEffect, useRef } from 'react';
import { View, Animated, Image, TouchableOpacity, Easing, Text } from 'react-native';
import { Circle, Path, G, Svg, Image as SVGImage, Text as SVGText } from 'react-native-svg';
import LogosVisible from './LogosVisible';

import offerings_icon1 from './assets/icons/collaboration_icon.png';
import offerings_icon2 from './assets/icons/automation_icon.png';
import offerings_icon3 from './assets/icons/digital_assets_icon.png';
import offerings_icon4 from './assets/icons/customer_centricity_icon.png';
import offerings_icon5 from './assets/icons/game_changers_icon.png';
import offerings_icon6 from './assets/icons/cloud_engineering_icon.png';
import offerings_icon7 from './assets/icons/platform_engineering_icon.png';
import offerings_icon8 from './assets/icons/data_engineering_icon.png';
import offerings_icon9 from './assets/icons/regulatory_risks_icon.png';
import offerings_icon10 from './assets/icons/business_it_consulting_icon.png';

import industries_icon1 from './assets/icons/cooperatives_icon.png';
import industries_icon2 from './assets/icons/telecom_icon.png';
import industries_icon3 from './assets/icons/health_icon.png';
import industries_icon4 from './assets/icons/retail_icon.png';
import industries_icon5 from './assets/icons/utilities_icon.png';
import industries_icon6 from './assets/icons/financial_services_icon.png';
import industries_icon7 from './assets/icons/payment_methods_icon.png';
import industries_icon8 from './assets/icons/government_icon.png';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCircle = ({ radius, buttonPressed, navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  let icons = [];
  let icon_names;
  let angleBetweenIcons;
  let angleOffset;
  const iconSize=100;
  // const icon_colors = [
  //   '#FF5733', '#33FF57', '#5733FF', // ... and so on for each icon
  // ];
  if (buttonPressed === 0) {
    icons = [offerings_icon1, offerings_icon2, offerings_icon3, offerings_icon4, offerings_icon5, offerings_icon6, offerings_icon7, offerings_icon8, offerings_icon9, offerings_icon10];
    icon_names = [
      'Collaboration', 'Automation', 'Digital Assets', 'Customer Centricity', 'Game Changers', 
      'Cloud Engineering', 'Platform Engineering', 'Data Engineering', 'Regulatory & Risks', 'Business & IT Consulting'
      ];
      angleBetweenIcons = (360 / icons.length) * (Math.PI / 180); // Angle between icons in radians
      angleOffset = -angleBetweenIcons / 2 * 7;  // Offset in radians (positive or negative value)
  }else if (buttonPressed === 2){
    icons = [industries_icon1, industries_icon2, industries_icon3, industries_icon4, industries_icon5, industries_icon6, industries_icon7, industries_icon8];
    icon_names = [
      'Cooperatives', 'Telecom', 'Health', 'Retail', 
      'Utilities', 'Financial Services', 'Payment Methods', 'Government'
      ];
      angleBetweenIcons = (360 / icons.length) * (Math.PI / 180); // Angle between icons in radians
      angleOffset = -angleBetweenIcons * 2;  // Offset in radians (positive or negative value)
  }

  const animatedIcons = icons.map(() => useRef(new Animated.Value(0)).current);

  const duration=1600;
  const strokeWidth=32;

    // Define the stroke color depending on buttonPressed parameter being 0, 1, 2
    let strokeColor;
    switch (buttonPressed) {
      case 0:
        strokeColor = 'gray';
        break;
      case 1:
        strokeColor = 'transparent';
        break;
      case 2:
        strokeColor = 'pink';
        break;
      default:
        strokeColor = 'black';
    }



    const handleIconPress = (index) => {
      let initial_screen = icon_names[index];
      if (buttonPressed === 0) {
        navigation.navigate('Offerings', { initial_screen: initial_screen });
      }else if (buttonPressed === 2){
        navigation.navigate('Industries', { initial_screen: initial_screen });
      }
      console.log('Button Pressed:', initial_screen);
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


  return (
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
      {/* <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {buttonPressed === 1 && <LogosVisible startAnimation={true} />}
      </View> */}


      {buttonPressed !== 1 && icons.map((icon, index) => {
        const angle = (index * 2 * Math.PI) / icons.length + angleOffset;
        const x = centerX + (radius * Math.cos(angle)) - (iconSize / 2) + xOffset;
        const y = centerY + (radius * Math.sin(angle)) - (iconSize / 2) + yOffset;

            // Additional offset for text to appear outside the icons
        const textXOffset = 160;  // Adjust this value as needed
        const textYOffset = 110;  // Adjust this value as needed
        const textX = x + (textXOffset * Math.cos(angle));
        const textY = y + (textYOffset * Math.sin(angle));

        return (
          <>
            <TouchableOpacity key={index} style={{ position: 'absolute', top: y, left: x }} onPress={() => handleIconPress(index)}>
              <Animated.Image
                style={{ width: iconSize, height: iconSize }}
                source={icon}
              />
            </TouchableOpacity>
            {/* <Text style={
              { 
                position: 'absolute', 
                top: textY, 
                left: textX, 
                color: index < icons.length/2 ? 'pink' : 'blue', 
                fontSize: 20,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }
            }>
              {icon_names[index]}
            </Text> */}
          </>
        );
      })}
    </View>
  );
};

export default AnimatedCircle;
