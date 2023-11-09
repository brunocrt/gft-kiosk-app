import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Animated, Button, Modal, Platform, Linking } from 'react-native';
import WebView from 'react-native-webview';

const LinkButton = ({ isVisible, text }) => {
    const fadeInOpacity = useRef(new Animated.Value(0)).current;
    const translateYValue = useRef(new Animated.Value(25)).current;

    const [webViewVisible, setWebViewVisible] = useState(false);
    const url = 'https://www.gft.com/us/en/services/success-stories';

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
        if (isVisible) {
            // Entrance animation
            Animated.parallel([
                Animated.timing(fadeInOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYValue, {
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
                Animated.timing(translateYValue, {
                    toValue: 25,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

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

            <Animated.View style={[styles.linkButtonContainer, { opacity: fadeInOpacity, transform: [{ translateY: translateYValue }] }]}>
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
        zIndex: 4,
        width: 200,
        height: 60,
        bottom: 20,
        right: -100,
    },
    linkButton: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
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
