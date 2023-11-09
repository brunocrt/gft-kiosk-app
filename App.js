import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';

import OfferingsScreen from './OfferingsScreen';
import IndustriesScreen from './IndustriesScreen';
import GftAwsScreen from './GftAwsScreen';
import SuccessScreen from './SuccessScreen';
import Screen0 from './Screen0';
import AI from './AIScreen';
import AI_DA from './AI_DA';

const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      scale: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
                overlayStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
          }}
        >
          <Stack.Screen name="Home" component={Screen0} options={{ headerShown: false }} />
          <Stack.Screen name="Offerings" component={OfferingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GftAws" component={GftAwsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Industries" component={IndustriesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AI" component={AI} options={{ headerShown: false }} />
          <Stack.Screen name="AI_DA" component={AI_DA} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default App;
