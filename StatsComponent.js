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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',  // Align children to the right.
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    wrapper: {  
        top: 20,
        width: '80%',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',  // Ensure content inside this is right-aligned.
    },
    statsWrapper: {
        alignItems: 'flex-end',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
        alignItems: 'flex-end',  // Align children to the right.
    },
    bodyRow: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        borderTopColor: 'black',
        borderTopWidth: 1,
    },
    statistic: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'Calibri',
        textAlign: 'right',
    },
    subText: {
        fontSize: 12,
        marginVertical: 10,
        fontFamily: 'Calibri',
        textAlign: 'right',
    },
    bottomWrapper: {
        flexDirection: 'column',
        bottom: 40,
    },
});

export default StatsComponent;
