import React, { useState, useRef, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, Animated, StyleSheet, Easing, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import industries from './assets/industries.png'
import industries_inverted from './assets/industries_inverted.png'
import offerings from './assets/offerings.png'
import partners from './assets/partners.png'
import GlobalUIWrapper from './GlobalUIWrapper'; 
import LogosVisible from './LogosVisible';
import PartnerLogos from './partner_logos'; 
import AnimatedCircle from './AnimatedCircle';
import AppNavigator from './AppNavigator';
import IconLabels from './IconLabels';


const GftAwsScreen = ({ navigation }) => {
    const [backgroundImg, setBackgroundImg] = useState(require('./assets/offerings_bg.png')); // default image

    const handleButtonPress = (index) => {
      };

  return (
    <GlobalUIWrapper backgroundImage={backgroundImg}>
        <View style={styles.container}>

            <View style={styles.options}>

                <View style={{...styles.buttonsRow, width: '60%'}}>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>Application and Mainframe Modernization</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>Open API Framework</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>DevOps</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.buttonsRow, width: '60%'}}>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>Data Transformation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>Cloud Migration</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>High Performance Computing</Text>
                    </TouchableOpacity>
                </View>

            </View>


          {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.smallButton}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.smallButton}>
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
        marginVertical: 30,
        borderWidth: 1,
        borderColor: 'red',
    },
    button: {
        height: '60%',
        paddingHorizontal: 40,
        paddingVertical: 20,
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
