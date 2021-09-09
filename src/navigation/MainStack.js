import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CreatePizzaScreen from '../screens/CreatePizzaScreen'
import CallScreen from '../screens/CallScreen'
import FingerPrintScreen from '../screens/FingerPrintScreen'
import PhoneVerifyScreen from '../screens/PhoneVerifyScreen'
import TabScreen from './TabScreen'
import BranchOfficeScreen from "../screens/BranchOfficeScreen";
import HelpScreen1 from "../screens/HelpScreen1";
import ProfileSettingScreen from "../screens/ProfileSettingScreen";
import PizzaDetailScreen from "../screens/PizzaDetailScreen";
import CreatePizzaSettingsScreen from "../screens/CreatePizzaSettingsScreen";
import CouponsScreen from '../screens/CouponsScreen';
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import PurchaseDetailScreen from "../screens/PurchaseDetailScreen";
import MapScreen from "../screens/MapScreen";


const Stack = createStackNavigator();

export default class MainStack extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="FingerPrint" component={FingerPrintScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="PhoneVerify" component={PhoneVerifyScreen} options={{headerShown: false}}/>

                    <Stack.Screen name="Help1" component={HelpScreen1} options={{headerShown: false}}/>

                    <Stack.Screen name="Tab" component={TabScreen} options={{headerShown: false}}/>

                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="BranchOffice" component={BranchOfficeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="PizzaDetail" component={PizzaDetailScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="CreatePizza" component={CreatePizzaScreen}  options={{headerShown: false}}/>

                    <Stack.Screen name="Checkout" component={CheckoutScreen}  options={{headerShown: false}}/>
                    <Stack.Screen name="Call" component={CallScreen}  options={{headerShown: false}}/>

                    <Stack.Screen name="Profile" component={ProfileScreen}  options={{headerShown: false}}/>
                    <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen}  options={{headerShown: false}}/>

                    <Stack.Screen name="Coupon" component={CouponsScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="PurchaseDetail" component={PurchaseDetailScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="CreatePizzaSettings" component={CreatePizzaSettingsScreen} options={{headerShown: false}}/>

                    <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
