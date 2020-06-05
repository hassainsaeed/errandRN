import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator'

const Stack = createStackNavigator();

class RootNavigator extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Auth">
                    <Stack.Screen 
                        name="Auth" 
                        component={AuthNavigator}
                        options={{
                            headerShown: false
                        }} 
                    />
                    <Stack.Screen 
                        name="App" 
                        component={AppNavigator}
                        options={{
                            headerShown: false
                        }}  
                    />
                </Stack.Navigator>
                <FlashMessage position="top" />
            </NavigationContainer>
        );
    }
}

export default RootNavigator;