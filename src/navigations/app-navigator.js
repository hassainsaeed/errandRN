import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RunScreen from '../pages/run';
import ReceiveScreen from '../pages/receive';
import React, { Component } from 'react';

const Tab =  createBottomTabNavigator();

class AppNavigator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Tab.Navigator initialRouteName="Run">
                <Tab.Screen name="Run" component={RunScreen} />
                <Tab.Screen name="Receive" component={ReceiveScreen} />
            </Tab.Navigator>
        )
    }
}


export default AppNavigator;