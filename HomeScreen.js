import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import industries from './assets/industries.png'
import industries_inverted from './assets/industries_inverted.png'
import offerings from './assets/offerings.png'
import partners from './assets/partners.png'
import GlobalUIWrapper from './GlobalUIWrapper'; 
import LogosVisible from './LogosVisible';
import AnimatedCircle from './AnimatedCircle';




const buttonDiameter = 220;
const buttonRadius = buttonDiameter / 2;
const scaleMultiplier = 1.75;

const HomeScreen = ({ navigation }) => {

  const resetStateAndAnimations = () => {
    // Reset state values
    setButtonsDisabled(false);
    setButtonPressed(null);
    setIndustriesButtonImg(industries);
    setBackgroundImg(require('./assets/background.png'));
    setIsBorderVisible(false);
    setShowAnimatedCircle(false);

    // Reset animations
    fadeAnim.forEach(anim => anim.setValue(1));
    scaleAnim.forEach(anim => anim.setValue(0));
    moveAnim[0].setValue(0);
    moveAnim[2].setValue(0);

    // Start the initial animations
    startingAnimation();
};

useFocusEffect(
    React.useCallback(() => {
        resetStateAndAnimations();
        return () => {
            // Any cleanup operations can be done here if needed
        };
    }, []) // The empty dependency array ensures this callback is not re-created unless something inside it changes
);
    // Get deviceWidth      
  const deviceWidth = Dimensions.get('window').width;

  // Calculate initial positions
  const containerWidth = deviceWidth * 0.5;
  console.log('containerWidth: ', containerWidth)

  const containerCenter = containerWidth / 2;
  const buttonCenter = buttonDiameter / 2;

  const buttonMargins = buttonDiameter / 2;
  const leftButtonInitialPosition = (containerCenter - buttonCenter) - (containerCenter + buttonMargins);
  const rightButtonInitialPosition = (containerCenter + buttonCenter) - (containerCenter - buttonMargins);

  const fadeAnim = useRef([new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]).current;
  const scaleAnim = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  const moveAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
    ]).current;

  const [areButtonsDisabled, setButtonsDisabled] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [industriesButtonImg, setIndustriesButtonImg] = useState(industries);
  const [backgroundImg, setBackgroundImg] = useState(require('./assets/background.png')); // default image
    const [isBorderVisible, setIsBorderVisible] = useState(false);
  const [borderPosition, setBorderPosition] = useState(leftButtonInitialPosition);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAnimatedCircle, setShowAnimatedCircle] = useState(false);
  const [logosVisible, setLogosVisible] = useState(false);
  const [showIconLabels, setShowIconLabels] = useState(false);


  const startingAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim[0], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(scaleAnim[1], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(scaleAnim[2], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(moveAnim[0], {
        toValue: leftButtonInitialPosition,  // Move to the left
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim[2], {
        toValue: rightButtonInitialPosition,  // Move to the right
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
    };

    useEffect(() => {
      setIsLoaded(true);
      startingAnimation();
    }, []);
    

  const onButtonPress = (index) => {
    setShowAnimatedCircle(true);
    setButtonsDisabled(true);
    setIsBorderVisible(true);
    setButtonPressed(index);
    Animated.timing(fadeAnim[(index + 1) % 3], {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim[(index + 2) % 3], {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim[index], {
      toValue: scaleMultiplier,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    if (index === 0) {
      Animated.timing(moveAnim[index], {
        toValue: -leftButtonInitialPosition,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      setShowIconLabels(true);
      setBackgroundImg(require('./assets/offerings_bg.png'));
    } else if (index === 1) {
      setLogosVisible(true);
      setBackgroundImg(require('./assets/partners_bg.png'));
    }
    else if (index === 2) {
      Animated.timing(moveAnim[index], {
        toValue: -rightButtonInitialPosition,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      setShowIconLabels(true);
      setIndustriesButtonImg(industries_inverted);
      setBackgroundImg(require('./assets/industries_bg.jpg'));
    }
  };


  const reverseOnButtonPress = (index) => {
    setButtonsDisabled(false);
    setIsBorderVisible(false);
    setBackgroundImg(require('./assets/background.png'));
    setShowAnimatedCircle(false);
    setShowIconLabels(false);
    index = buttonPressed;
    // Reverse opacity animations
    Animated.timing(fadeAnim[(index + 1) % 3], {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim[(index + 2) % 3], {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Reverse scale animation
    Animated.timing(scaleAnim[index], {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    // Reverse position animations
    if (index === 0) {
      Animated.timing(moveAnim[index], {
        toValue: leftButtonInitialPosition,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (index === 1) {
      setLogosVisible(false);
    }else if (index === 2) {
      Animated.timing(moveAnim[index], {
        toValue: rightButtonInitialPosition,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      setIndustriesButtonImg(industries);
    }

    setButtonsDisabled(false);
};

if (!isLoaded) {
  return null; // or a loading screen
}

  return (
    <GlobalUIWrapper backgroundImage={backgroundImg}>
    <View style={styles.container}>
    {logosVisible && <LogosVisible startAnimation={true} buttonPressed={buttonPressed} />}

    {/* {showIconLabels && <IconLabels buttonPressed={buttonPressed} navigation={navigation} />} */}
    

    <View style={styles.centeredLine}></View>
    <View style={styles.verticalCenteredLine}></View> 

    <View style={styles.buttonRow}>

        {showAnimatedCircle && <AnimatedCircle 
          radius={buttonRadius * 2.4} 
          buttonPressed={buttonPressed} 
          navigation={navigation} 
        />}

      <Animated.View 
        style={[
          {
            transform: [{ translateX: moveAnim[0] }],
          },
        ]}
      >


        {/* Button 1 */}
        <TouchableOpacity onPress={() => navigation.navigate('GftAws')}>
            <Animated.Image
            source={offerings} 
            style={[
                styles.button,
                {
                    transform: [{ scale: scaleAnim[0] }],
                    opacity: fadeAnim[0],
                },
            ]} />
        </TouchableOpacity>

      </Animated.View>
      
      {/* Button 2 */}
      <TouchableOpacity onPress={() => onButtonPress(1)} disabled={areButtonsDisabled}>
        <Animated.Image 
        source={partners}
        style={[
          styles.button,
          {
            transform: [{ scale: scaleAnim[1] }],
            opacity: fadeAnim[1],
          },
        ]} />
      </TouchableOpacity>
      
      
    {/* Button 3 */}
      <Animated.View 
        style={[
          {
            transform: [{ translateX: moveAnim[2] }],
          },
        ]}
      >

        <TouchableOpacity onPress={() => onButtonPress(2)} disabled={areButtonsDisabled}>
          <Animated.Image 
            source={industriesButtonImg} 
          style={[
            styles.button,
            {
              transform: [{ scale: scaleAnim[2] }],
              opacity: fadeAnim[2],
            },
          ]} />
        </TouchableOpacity>
      </Animated.View>

    

    </View>
          {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => reverseOnButtonPress()} style={styles.smallButton}>
            <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
    </GlobalUIWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
    zIndex: 3,
  },
  button: {
    width: buttonDiameter,
    height: buttonDiameter,
    borderRadius: buttonDiameter / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  smallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'skyblue',
    zIndex: 4,
  },
  circleContainer: {
    position: 'absolute',
    width: '65%',
    height: '90%',
    zIndex: 2,
  },
  centeredLine: {
    position: 'absolute',
    top: '50%',   // This centers the line vertically
    left: 0,
    right: 0,
    height: 1,   // Thickness of the line
    backgroundColor: 'transparent',   // Color of the line
    zIndex:1,
  },
  verticalCenteredLine: {
    position: 'absolute',
    left: '50%',   // This centers the line horizontally
    top: 0,
    bottom: 0,
    width: 1,   // Thickness of the line
    backgroundColor: 'transparent',   // Color of the line
    zIndex:1,
  },
});

export default HomeScreen;
