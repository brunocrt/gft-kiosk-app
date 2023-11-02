import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Linking, Alert, StyleSheet, Animated } from 'react-native';

const LinkButton = ({ isVisible }) => {
    const fadeInOpacity = useRef(new Animated.Value(0)).current;
    const translateXValue = useRef(new Animated.Value(50)).current;

    const handleLinkPress = () => {
        const url = 'https://www.example.com'; // Replace with your desired URL
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Error", "Cannot open the provided URL.");
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    useEffect(() => {
        if (isVisible) {
            // Entrance animation
            Animated.parallel([
                Animated.timing(fadeInOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXValue, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Exit animation
            Animated.parallel([
                Animated.timing(fadeInOpacity, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXValue, {
                    toValue: 50,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    return (
        <Animated.View style={[styles.linkButtonContainer, { opacity: fadeInOpacity, transform: [{ translateX: translateXValue }] }]}>
            <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
                <Text style={styles.buttonText}>View All Gft + AWS Success Stories Here</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    linkButtonContainer: {
        top: 200,  // Adjust this value as needed
        right: 20,
        zIndex: 4,
    },
    linkButton: {
        width: 200,
        height: 60,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0097D9',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        padding: 10,
    },
});

export default LinkButton;
