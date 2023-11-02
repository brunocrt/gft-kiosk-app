import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Easing } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

import success_content from './assets/success_content.json';
import NavigationButtons from './NavigationButtons';
import GlobalUIWrapper from './GlobalUIWrapper';

import industries_icon1 from './assets/icons/cooperatives_icon.png';
import industries_icon2 from './assets/icons/capital_markets_icon.png';
import industries_icon3 from './assets/icons/banking_icon.png';
import industries_icon4 from './assets/icons/insurance_icon.png';
import industries_icon5 from './assets/icons/manufacturing_icon.png';
import industries_icon6 from './assets/icons/telecom_icon.png';


const bgImage = require('./assets/offerings_content_bg.jpg');  // Update with the correct path
const iconSize=75;

export default function IndustriesScreen({ route, navigation }) {

    const swipeAnimation = React.useRef(new Animated.Value(0)).current;

    const icons = [
        require('./assets/icons/migration_icon.png'), 
        require('./assets/icons/devops_icon.png'), 
        require('./assets/icons/financial_services_icon.png'), 
        require('./assets/icons/security_icon.png'), 
        require('./assets/icons/security_icon.png'), 
      ];
    const icon_names = [
        {label: 'Capital\nMarkets', align: 'center', xOffset: -45, yOffset: 90, color: '#B02A87', textColor: 'black', scale: 0.85},
        {label: 'Banks', align: 'left', xOffset: -45, yOffset: 60, color: '#B02A87', textColor: 'black', scale: 0.85},
        {label: 'Insurance', align: 'left', xOffset: 30, yOffset: -45, color: '#B02A87', textColor: 'black', scale: 0.9},
        {label: 'Manufacturing', align: 'right', xOffset: -120, yOffset: -45, color: '#B02A87', textColor: 'black', scale: 0.9},
        {label: 'Other\nIndustries', align: 'right', xOffset: 0, yOffset: 45, color: '#B02A87', textColor: 'black', scale: 0.9},
      ];
        const initialCategory = route.params?.initial_screen || success_content[0].label;
        const initialCategoryIndex = success_content.findIndex(category => category.label === initialCategory);
      
      const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(initialCategoryIndex !== -1 ? initialCategoryIndex : 0);
      const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
      const ref = React.useRef(null);
      useScrollToTop(ref);
    
      const changeSubCategory = (direction) => {
        Animated.timing(swipeAnimation, {
            toValue: direction, // 1 for right, -1 for left
            duration: 250,
            useNativeDriver: false,
        }).start(() => {
            swipeAnimation.setValue(0); // Reset the animation value
    
        let newSubCategoryIndex = selectedSubCategoryIndex + direction;
        let newCategoryIndex = selectedCategoryIndex;
    
        if (direction === -1 && newSubCategoryIndex < 0) {
            // Swiping right at the first subcategory
            newCategoryIndex = selectedCategoryIndex - 1;
            if (newCategoryIndex < 0) {
                newCategoryIndex = success_content.length - 1; // Wrap to the last category if on the first one
            }
            newSubCategoryIndex = success_content[newCategoryIndex].subcategories.length - 1; // Move to the last subcategory of the previous category
        } else if (direction === 1 && newSubCategoryIndex >= success_content[selectedCategoryIndex].subcategories.length) {
            // Swiping left at the last subcategory
            newCategoryIndex = selectedCategoryIndex + 1;
            if (newCategoryIndex >= success_content.length) {
                newCategoryIndex = 0; // Wrap to the first category if on the last one
            }
            newSubCategoryIndex = 0; // Move to the first subcategory of the next category
        }
    
        setSelectedCategoryIndex(newCategoryIndex);
        setSelectedSubCategoryIndex(newSubCategoryIndex);        // ... the rest of your logic here ...
        });
    };
    
    const dropAnim = useState(new Animated.Value(0))[0];
    const textOpacity = useState(new Animated.Value(1))[0]; // Starts with opacity 1

    const curtainReveal = dropAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-85%', '0%'] // The Animated.View starts off-screen and comes into position
    });
    
    useEffect(() => {
        Animated.timing(dropAnim, {
            toValue: 1,
            delay: 300,
            duration: 700,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
        }).start();
    }, []);
    
    

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[
                styles.subCategoryBox,
                index === selectedSubCategoryIndex ? styles.selectedBox : null,
                { width: ((100/(success_content[selectedCategoryIndex].subcategories.length)) + '%') }, // Divide by the number of subcategories + 1 (for the middle box)
            ]}
            onPress={() => setSelectedSubCategoryIndex(index)}
        >
          <Text 
              style={[
                  styles.subCategoryText, 
                  index === selectedSubCategoryIndex ? styles.selectedSubCategoryText : null
              ]}
          >
              {item.title}
          </Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.backgroundImageContainer}>
    
                <View style={styles.iconBar}>
                    {icons.map((icon, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => { 
                                setSelectedCategoryIndex(index); 
                                setSelectedSubCategoryIndex(0); 
                            }}
                            style={[
                                styles.iconContainer, 
                                index === selectedCategoryIndex ? styles.selectedIconContainer : styles.unselectedIconContainer
                            ]}>
                            <View style={styles.iconWrapper}>
                                <View style={[
                                    index === selectedCategoryIndex ? styles.selectedIcon : styles.icon,
                                    ]}>
                                        <View style={{
                                        width: iconSize * 0.7,
                                        height: iconSize * 0.7,
                                        borderRadius: iconSize * 0.7 / 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                        }}
                                        source={icon}
                                        resizeMode="cover"
                                    />
                                    </View>
                                </View>
    
                                <Text style={styles.iconName}>{icon_names[index].label}</Text>
                                </View>
                        </TouchableOpacity>
                    ))}
                </View>
    
                
    
    
                <Swipeable
                    onSwipeableOpen={(event) => {
                        if (event.direction === 'left') {
                            changeSubCategory(1);
                        } else if (event.direction === 'right') {
                            changeSubCategory(-1);
                        }
                    }}
                >
                    <View style={styles.subCategoriesWrapper}>
                    <FlatList
                        horizontal
                        data={success_content[selectedCategoryIndex].subcategories}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={[
                            styles.subCategoriesList,
                            
                        ]}
                    />
                    </View>
                </Swipeable>
    
    
            <View style={styles.wrapper}>        
    
                <View style={styles.arrowContentWrapper}>
    
                    <View style={styles.leftButtonContainer}>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => changeSubCategory(-1)}>
                            <Text style={styles.arrowButtonText}>{"<"}</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.contentWrapper}>
                        <View style={styles.content}>
                            <Text style={styles.headerStyle}>{success_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].header}</Text>
                            <View style={styles.innerContentWrapper}>    
                                <View ref={ref} style={styles.contentTextContainer}>
                                    {/* Dynamically rendering text elements */}
                                    <ImageBackground 
                                        source={success_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].imageUrl} 
                                        style={{
                                            width: '100%', 
                                            height: '100%',
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <View style={{
                                            width: '100%', 
                                            height: '85%',
                                            justifyContent: 'flex-end',
                                            overflow: 'hidden',
                                        }}>
                                            <Animated.View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                alignSelf: 'center',
                                                verticalAlign: 'middle',
                                                width: '90%',
                                                height: '85%',
                                                position: 'absolute',
                                                top: curtainReveal,
                                            }}>                                                         
                                                             
                                            {success_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].subheaders.map((subheader, index) => (
                                            <>
                                                <View style={styles.contentText}>
                                                    <Text style={{
                                                        fontSize: 24,
                                                        color: 'white',
                                                        marginBottom: 10,
                                                        fontFamily: 'Calibri',
                                                    }}>
                                                        {subheader}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        fontWeight: 'normal',
                                                        color: 'white',
                                                        marginBottom: 10,
                                                        fontFamily: 'Calibri',
                                                    }}>
                                                        {success_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].texts[index]}
                                                    </Text>
                                                </View>
                                            </>
                                            ))}

                                            </Animated.View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </View>
                    </View>
    
                    <View style={styles.rightButtonContainer}>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => changeSubCategory(1)}>
                            <Text style={styles.arrowButtonText}>{">"}</Text>
                        </TouchableOpacity>
                    </View>
    
                </View>
                <View style={styles.bottomButtons}>
                    <NavigationButtons navigation={navigation} />
                </View>
            </View>
        </View>
    );
    }
    
    const styles = StyleSheet.create({
        backgroundImageContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bgImage})`,  // or use backgroundImage: bgImage if you're using inline styles
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        topBar: {
            flexDirection: 'row',
        },
      iconBar: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        width: '70%',
        backgroundColor: 'rgba(0, 151, 217, 0.6)',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },
       iconContainer: {
        alignSelf: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: 0.7,
            width: 90,
        },
        selectedIconContainer: {
            opacity: 1,
        },
        iconWrapper: {
            alignItems: 'center',
        },
        unselectedIconContainer: {
            borderColor: 'transparent',
        },
        icon: {
            justifyContent: 'center',
            alignItems: 'center',
            width: iconSize,
            height: iconSize,
            borderWidth: 2,
            borderColor: 'transparent',
            borderRadius: iconSize / 2,
            padding: 3,  // Adjust this value if you want more or less space around the icon
            marginHorizontal: -2,  // This negative margin compensates for the border width to ensure icons don't shift
            backgroundColor: "#B02A87"
        },
        selectedIcon: {
            justifyContent: 'center',
            alignItems: 'center',
            width: iconSize,
            height: iconSize,
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: iconSize / 2,
            backgroundColor: "#EC6601"
        },
        iconName: {
            marginTop: 5,
            textAlign: 'center',
            color: 'white',
            width: iconSize * 1.5,
        },
        subCategoriesWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
            paddingHorizontal: 10,
            alignSelf: 'center',
            alignContent: 'center',
        },
        subCategoriesList: {
            flexGrow: 0,
            marginVertical: 10,
        },
      selectedBox: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderWidth: 2,
      },
      subCategoryBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 20,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'white',
      },
      
      subCategoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // Default color for non-selected
        marginHorizontal: 20,
    },
    
    // Text for selected subcategory
    selectedSubCategoryText: {
        color: 'black'
    },  
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'space-evenly',
        },
        arrowContentWrapper: {
        flex: 6,
        flexDirection: 'row',
        width: '100%',
        },
        leftButtonContainer: {
          height: '100%',
          width: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        rightButtonContainer: {
          height: '100%',
          width: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        arrowButton: {
          width: 60,
          height: 60,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        arrowButtonText: {
          fontSize: 24,
          color: 'white',
        },
        contentWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            width: '80%',
            height: '100%',
        },
      content: {
        justifyContent: 'flex-start',
        width: '100%',
      },
      headerStyle: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Calibri',
        alignSelf: 'center',
        marginBottom: 20,
      },
        innerContentWrapper: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            height: '100%',
        },
        contentTextContainer: {
            flex: 1,
            width: '100%',
            height: '100%',
            padding: 10,
        },
      contentText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        width: '25%',
        minHeight: '40%',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.75)', // Optional: Add a semi-transparent background to the text
      },
        contentImage: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            borderColor: 'black',
            borderWidth: 1,
            margin: 15,
    
        },
        absoluteView: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
      bottomButtons: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      },
      smallButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 20,
        backgroundColor: 'skyblue',
      },
    
    });
    