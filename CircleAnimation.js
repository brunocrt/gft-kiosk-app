import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon1 from './assets/icons/icon1.png';
import Icon2 from './assets/icons/icon2.png';

const CircleAnimation = ({ radius }) => {
    const icons = [Icon1, Icon2, Icon1, Icon2, Icon1, Icon2, Icon1, Icon2];
    const animatedValues = icons.map(() => new Animated.Value(0));

    useEffect(() => {
        animatedValues.forEach((value, index) => {
            Animated.timing(value, {
                toValue: 1,
                duration: 1000,
                delay: index * 200, // stagger delay for each button
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
        });
    }, []);

    const renderButtons = () => {
        return icons.map((icon, index) => {
            const inputRange = [0, 1];

            // calculate positions for each button around the circle
            const angle = (index * 2 * Math.PI) / icons.length;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const translateX = animatedValues[index].interpolate({
                inputRange,
                outputRange: [0, x],
            });

            const translateY = animatedValues[index].interpolate({
                inputRange,
                outputRange: [0, y],
            });

            return (
                <Animated.View
                    key={index}
                    style={[
                        styles.iconContainer,
                        {
                            transform: [{ translateX }, { translateY }],
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Image source={icon} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </Animated.View>
            );
        });
    };

    return (
        <View style={[styles.container, { width: 2 * radius, height: 2 * radius }]}>
            {renderButtons()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
    },
});

export default CircleAnimation;
