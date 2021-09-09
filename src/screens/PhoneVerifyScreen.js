import React from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import {Container, Input, Item} from "native-base";
import Icon from 'react-native-vector-icons/Feather'
import styles from "../Style";
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync } from '../noti'
import {StatusBar} from 'expo-status-bar'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default class PhoneVerifyScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }

    async componentDidMount() {
        const token = await registerForPushNotificationsAsync();
        Clipboard.setString(token)
        this.setState({token})
        Notifications.addNotificationReceivedListener(this._handleNotification);
        Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    }

    _handleNotification = notification => {
        this.setState({ notification: notification });
    };

    _handleNotificationResponse = response => {
        console.log(response);
    };

    render() {
        const { navigation } = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        return (
            <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#cb333b',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{ width: windowWidth, alignItems: "center" }}>
                        <View>
                            <StatusBar style="auto"/>
                        </View>
                        <Text style={styles.title2}>Iniciemos</Text>
                        <Text style={styles.content2}>Crea una cuenta para continuar</Text>
                        <View style={{
                            height:windowHeight/2,
                            backgroundColor:"#fff",
                            width:windowWidth-85,
                            justifyContent:"center",
                            alignItems:"center",
                            borderRadius:40,
                            paddingHorizontal:20
                        }}>
                            <Item>
                                <Icon
                                    size={20}
                                    name='phone'
                                />
                                <Input placeholder='Number'/>
                            </Item>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            style={styles.button}>
                            <Text style={styles.title2}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}
