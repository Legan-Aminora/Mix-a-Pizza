import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import NotificationScreen from '../screens/NotificationScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import CreatePizzaScreen from "../screens/CreatePizzaScreen"
import PurchaseScreen from "../screens/PurchaseScreen";

const Tab = createMaterialBottomTabNavigator();

export default class TabScreen extends React.Component {
    render() {
        const {user} = this.props.route.params
        return (
            <Tab.Navigator activeColor="#D93E11" inactiveColor="#949494" barStyle={{ backgroundColor: '#F4F9FA' }}>
                <Tab.Screen
                    name="Menú"
                    component={HomeScreen}
                    initialParams={user}
                    options={{
                        tabBarIcon: ({ color}) => <TabBarIcon name="ios-home" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Notificación"
                    component={NotificationScreen}
                    initialParams={user}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications" color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Pago"
                    component={PurchaseScreen}
                    initialParams={user}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="ios-cart" color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Favoritos"
                    component={FavoriteScreen}
                    initialParams={user}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="ios-heart" color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Ordenar"
                    component={CreatePizzaScreen}
                    initialParams={user}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="ios-wallet" color={color} />,
                    }}
                />
            </Tab.Navigator>
        )
    }
}

function TabBarIcon(props) {
    return <Ionicons size={30} style={{ marginBottom: -10 }} {...props} />;
}