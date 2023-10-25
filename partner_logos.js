import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

const logos = Array.from({ length: 4 }).map((_, i) => require(`./assets/logos/${i + 1}.png`));

const positions = [
  // Array of positions { x: 10, y: 20 }, { x: 30, y: 40 }, ...
    { x: 400, y: 120, width: 50, height: 50, delay: 100}, 
    {x: 30, y: 40, width: 50, height: 50, delay: 100}, 
    {x: 50, y: 60, width: 50, height: 50, delay: 100}, 
    {x: 70, y: 80, width: 50, height: 50, delay: 100}
];

const PartnerLogos = ({ startAnimation }) => {
  const [opacity] = useState(new Animated.Value(0)); 

  useEffect(() => {
    if (startAnimation) {
      Animated.sequence(
        logos.map((_, i) => 
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1400, 
            delay: positions[i].delay,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          })
        )
      ).start();
    }
  }, [startAnimation]);

  return (
    <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
      {logos.map((logo, index) => (
        <Animated.Image 
          key={index}
          source={logo}
          style={{
            position: 'absolute',
            top: positions[index].y,
            left: positions[index].x,
            opacity: opacity,
            zIndex: 2,
            height: positions[index].height,
            width: positions[index].width,
          }}
        />
      ))}
    </View>
  );
};

export default PartnerLogos;
