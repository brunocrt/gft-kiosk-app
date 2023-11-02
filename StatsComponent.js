import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, Linking } from 'react-native';

const StatsComponent = ({ onAnimationEnd, display }) => {
    const fadeInOpacityView = useRef(new Animated.Value(0)).current;
    const translateXValueView = useRef(new Animated.Value(-50)).current;
    const fadeInOpacityImage = useRef(new Animated.Value(0)).current;
    const translateXValueImage = useRef(new Animated.Value(-50)).current;

    // Entrance animation
    const playEntranceAnimation = () => {
        Animated.parallel([
            Animated.timing(fadeInOpacityView, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateXValueView, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(fadeInOpacityImage, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXValueImage, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 350);
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
                toValue: -50,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(fadeInOpacityImage, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateXValueImage, {
                toValue: -50,
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
    <View style={styles.container}>
        <View style={styles.wrapper}>
        <Animated.View style={[styles.statsWrapper, { opacity: fadeInOpacityView, transform: [{ translateX: translateXValueView }] }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>AWS and GFT in numbers</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.bodyRow}>
                    <Text style={styles.statistic}>1,000{'\n'}AWS</Text>
                    <Text style={styles.subText}>experienced engineers and architects</Text>
                </View>
                <View style={styles.bodyRow}>
                    <Text style={styles.statistic}>650+{'\n'}certifications</Text>
                    <Text style={styles.subText}>officially from AWS</Text>
                </View>
                <View style={styles.bodyRow}>
                    <Text style={styles.statistic}>170{'\n'}engagements</Text>
                    <Text style={styles.subText}>currently with AWS</Text>
                </View>
            </View>
            
        </Animated.View>
            
        </View>

        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'right',
        backgroundColor:'transparent',
        
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        width: '80%',
        backgroundColor:'transparent',
        alignSelf: 'right',
        alignItems: 'right',
        left: 20,
    },
    statsWrapper: {
        height: 500,
        alignItems: 'right',
        alignSelf: 'right',
        top: 20,
    },
    header: {
        width: '100%',
        alignItems: 'right',
        backgroundColor:'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    body: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    bodyRow: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'right',
        borderTopColor: 'black',
        borderTopWidth: 1,
        
    },
    statistic: {
        flexDirection: 'row',
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'Calibri',
        textAlign: 'right',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    subText: {
        flexDirection: 'row',
        fontSize: 10,
        marginVertical: 10,
        fontFamily: 'Calibri',
        alignItems: 'flex-end',
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    bottomWrapper: {
        
        flexDirection: 'column',
        bottom: 40,
    },
});

export default StatsComponent;
