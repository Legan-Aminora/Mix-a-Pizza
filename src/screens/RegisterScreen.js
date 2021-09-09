import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native'
import { Container, Text, Icon, Thumbnail, Input, Item } from 'native-base';
import styles from "../Style";
import {addDocumentToResource} from '../initFirebase'
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

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            notifications: false,
            touchId: false,
            facebook: false,
            google: false,
            apple: false,
            activities: false,
            helper: true,
            image: '',
            token: null,
            role: 'client'
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

    async addTask(){
        const docRef = await addDocumentToResource('user', this.state)
        this.props.navigation.navigate('FingerPrint', {docRef})
    }

    render() {
        const { navigation } = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        return (
            <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#cb333b'
                }}>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View>
                            <StatusBar style="auto"/>
                        </View>
                        <View style={{
                            width: windowWidth,
                            height: 3*windowHeight/4,
                            backgroundColor: 'white',
                            borderTopLeftRadius:30,
                            borderTopRightRadius:30,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <View style={{ flex:2/3, width: windowWidth, paddingHorizontal: windowWidth/10, alignItems: "center", justifyContent: "space-around"}}>
                                <Item>
                                    <Icon name='person' />
                                    <Input placeholder='Nombre' value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                                </Item>
                                <Item>
                                    <Icon name='phone-portrait' />
                                    <Input placeholder='Teléfono' value={this.state.phone} onChangeText={(phone) => this.setState({phone})}/>
                                </Item>
                                <Item>
                                    <Icon name='mail' />
                                    <Input placeholder='Correo' value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                                </Item>
                                <Item>
                                    <Icon name='lock' />
                                    <Input secureTextEntry={true} placeholder='Contraseña' value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                                </Item>
                            </View>
                            <View style={{ flex: 1/5, width: windowWidth, alignItems: "center", justifyContent: "center"}}>
                                <TouchableOpacity
                                    onPress={() => this.addTask()}
                                    style={styles.button}>
                                    <Text style={styles.title2}>Registrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <Text>
                                    ¿Ya tienes cuenta?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                    transparent>
                                    <Text style={styles.link}>Iniciar sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            height: (3*windowHeight/4)+40,
                            alignItems: "center",
                            width: windowWidth,
                            position: "absolute"
                        }}>
                            <Thumbnail large source={require('../../assets/logo.jpeg')} style={{
                                borderWidth: 1,
                                borderColor: '#ddd'
                            }}/>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}
