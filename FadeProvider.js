import React, { useState } from 'react';
import { Animated } from 'react-native';
import { FadeContext } from './path_to_your_context_file';

export const FadeProvider = ({ children }) => {
  const [opacity] = useState(new Animated.Value(1));

  const fadeToHome = (duration) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: true,
    }).start(() => {
      // After the animation is complete, you can navigate to the home screen
      // Use your navigation logic here. For instance, if you're using react-navigation:
      // navigation.navigate('Home');

      opacity.setValue(1);  // Reset the opacity for future use
    });
  };

  return (
    <FadeContext.Provider value={{ fadeToHome }}>
      <Animated.View style={{ flex: 1, opacity: opacity }}>
        {children}
      </Animated.View>
    </FadeContext.Provider>
  );
};
