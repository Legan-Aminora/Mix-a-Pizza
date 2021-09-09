import React from "react";
import {View} from 'react-native'
import {Container, Separator, ListItem, Switch, Text, Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import styles from "../Style";
import {getResourceWhere, updateUserSetting} from "../initFirebase";

export default class ProfileSettingScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: false,
            touchId: false,
            facebook: false,
            google: false,
            apple: false,
            activities: false,
            helper: false
        }
    }

    async init() {
        const {
            notifications,
            touchId,
            facebook,
            google,
            apple,
            activities,
            helper
        } = await getResourceWhere('user', this.props.route.params._key)

        this.setState({
            notifications: notifications,
            touchId: touchId,
            facebook: facebook,
            google: google,
            apple: apple,
            activities: activities,
            helper: helper
        })
    }

    componentDidMount() {
        this.init()
    }

    render() {
        return (
            <Container>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: "flex-start",
                }}>
                    <Separator>
                        <Text style={styles.MidField}>Configuraciones</Text>
                    </Separator>
                    <ListItem avatar>
                        <Body>
                            <Text style={styles.ListF}>Permitir mandar notificaciones</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.notification ? "#fff" : "#fff"}
                                value={this.state.notifications}
                                onValueChange={async () => {
                                    await this.setState({notifications: !this.state.notifications})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem last avatar>
                        <Body>
                            <Text style={styles.ListF}>Usar Touch ID</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.touchId ? "#fff" : "#fff"}
                                value={this.state.touchId}
                                onValueChange={async () => {
                                    await this.setState({touchId: !this.state.touchId})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text style={styles.MidField}>Redes Sociales</Text>
                    </Separator>
                    <ListItem avatar>
                        <Left>
                            <Icon name="logo-facebook" size={45}/>
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>Conectar con Facebook</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.facebook ? "#fff" : "#fff"}
                                value={this.state.facebook}
                                onValueChange={async () => {
                                    await this.setState({facebook: !this.state.facebook})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem avatar>
                        <Left>
                            <Icon name="logo-google" size={42}/>
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>Conectar con Google</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.google ? "#fff" : "#fff"}
                                value={this.state.google}
                                onValueChange={async () => {
                                    await this.setState({google: !this.state.google})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem last avatar>
                        <Left>
                            <Icon name="logo-apple" size={55}/>
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>Conectar con Apple</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.apple ? "#fff" : "#fff"}
                                value={this.state.apple}
                                onValueChange={async () => {
                                    await this.setState({apple: !this.state.apple})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text style={styles.MidField}>Otros</Text>
                    </Separator>
                    <ListItem avatar>
                        <Body>
                            <Text style={styles.ListF}>Actividades</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.activities ? "#fff" : "#fff"}
                                value={this.state.activities}
                                onValueChange={async () => {
                                    await this.setState({activities: !this.state.activities})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem last avatar>
                        <Body>
                            <Text style={styles.ListF}>Ayuda de inicio</Text>
                        </Body>
                        <Right style={{alignItems: "center", flexDirection: "row"}}>
                            <Switch
                                trackColor={{false: "#DB7C81", true: "#CB333B"}}
                                thumbColor={this.state.helper ? "#fff" : "#fff"}
                                value={this.state.helper}
                                onValueChange={async () => {
                                    await this.setState({helper: !this.state.helper})
                                    await updateUserSetting('user', this.props.route.params._key, this.state)
                                }}
                            />
                        </Right>
                    </ListItem>
                </View>
            </Container>
        )
    }
}
