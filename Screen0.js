import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import GlobalUIWrapper from './GlobalUIWrapper';
import InitialCircle from './InitialCircle'; 
import AnimatedCircle from './AnimatedCircle';
import LogosVisible from './LogosVisible';
import StatsComponent from './StatsComponent';
import LinkButton from './LinkButton';
import LinkImage from './LinkImage';
import SideNavigation from './SideNavigation';
import NavigationButtons from './NavigationButtons'; // Adjust the path as needed

const Screen0 = ({ navigation }) => {
    const [backgroundImg, setBackgroundImg] = useState(require('./assets/background.png')); // default image
    const [logosVisible, setLogosVisible] = useState(false);

    console.log(navigation)
    const [selectedIcon, setSelectedIcon] = useState(8);

    const [activeCircle, setActiveCircle] = useState('start');
    
    const buttonWidth = 300;
    const radius = buttonWidth / 2;

    // Stats component
    const [displayInfo, setDisplayInfo] = useState(false);
    const [renderStatsComponent, setRenderStatsComponent] = useState(false);
    const handleHideStatsComponent = () => {
    if (renderStatsComponent) {
        // Tell the StatsComponent to start the 'out' animations
        setDisplayInfo(false);
    }
    };
    useEffect(() => {

        if (navigation.params?.reset) {
          // Reset the state to its initial values
            reverseOnButtonPress(8);
        }

        if (displayInfo) {
            // If displayInfo is set to true, mount the StatsComponent
            setRenderStatsComponent(true);
            }
      }, [navigation.params?.reset, displayInfo]);



    const buttonProps = [
        {label: 'GFT + AWS OFFERINGS', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'COMPETENCIES & CREDENTIALS', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'GFT + AWS SUCCESS STORIES', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'GFT PARTNERS', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'AI.DA MARKETPLACE', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,}, // AI.DA Marketplace placeholder
        {label: 'GFT OFFERINGS', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'INDUSTRIES', color: '#213E7F', textColor: 'white', borderColor: 'white', fontSize: 32,},
        {label: 'GFT + AWS SOLUTIONS', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
        {label: 'GFT TECHNOLOGIES', color: 'white', textColor: 'black', borderColor: '#213E7F', fontSize: 32,},
      ];

      const flipAnim = useRef(new Animated.Value(0)).current;
      const fadeAnim = useRef(new Animated.Value(1)).current;

      const startFlipAnimation = (index, state) => {
        // Reset the animation value
        console.log("Starting flip animation");
        flipAnim.setValue(0);
        fadeAnim.setValue(1);

        // Create fade-out animation
        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // Create fade-in animation
        const fadeIn = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // Create the first half of the flip animation
        const firstHalfFlip = Animated.timing(flipAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // Create the second half of the flip animation
        const secondHalfFlip = Animated.timing(flipAnim, {
            toValue: 3,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    
        // Animate from 0 to 0.5, change the circle properies, then animate from 0.5 to 1
        Animated.parallel([
            firstHalfFlip,
        ]).start(() => {
            setSelectedIcon(index);
            setActiveCircle(state);
            flipAnim.setValue(2);
    
            Animated.parallel([
                secondHalfFlip,
            ]).start();
        });
    };
    const rotateY = flipAnim.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['0deg', '90deg', '270deg', '360deg'],
    });

    const handleButtonPress = (index) => {
        console.log('Button pressed: ' + index);
            startFlipAnimation(index, 'update');
        
        switch (index) {
            case 0:
                setBackgroundImg(require('./assets/background.png'));
                break;
            case 1:
                setDisplayInfo(true);
                break;
            case 2:
                setBackgroundImg(require('./assets/background.png'));
                break;
            case 3:
                setLogosVisible(true);
                setBackgroundImg(require('./assets/partners_bg.png'));
                break;
            case 4: // AI.DA Marketplace
                break;
            case 5:
                setBackgroundImg(require('./assets/offerings_bg.png'));
                break;
            case 6: // Industries
                setBackgroundImg(require('./assets/industries_bg.jpg'));
                break;
            case 7:
                setBackgroundImg(require('./assets/background.png'));
                break;
            default:
                setBackgroundImg(require('./assets/background.png'));
                console.log('Invalid button index');
    }
      };

    const reverseOnButtonPress = (index) => {
        console.log('Button pressed: ' + index);
        startFlipAnimation(index, 'start');
        setLogosVisible(false);
        setDisplayInfo(false);
        setBackgroundImg(require('./assets/background.png'));
    };

  return (
    <GlobalUIWrapper backgroundImage={backgroundImg}>
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}>
                {logosVisible && <LogosVisible startAnimation={true} circleSize={buttonWidth * 1.5 + 50} />}
            </View>
            <View style={styles.graphicsContainerLeft}>

            {renderStatsComponent && <StatsComponent onAnimationEnd={handleHideStatsComponent} display={displayInfo} />}

            </View>
            <View style={styles.options}>


 
            {activeCircle === 'start' && <InitialCircle                 
                radius={radius}
                navigation={navigation} 
                zIndex={5}
                onIconPress={handleButtonPress}
                activeCircle={activeCircle}
            />}

            {activeCircle === 'update' && <AnimatedCircle                 
                radius={radius} 
                buttonPressed={selectedIcon}
                navigation={navigation} 
                zIndex={5}
                onIconPress={handleButtonPress}
                activeCircle={activeCircle}
            />}
            
                <Animated.View style={[styles.middleCircle, 
                    { 
                        backgroundColor: buttonProps[selectedIcon].color,
                        width: buttonWidth , 
                        height: buttonWidth , 
                        borderRadius: radius,
                        borderColor: buttonProps[selectedIcon].borderColor,
                        transform: [{ rotateY: rotateY }],
                    }]}>
                        <Text style={[
                            styles.middleCircleText,
                            {
                                color: buttonProps[selectedIcon].textColor,
                                fontSize: buttonProps[selectedIcon].fontSize,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                padding: 10,
                            }
                            ]}
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            minimumFontScale={0.5}

                            >{buttonProps[selectedIcon].label}</Text>
                </Animated.View>
                
                {selectedIcon === 1 && 
                    <View style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        width: Math.PI * radius* 1.5,
                        height: 150,
                        justifyContent: 'space-between',
                        alignItems: 'center',  // Center children vertically.
                        bottom: 0,
                    }}>
                            <LinkImage 
                                isVisible={selectedIcon === 1} 
                                destinationUrl="https://www.gft.com/us/en/news/import/press-and-news/2023/Press-releases/gft-improves-its-leader-ranking-in-the-2023-spark-matrix-for-digital-banking-services" 
                                imageSource={require('./assets/competencies/quadrant.png')} 
                                fadeDirection="left" 
                                width={100}
                                height={100}
                            />

                            <LinkImage 
                                isVisible={selectedIcon === 1} 
                                destinationUrl="https://www.gft.com/us/en/about-us/awards-and-recognitions/everest-group-guidewire-services-2023" 
                                imageSource={require('./assets/competencies/peak.png')} 
                                fadeDirection="right" 
                                width={120}
                                height={100}
                            />
                    </View>
                }

                <LinkButton 
                    isVisible={selectedIcon === 2}
                    text="View All GFT Success Stories Here"
                />
            </View>


           




            <View style={styles.graphicsContainerRight}>
 
            </View>

            <SideNavigation
                selectedIcon={selectedIcon}
                setSelectedIcon={handleButtonPress}
            />

          {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => {reverseOnButtonPress(7)}} style={styles.smallButton}>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    graphicsContainerLeft: {
        borderWidth: 1,
        borderColor: 'transparent',
        height: '100%',
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: '',
    },
    graphicsContainerRight: {
        borderWidth: 1,
        borderColor: 'transparent',
        height: '100%',
        width: '20%',
    },
    options: {
        
        width: '60%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    middleCircle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 3,
        justifyContent: 'center',
        borderWidth: 24,
    },
    middleCircleText: {
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Calibri',
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        flexDirection: 'column',
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
});

export default Screen0;
