import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, Animated, Modal, Platform, Linking, Image, Text } from 'react-native';
import WebView from 'react-native-webview';

const LinkImage = ({ 
    isVisible, 
    destinationUrl, 
    imageSource, 
    fadeDirection,
    width = 200,  // Default width if not provided
    height = 200  // Default height if not provided
}) => {
    const fadeInOpacity = useRef(new Animated.Value(0)).current;
    const translateValue = useRef(new Animated.Value(fadeDirection === 'right' ? 25 : -25)).current;

    const [webViewVisible, setWebViewVisible] = useState(false);

    const handleImagePress = () => {
        if (Platform.OS === 'ios') {
            setWebViewVisible(!webViewVisible);
        } else {
            Linking.openURL(destinationUrl).catch(err => Alert.alert('Error', 'Cannot open the URL'));
        }
    };

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeInOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeInOpacity, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: fadeDirection === 'right' ? 25 : -25,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    return (
        <View style={{ }}>
            {Platform.OS === 'ios' && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={webViewVisible}
                    onRequestClose={() => {
                        setWebViewVisible(false);
                    }}
                >
                    <WebView source={{ uri: destinationUrl }} style={{ flex: 1 }} />
                    <Button title="Close" onPress={() => setWebViewVisible(false)} />
                </Modal>
            )}

            <Animated.View style={[styles.imageLinkContainer, { opacity: fadeInOpacity, transform: [{ translateX: translateValue }] }]}>
                <TouchableOpacity onPress={handleImagePress} style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={imageSource} style={{ width: width, height: height,
                        borderWidth: 1,
                        borderColor: 'black', 
                        }} />
                    <Text style={ styles.linkText }>Tap for more details</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageLinkContainer: {
        alignItems: 'center',
        zIndex: 4,
    },
    linkText: {
        textAlign: 'center',
        marginTop: 5,  // Added margin
        padding: 5,    // Padding around text
        fontWeight: 'bold',  // Make the text bold
        fontSize: 12,  // Slightly larger font
        color: '#333', // Dark gray color
        letterSpacing: 0.5, // Some letter spacing
        textTransform: 'uppercase', // Capitalizing the text
        textShadowColor: 'rgba(0, 0, 0, 0.1)',  // Text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});


export default LinkImage;
