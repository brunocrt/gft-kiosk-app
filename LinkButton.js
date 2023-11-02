import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Animated, Button } from 'react-native';
import WebView from 'react-native-webview';

const LinkButton = ({ isVisible }) => {
    const fadeInOpacity = useRef(new Animated.Value(0)).current;
    const translateXValue = useRef(new Animated.Value(50)).current;

    const [webViewVisible, setWebViewVisible] = useState(false);

    const handleLinkPress = () => {
        // Toggle the WebView visibility
        setWebViewVisible(!webViewVisible);
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
        <View style={{ flex: 1 }}>
            {webViewVisible ? (
                <View style={{ flex: 1 }}>
                    <WebView source={{ uri: 'https://www.example.com' }} />
                    <Button title="Close" onPress={() => setWebViewVisible(false)} />
                </View>
            ) : (
                <Animated.View style={[styles.linkButtonContainer, { opacity: fadeInOpacity, transform: [{ translateX: translateXValue }] }]}>
                    <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
                        <Text style={styles.buttonText}>View All Gft + AWS Success Stories Here</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

// ... Rest of your styles and code ...


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
