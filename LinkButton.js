import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Animated, Button, Modal } from 'react-native';
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={webViewVisible}
                onRequestClose={() => {
                    setWebViewVisible(false);
                }}
            >
                <WebView source={{ uri: 'https://www.example.com' }} style={{ flex: 1 }} />
                <Button title="Close" onPress={() => setWebViewVisible(false)} />
            </Modal>

            <Animated.View style={[styles.linkButtonContainer, { opacity: fadeInOpacity, transform: [{ translateX: translateXValue }] }]}>
                <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
                    <Text style={styles.buttonText}>View All Gft + AWS Success Stories Here</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

