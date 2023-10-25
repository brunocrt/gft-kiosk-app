import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

import industries_content from './assets/industries_content.json';
import GlobalUIWrapper from './GlobalUIWrapper';

import industries_icon1 from './assets/icons/cooperatives_icon.png';
import industries_icon2 from './assets/icons/telecom_icon.png';
import industries_icon3 from './assets/icons/health_icon.png';
import industries_icon4 from './assets/icons/retail_icon.png';
import industries_icon5 from './assets/icons/utilities_icon.png';
import industries_icon6 from './assets/icons/financial_services_icon.png';
import industries_icon7 from './assets/icons/payment_methods_icon.png';
import industries_icon8 from './assets/icons/government_icon.png';



const bgImage = require('./assets/offerings_content_bg.jpg');  // Update with the correct path
const iconSize=75;

export default function IndustriesScreen({ route, navigation }) {

    const swipeAnimation = React.useRef(new Animated.Value(0)).current;

    const icons = [
        industries_icon1, industries_icon2, industries_icon3, industries_icon4, 
        industries_icon5, industries_icon6, industries_icon7, industries_icon8
    ];
    const icon_names = [
        'Cooperatives', 'Telecom', 'Health', 'Retail', 'Utilities', 
        'Financial Services', 'Payment Methods', 'Government'
        ];

        const initialCategory = route.params?.initial_screen || industries_content[0].label;
        const initialCategoryIndex = industries_content.findIndex(category => category.label === initialCategory);
      
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
                newCategoryIndex = industries_content.length - 1; // Wrap to the last category if on the first one
            }
            newSubCategoryIndex = industries_content[newCategoryIndex].subcategories.length - 1; // Move to the last subcategory of the previous category
        } else if (direction === 1 && newSubCategoryIndex >= industries_content[selectedCategoryIndex].subcategories.length) {
            // Swiping left at the last subcategory
            newCategoryIndex = selectedCategoryIndex + 1;
            if (newCategoryIndex >= industries_content.length) {
                newCategoryIndex = 0; // Wrap to the first category if on the last one
            }
            newSubCategoryIndex = 0; // Move to the first subcategory of the next category
        }
    
        setSelectedCategoryIndex(newCategoryIndex);
        setSelectedSubCategoryIndex(newSubCategoryIndex);        // ... the rest of your logic here ...
        });
    };
    
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.subCategoryBox,
            index === selectedSubCategoryIndex ? styles.selectedBox : null
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
                                <View style={index === selectedCategoryIndex ? styles.selectedIcon : styles.icon}>
                                    <Image
                                        style={{ width: iconSize, height: iconSize }}
                                        source={icon}
                                    />
                                </View>
    
                                <Text style={styles.iconName}>{icon_names[index]}</Text>
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
                        data={industries_content[selectedCategoryIndex].subcategories}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={[
                            styles.subCategoriesList,
                            { transform: [{ translateX: swipeAnimation.interpolate({
                                inputRange: [-1, 1],
                                outputRange: [-50, 50]  // Change this to adjust the amount of translation
                            }) }] }
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
                            <h1 style={styles.headerStyle}>{industries_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].title}</h1>
                            <View style={styles.innerContentWrapper}>    
                                {industries_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].image && (
                                    <Image 
                                        source={industries_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].image}
                                        style={styles.contentImage}
                                    />
                                )}
                                <ScrollView ref={ref} style={styles.contentTextContainer}>
                                    <Text style={styles.contentText}>
                                        {industries_content[selectedCategoryIndex].subcategories[selectedSubCategoryIndex].text}
                                    </Text>
                                
                                </ScrollView>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.smallButton}>
                        <Text>Home</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(219, 3, 252, 0.6)',
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
            borderWidth: 2,
            borderColor: 'transparent',
            borderRadius: 37,
            padding: 3,  // Adjust this value if you want more or less space around the icon
            marginHorizontal: -2,  // This negative margin compensates for the border width to ensure icons don't shift
        },
        selectedIcon: {
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 37,
        },
        iconName: {
            marginTop: 5,
            textAlign: 'center',
            color: 'white',
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
        width: 350,
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
        flex: 1,
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
        color: 'white',
        fontFamily: 'Arial',
        alignSelf: 'center',
        textTransform: 'uppercase',
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
            width: '60%',
            height: '100%',
            padding: 10,
    
        },
      contentText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'justify',
      },
        contentImage: {
            flex: 1,
            width: '40%',
            height: '100%',
            resizeMode: 'cover',
            alignSelf: 'center',
            borderColor: 'black',
            borderWidth: 1,
            margin: 15,
            backgroundColor: 'aqua',
    
        },
      bottomButtons: {
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
    