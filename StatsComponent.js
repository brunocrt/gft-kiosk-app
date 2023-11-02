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

        <View style={styles.bottomWrapper} >
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.gft.com/us/en/about-us/awards-and-recognitions/everest-group-guidewire-services-2023')}
                    style={{
                        width: 140,
                        height: 140,
                        margin: 20,
                    }}
                    >
                        <Animated.Image
                            style={{ 
                                opacity: fadeInOpacityImage,
                                transform: [{ translateX: translateXValueImage }],
                                flex: 1,
                            }}
                            source={require('./assets/competencies/quadrant.png')}
                            resizeMode="contain"
                        />
                       <Animated.Text style={{ 
                                opacity: fadeInOpacityImage,
                                transform: [{ translateX: translateXValueImage }],
                                alignSelf: 'center',
                            }}>View details on GFT</Animated.Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.gft.com/us/en/news/import/press-and-news/2023/Press-releases/gft-improves-its-leader-ranking-in-the-2023-spark-matrix-for-digital-banking-services')}
                    style={{ 
                        width: 160,
                        height: 140,
                        margin: 20,
                    }}
                    >
                        <Animated.Image
                            style={{ 
                                opacity: fadeInOpacityImage,
                                transform: [{ translateX: translateXValueImage }],
                                flex: 1,
                                borderColor: 'black',
                                borderWidth: 1,
                                backgroundColor: 'white',
                            }}
                            source={require('./assets/competencies/peak.png')}
                            resizeMode="contain"
                        />
                        <Animated.Text style={{ 
                                opacity: fadeInOpacityImage,
                                transform: [{ translateX: translateXValueImage }],
                                alignSelf: 'center',
                            }}>View details on GFT</Animated.Text>
                    </TouchableOpacity> 
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
        alignSelf: 'right',
        backgroundColor:'transparent',
        paddingRight: '5%',
        paddingLeft: '20%',
    },
    statsWrapper: {
        
        justifyContent: 'flex-end',
        alignSelf: 'right',
        top: '10%',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    body: {
        flex: 1,
        height: '80%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    bodyRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'left',
        borderTopColor: 'black',
        borderTopWidth: 1,
        justifyContent: 'flex-start',
    },
    statistic: {
        fontSize: 24,
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
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 40,
    },
});

export default StatsComponent;
