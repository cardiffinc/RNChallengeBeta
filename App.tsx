/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

Amplify.configure(awsconfig);
const Tab = createBottomTabNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarIconStyle: { display: "none" }, tabBarLabelPosition: 'beside-icon'}}>
        <Tab.Screen name="Zeller" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
