// SideNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SideNavigation = ({ selectedIcon, setSelectedIcon }) => {
    const icons = [
        'GFT + AWS Offerings', 
        'GFT + AWS Solutions',
        'GFT + AWS Success Stories',
    ];

  const handlePress = (index) => {
    switch (index) {
        case 0:
            setSelectedIcon(0);
            break;
        case 1:
            setSelectedIcon(6);
            break;
        case 2:
            setSelectedIcon(2);
            break;
        default:
            break;
    }
  };

    // The selected icon will have a background color of #213E7F, otherwise it will be transparent with black colored text and black border
    // However, if the current selectedIcon is 5, then the background color of the selected icon will be white, otherwise it will be transparent with white colored text and white border
    // The following function will return the appropriate style object based on the index of the icon
    const getStyle = (index) => {
        if (selectedIcon === index) {
            return {
                backgroundColor: '#213E7F',
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
            };
        } else {
            return {
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                borderWidth: 1,
            };
        }
    };



  return (
    <View style={styles.container}>
      {icons.map((iconText, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            getStyle(index),
          ]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.text}>{iconText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 30,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 10,
  },
});

export default SideNavigation;
