import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, Linking } from 'react-native';


const SuccessStoriesButton = ({ onAnimationEnd, display }) => {
    const fadeInOpacityView = useRef(new Animated.Value(0)).current;
    const translateXValueView = useRef(new Animated.Value(50)).current;

    // Entrance animation
    const playEntranceAnimation = () => {
        Animated.parallel([
            Animated.timing(fadeInOpacityView, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateXValueView, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Exit animation
    const playExitAnimation = () => {
        Animated.parallel([
            Animated.timing(fadeInOpacityView, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateXValueView, {
                toValue: 50,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Callback after the exit animation completes
            onAnimationEnd && onAnimationEnd();
        });
    };

    useEffect(() => {
        if (display) {
            playEntranceAnimation();
        } else {
            playExitAnimation();
        }
    }, [display]);

    
  return (

    <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.container} 
        onPress={() => Linking.openURL('https://www.gft.com/us/en/about-us/awards-and-recognitions/everest-group-guidewire-services-2023')}>

       <Animated.View style={{
            backgroundColor: '#0097D9',
            width: 200,
            marginTop: '30%',
            borderRadius: 20,
            borderWidth: 2,
            borderColor: 'black',
            opacity: fadeInOpacityView,
            transform: [{ translateX: translateXValueView }],
       }}> {/* Button container */}
            <Text style={styles.buttonText}>
                View GFT{'\n'}Success Stories
            </Text>
       </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Calibri',
        padding: 20,
    },
});

export default SuccessStoriesButton;
