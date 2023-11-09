import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Easing, Text, Alert, StyleSheet, Animated, Button, Modal, Platform, Linking } from 'react-native';
import WebView from 'react-native-webview';

const SuccessScreenButton = ({ url, text }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const translateXAnim = useRef(new Animated.Value(-60)).current; // Start offscreen to the right

    const [webViewVisible, setWebViewVisible] = useState(false);

    const handleLinkPress = () => {
        if (Platform.OS === 'ios') {
            // Toggle the WebView visibility for iOS
            setWebViewVisible(!webViewVisible);
        } else {
            // Open in default browser for other platforms (including desktop)
            Linking.openURL(url).catch(err => Alert.alert('Error', 'Cannot open the URL'));
        }
    };

    useEffect(() => {
        // Fade in and slide from right to left
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                delay: 900,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateXAnim, {
                toValue: 0,
                delay: 900,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
        ]).start();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS === 'ios' && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={webViewVisible}
                    onRequestClose={() => {
                        setWebViewVisible(false);
                    }}
                >
                    <WebView source={{ uri: url }} style={{ flex: 1 }} />
                    <Button title="Close" onPress={() => setWebViewVisible(false)} />
                </Modal>
            )}

            <Animated.View style={[styles.linkButtonContainer, {
                opacity: fadeAnim,
                transform: [{ translateX: translateXAnim }],
            }]}>
                <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    linkButtonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust the position as needed
        right: 20, // Adjust the position as needed
        zIndex: 4,
    },
    linkButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20, // Padding horizontal for better width
        paddingVertical: 10, // Padding vertical for height
    },
    buttonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default SuccessScreenButton;
