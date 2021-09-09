import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native'
import {Container, CardItem, Text, Icon, Right, Thumbnail, Input, Item} from 'native-base';
import styles from "../Style";
import * as Facebook from 'expo-facebook';
import {getResource} from "../initFirebase";
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            users: []
        }
    }

    async logInGoogle() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "277473586248-dorado2e235i965iek5henkn2u9djat7.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            })

            if (result.type === 'success') {
                alert(result.accessToken)
                console.log(result.accessToken)
                return result.accessToken
            }
            else {return { cancelled: true }}
        } catch {return { error: true }}
    }

    async init() {
        const users = await getResource('user')
        this.setState({users})
    }

    componentDidMount() {
        this.init()
    }

    async logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '359706178461497',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                console.log('response', response)
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        const {navigation} = this.props
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
                        <View style={{
                            width: windowWidth,
                            height: 3 * windowHeight / 4,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <View style={{flex: 2 / 3, alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.title}>Inicia sesión!</Text>
                                <Text style={styles.content}>Bienvenido de vuelta, te extrañamos</Text>
                            </View>
                            <View style={{
                                width: windowWidth,
                                paddingHorizontal: windowWidth / 10,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Item>
                                    <Icon name='person'/>
                                    <Input placeholder='Email' value={this.state.email}
                                           onChangeText={(email) => this.setState({email})}/>
                                </Item>
                                <Item>
                                    <Icon name='lock'/>
                                    <Input secureTextEntry={true} placeholder='Contraseña' value={this.state.password}
                                           onChangeText={(password) => this.setState({password})}/>
                                    <Text style={styles.link}>¿La olvidaste?</Text>
                                </Item>
                            </View>
                            <View style={{width: windowWidth, justifyContent: "center", flex: 1 / 3}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.state.users.map((user) => {
                                            if (user.email === this.state.email) {
                                                if (user.password === this.state.password) {
                                                    if (user.helper) {
                                                        return navigation.navigate('Help1', {user})
                                                    } else {
                                                        return navigation.navigate('Tab', {user})
                                                    }
                                                } else {
                                                    return alert("Correo o contraseña incorrecta")
                                                }
                                            }
                                        })
                                    }}
                                    style={styles.button}>
                                    <Text style={styles.title2}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: windowWidth, paddingHorizontal: windowWidth / 10}}>
                                <TouchableOpacity
                                    onPress={this.logIn}
                                >
                                    <CardItem style={{justifyContent:"center"}}>
                                        <Icon active name="logo-facebook" />
                                        <Text>Acceder con Facebook</Text>
                                        <Right>
                                            <Icon name="arrow-forward"/>
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.logInGoogle}
                                >
                                    <CardItem style={{justifyContent:"center"}}>
                                        <Icon active name="logo-google" />
                                        <Text>Acceder con Google</Text>
                                        <Right>
                                            <Icon name="arrow-forward"/>
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1 / 3, alignItems: "center"}}>
                                <Text>
                                    ¿No estas registrado?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Register')}
                                    transparent>
                                    <Text style={styles.link}>Registrate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            height: (3 * windowHeight / 4) + 40,
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