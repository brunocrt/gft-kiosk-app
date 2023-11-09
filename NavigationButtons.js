// NavigationButtons.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavigationButtons = ({ navigation }) => {
    return (
        <View style={styles.bottomButtons}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.smallButton}
            >
                <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home', params: { reset: true } }],
                    });
                }} 
                style={styles.smallButton}
            >
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomButtons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        flexDirection: 'column',
      },
      smallButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'skyblue',
        zIndex: 4,
      },
});

export default NavigationButtons;
