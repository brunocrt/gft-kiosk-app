import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import GlobalUIWrapper from './GlobalUIWrapper'; 


const GftAwsScreen = ({ navigation }) => {
    const [backgroundImg, setBackgroundImg] = useState(require('./assets/offerings_bg.png')); // default image

    const handleButtonPress = (index) => {
        console.log('Button pressed: ' + index);
        switch (index) {
            case 0:
                navigation.navigate('Offerings');
                break;
            case 1:
                navigation.navigate('Competencies');
                break;
            case 2:
                break;
            case 3:
                navigation.navigate('Industries');
                break;
            case 4:
                navigation.navigate('Solutions');
                break;
            case 5:
                navigation.navigate('GFT+AWS');
                break;
            default:
                console.log('Invalid button index');
    }
      };

  return (
    <GlobalUIWrapper backgroundImage={backgroundImg}>
        <View style={styles.container}>

            <View style={styles.options}>
            <View style={{...styles.buttonsRow, width: '80%'}}>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>OFFERINGS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(1)} style={styles.button}>
                        <Text style={styles.buttonText}>Competencies and{'\n'}Credentials</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(2)} style={styles.button}>
                        <Text style={styles.buttonText}>Success Stories</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.buttonsRow, width: '50%'}}>
                    <TouchableOpacity onPress={() => handleButtonPress(3)} style={styles.button}>
                        <Text style={styles.buttonText}>Industries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(4)} style={styles.button}>
                        <Text style={styles.buttonText}>Solutions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsRow}>
                   <TouchableOpacity onPress={() => handleButtonPress(5)} style={styles.button}>
                        <Text style={styles.buttonText}>GFT + AWS{'\n'}Offerings</Text>
                    </TouchableOpacity>
                </View>
            </View>


          {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.smallButton}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    </GlobalUIWrapper>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    options: {
        flex: 1,
        position: 'absolute',
        width: '80%',
        height: '70%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    button: {
        height: '60%',
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
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

export default GftAwsScreen;
