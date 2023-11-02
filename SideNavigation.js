import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

// Assuming you're using React Navigation
import { useNavigation } from '@react-navigation/native';

const SideNavigation = ({ onHomeStateChange, icons, activeState, currentScreen }) => {
  const navigation = useNavigation();

  const handleIconPress = (index) => {
    if (currentScreen === 'Home' && index !== activeState) {
      onHomeStateChange(index);
    } else if (currentScreen !== 'Home') {
      navigation.navigate('Home', { initialState: index });
    }
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      {icons.map((icon, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => handleIconPress(index)}
          disabled={index === activeState}
          style={{
            backgroundColor: index === activeState ? 'blue' : 'transparent', // Change 'blue' to your preferred color
            marginVertical: 10,
          }}
        >
          <Image source={icon.source} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideNavigation;
