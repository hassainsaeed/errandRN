import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../pages/auth/login'
import SignUpScreen from '../pages/auth/signup'

const Stack = createStackNavigator();

class AuthNavigator extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
    }

    render() {
        return(
            <Stack.Navigator initialRouteName="LogIn">
                <Stack.Screen 
                    name="LogIn" 
                    component={LogInScreen} 
                    options={{
                        title: 'Welcome to Errand',
                        headerStyle: {
                            backgroundColor: '#33D5FF',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUpScreen}
                    options={{
                        title: 'Sign Up for Errand',
                        headerStyle: {
                            backgroundColor: '#33D5FF',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        )
    }
}




export default AuthNavigator;