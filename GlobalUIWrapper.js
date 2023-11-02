// GlobalUIWrapper.js
import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, SafeAreaView  } from 'react-native';

const logoImage = require('./assets/logo_gft.png');
const backgroundImage = require('./assets/background.png');


const GlobalUIWrapper = ({ children, backgroundImage }) => {
  const date = new Date().toLocaleDateString();
  const site = '> gft.com';
  return (
    <SafeAreaView style={{flex: 1}}> {/* Use SafeAreaView as the outermost wrapper */}
        <View style={styles.wrapper}>
            <View style={styles.topBar}>
                <Text style={styles.slogan}>Shaping the{'\n'}future of digial{'\n'}business</Text>
                <Image source={logoImage} style={styles.logo} />
            </View>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            
            {children}

            </ImageBackground>
            <View style={styles.bottomBar}>
                <Text style={styles.websiteLink}>
                  {site}
                </Text>
            <Text style={styles.date}>{date}</Text>
            </View>
        </View>
            </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      zIndex: 1,
    },
    wrapper: {
      flex: 1,
      padding: '0.75%',
      width: '100%',
      height: '100%',
    },
    topBar: {  
        marginBottom: 14,
        height: 60,
        position: 'relative',
    },
    logo: {  
      height: 40, // Set your desired height
      width: 250,
      right: '3%',
      position: 'absolute',
      bottom: 0,
    },
    slogan: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        position: 'absolute',
        left: '6%',
        },
    bottomBar: {
        marginTop: 10,
        width: '74%',
        position: 'relative',
        alignSelf: 'center',
    },
    websiteLink: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        position: 'relative',
        left: 0,
        },
    date: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        position: 'absolute',
        right: 0,
        },
    },

  );

export default GlobalUIWrapper;
