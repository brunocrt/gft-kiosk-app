import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Image, TouchableOpacity, Easing, Text, StyleSheet, Linking } from 'react-native';
import { Circle, Path, G, Svg, Image as SVGImage, Text as SVGText } from 'react-native-svg';

import industries from './assets/industries.png'
import industries_inverted from './assets/industries_inverted.png'
import offerings from './assets/offerings.png'
import partners from './assets/partners.png'

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
import industries_icon2 from './assets/icons/capital_markets_icon.png';
import industries_icon3 from './assets/icons/banking_icon.png';
import industries_icon4 from './assets/icons/insurance_icon.png';
import industries_icon5 from './assets/icons/manufacturing_icon.png';
import industries_icon6 from './assets/icons/telecom_icon.png';
import industries_icon7 from './assets/icons/health_icon.png';
import industries_icon8 from './assets/icons/retail_icon.png';
import industries_icon9 from './assets/icons/utilities_icon.png';
import industries_icon10 from './assets/icons/financial_services_icon.png';
import industries_icon11 from './assets/icons/payment_methods_icon.png';
import industries_icon12 from './assets/icons/government_icon.png';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCircle = ({ radius, buttonPressed, navigation, onIconPress, activeCircle }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;


  
  const dashOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  let icons = [];
  let icon_names;
  let urls = [];
  let angleBetweenIcons;
  let angleOffset, angleModifier;
  const iconSize=100;

  switch (buttonPressed) {
    case 0: // GFT + AWS Offerings
      urls = [
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Application-and-Mainframe-Modernisation",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Open-API-Framework",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-DevOps",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Data-transformation",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Cloud-migration",
        "https://www.gft.com/us/en/solutions/SOLUTIONS/HPC"
      ];

      icons = [
        require('./assets/icons/migration_icon.png'), 
        require('./assets/icons/devops_icon.png'), 
        require('./assets/icons/financial_services_icon.png'), 
        require('./assets/icons/security_icon.png'), 
        require('./assets/icons/security_icon.png'), 
        require('./assets/icons/security_icon.png'), 
      ];
      icon_names = [
        {label: 'Modernization', align: 'bottom', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Open API\nFramework', align: 'left', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'DevOps', align: 'left', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Data Transformation', align: 'top', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.9},
        {label: 'Cloud Migration', align: 'right', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.9},
        {label: 'High Performance\nComputing', align: 'right', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.9},
      ];
        angleModifier = 1.5;
      break;
    case 1: // Competencies
      urls = [
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Cloud-migration",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-DevOps",
        "https://www.gft.com/us/en/services/banking",
        "https://www.google.com",
        "https://www.gft.com/us/en/solutions/competency-service-delivery/aws-windows",
        "https://www.gft.com/us/en/solutions/competency-service-delivery/aws-elastic-kubernetes-service",
        "https://www.gft.com/us/en/solutions/competency-service-delivery/aws-relational-database-service-delivery",
        "https://www.gft.com/us/en/solutions/competency-service-delivery/aws-lambda"
      ];
      icons = [
        require('./assets/icons/migration_icon.png'), 
        require('./assets/icons/devops_icon.png'), 
        require('./assets/icons/financial_services_icon.png'), 
        require('./assets/icons/security_icon.png'), 
        require('./assets/icons/ec2_icon.png'), 
        require('./assets/icons/eks_icon.png'), 
        require('./assets/icons/rds_icon.png'),
        require('./assets/icons/lambda_icon.png')
      ];
      icon_names = [
        {label: 'Migration\nConsulting', align: 'bottom', xOffset: -24, yOffset: 70, color: '#0097D9', textColor: '#0097D9', scale: 0.8},
        {label: 'DevOps\nConsulting', align: 'left', xOffset: -10, yOffset: 70, color: '#0097D9', textColor: '#0097D9', scale: 0.75},
        {label: 'Financial Services\nConsulting', align: 'left', xOffset: -40, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.7},
        {label: 'Security\nCompetiency', align: 'left', xOffset: 0, yOffset: -40, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Amazon EC2 for Win Server', align: 'top', xOffset: -120, yOffset: -40, color: '#B02A87', textColor: '#B02A87', scale: 0.7},
        {label: 'Amazon EKS\nDelivery', align: 'right', xOffset: -60, yOffset: -40, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Amazon RDS\nDelivery', align: 'right', xOffset: -20, yOffset: 20, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'AWS Lambda\nDelivery', align: 'right', xOffset: -50, yOffset: 70, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
      ];
      angleModifier = 2;  // Offset in radians (positive or negative value)
      break;
    case 2: // Success Stories
      icons = [
        require('./assets/icons/migration_icon.png'), 
        require('./assets/icons/devops_icon.png'), 
        require('./assets/icons/financial_services_icon.png'), 
        require('./assets/icons/security_icon.png'), 
        require('./assets/icons/security_icon.png'), 
      ];
      icon_names = [
        {label: 'Capital Markets', align: 'bottom', xOffset: -45, yOffset: 90, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Banks', align: 'left', xOffset: -45, yOffset: 60, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Insurance', align: 'top', xOffset: 30, yOffset: -45, color: '#B02A87', textColor: '#B02A87', scale: 0.9},
        {label: 'Manufacturing', align: 'top', xOffset: -120, yOffset: -45, color: '#B02A87', textColor: '#B02A87', scale: 0.9},
        {label: 'Other\nIndustries', align: 'right', xOffset: 0, yOffset: 45, color: '#B02A87', textColor: '#B02A87', scale: 0.9},
      ];
      angleModifier = 1.25;
      break;
    case 3: // Partners
      break;
    case 4: // Offerings
      icons = [
        offerings_icon1, 
        offerings_icon2, 
        offerings_icon3, 
        offerings_icon4, 
        offerings_icon5, 
        offerings_icon6, 
        offerings_icon7, 
        offerings_icon8, 
        offerings_icon9, 
        offerings_icon10
      ];
      icon_names = [
        {label: 'Collaboration', align: 'right', xOffset: -140, yOffset: 124, color: '#B02A87', textColor: '#B02A87', scale: 0.9},
        {label: 'Automation', align: 'bottom', xOffset: -30, yOffset: 80, color: '#B02A87', textColor: '#B02A87', scale: 0.8},
        {label: 'Digital\nAssets', align: 'left', xOffset: 40, yOffset: 110, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Customer\nCentricity', align: 'left', xOffset: -10, yOffset: 60, color: '#B02A87', textColor: '#B02A87', scale: 0.7},
        {label: 'Game\nChangers', align: 'left', xOffset: -10, yOffset: -20, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Cloud\nEngineering', align: 'left', xOffset: 36, yOffset: -50, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Platform\nEngineering', align: 'top', xOffset: -30, yOffset: -30, color: '#0097D9', textColor: '#0097D9', scale: 0.8},
        {label: 'Data\nEngineering', align: 'right', xOffset: -100, yOffset: -50, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Regulatory\n& Risks', align: 'right', xOffset: -50, yOffset: -20, color: '#0097D9', textColor: '#0097D9', scale: 0.7},
        {label: 'Business & IT\nConsulting', align: 'right', xOffset: -60, yOffset: 60, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
      ];
      angleModifier = 3.5;
      break;
    case 5: // Industries
      icons = [
        industries_icon1, 
        industries_icon2, 
        industries_icon3, 
        industries_icon4, 
        industries_icon5, 
        industries_icon6, 
        industries_icon7, 
        industries_icon8,
        industries_icon9,
        industries_icon10,
        industries_icon11,
        industries_icon12,
      ];
      icon_names = [
        {label: 'Cooperatives', align: 'bottom', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.85},
        {label: 'Capital Markets', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.85},
        {label: 'Banking', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Insurance', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Manufacturing', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Telecom', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Health', align: 'top', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Retail', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.8},
        {label: 'Utilities', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.8},
        {label: 'Financial\nServices', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Payment\nMethods', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
        {label: 'Government', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: 'white', scale: 0.9},
      ];
      angleModifier = 3;
      break;
    case 6: // Solutions
      urls = [
        "https://www.gft.com/us/en/solutions/SOLUTIONS/BankLiteX",
        "https://www.gft.com/us/en/solutions/SOLUTIONS/BankStart",
        "https://www.gft.com/us/en/solutions/OFFERINGS/AWS-Open-API-Framework"
      ];
      icons = [
        require('./assets/icons/migration_icon.png'), 
        require('./assets/icons/devops_icon.png'), 
        require('./assets/icons/financial_services_icon.png'), 
      ];
      icon_names = [
        {label: 'BankLiteX', align: 'bottom', xOffset: -12, yOffset: 108, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'BankStart', align: 'left', xOffset: -24, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Open API\nFramework', align: 'right', xOffset: -24, yOffset: -18, color: '#0097D9', textColor: '#0097D9', scale: 0.9},
      ];
        angleModifier = .75;
      break;
    default:
      icons = [
        require('./assets/icons/GFT_AWS_Offerings_icon.png'),
        require('./assets/icons/competencies_icon.png'), 
        require('./assets/icons/success_icon.png'), 
        require('./assets/icons/partners_icon.png'), 
        require('./assets/icons/offerings_icon.png'), 
        require('./assets/icons/industries_icon.png'), 
        require('./assets/icons/solutions_icon.png'), 
      ];
      icon_names = [
        {label: 'GFT + AWS\nOfferings', align: 'bottom', xOffset: 0, yOffset: 48, color: '#0097D9', textColor: '#0097D9', scale: 0.85},
        {label: 'Competencies & Credentials', align: 'left', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.75},
        {label: 'GFT + AWS\nSuccess Stories', align: 'left', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Partners', align: 'top', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.85},
        {label: 'Offerings', align: 'top', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.8},
        {label: 'Industries', align: 'right', xOffset: 0, yOffset: 0, color: '#B02A87', textColor: '#B02A87', scale: 0.7},
        {label: 'GFT + AWS Solutions', align: 'right', xOffset: 0, yOffset: 0, color: '#0097D9', textColor: '#0097D9', scale: 0.7},
      ];
      angleModifier = 0.5 * 3.5;
  }


  angleBetweenIcons = (360 / icons.length) * (Math.PI / 180); // Angle between icons in radians
  angleOffset = -angleBetweenIcons * angleModifier;  // Offset in radians (positive or negative value)

  const animatedIcons = icons.map(() => useRef(new Animated.Value(0)).current);

  const duration=1600;
  const strokeWidth=32;

    // Define the button source and stroke color depending on buttonPressed parameter being 0, 1, 2
    let buttonSource, strokeColor;
    switch (buttonPressed) {
      
      case 2:
        strokeColor = 'rgba(228, 157, 23, 0.8)';
        break;
      case 3:
        buttonSource = partners;
        strokeColor = 'rgba(89, 187, 230, 0.30)';
        break;
      case 4:
        buttonSource = offerings;
        strokeColor = 'rgba(130, 130, 130, 0.50)';
        break;
      case 5:
        buttonSource = industries;
        strokeColor = '#D4EDFC';
        break;
      default:
        strokeColor = 'rgba(130, 130, 130, 0.50)';
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0


    const handleIconPress = (index) => {
      console.log('Button Pressed:', index);
      let initial_screen = icon_names[index].label;
      initial_screen = initial_screen.replace(/\r?\n|\r/g, " ");

      let url;
      if (urls.length > 0) {
        url = urls[index];
        console.log("URL to open:", url);

      }

      switch (buttonPressed) {
        case 0:
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
          break;
        case 1: // Competencies
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
          break;
        case 2: // Success Stories
          navigation.navigate('SuccessScreen', { initial_screen: initial_screen });
          break;
        case 3:
          setLogosVisible(true);
          break;
        case 4:
          navigation.navigate('Offerings', { initial_screen: initial_screen });
          break;
        case 5: // Industries
          navigation.navigate('Industries', { initial_screen: initial_screen });
          break;
        case 6:
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
          break;
        default:
          console.log('Invalid button index');
      }
      console.log('Button Pressed:', index);
    };
    
    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
  
      animatedIcons.forEach((animatedIcon, index) => {
        Animated.timing(animatedIcon, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }).start();
      });

      Animated.timing(fadeAnim, {
        delay: 700,
        toValue: 1,
        duration: 600,
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


        {buttonPressed !== 3 && icons.map((icon, index) => {
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
                <Animated.View style={{
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
                </Animated.View>
              </TouchableOpacity>


              <Animated.View style={{ 
                ...styles.container, 
                opacity: fadeAnim, 
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                    position: 'absolute',
                    color: icon_names[index].textColor, 
                    fontSize: 24,
                    width: iconSize * 2.75,
                    // Height is two line spaces worth
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    font: 'Arial',
                    padding: 10,
                    ...textAlignmentStyle
                  }
                }
                >
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
