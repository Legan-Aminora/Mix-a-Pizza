import React from "react";
import {View, Text, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {Body, Left, ListItem, Right, Thumbnail} from "native-base";
import styles from "../Style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Avatar} from "react-native-elements";
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from '../noti'
import {StatusBar} from 'expo-status-bar'
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import {makeCall} from "../components";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default class MapScreen extends React.Component {

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
        this.setState({notification: notification});
    };

    _handleNotificationResponse = response => {
        console.log(response);
    };

    render() {
        const {_key, image, name, email, userAddress, total, branchOffice, type, delivery, userLatitude, userLongitude} = this.props.route.params
        const {navigation} = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        return (
            <View style={{
                flex: 1,
                justifyContent: "flex-start",
                paddingHorizontal: 10,
                paddingTop: 30,
                backgroundColor:"#fff"
            }}>
                <View style={{flexDirection: "row"}}>
                    <View>
                        <StatusBar style="auto"/>
                    </View>
                    <Left style={{flexDirection: "row"}}>
                        <View style={styles.topic}>
                            <Icon
                                size={15}
                                name='map'
                                color={"white"}
                            />
                            <Text style={styles.title3}>{userAddress.substr(0, 12)}...</Text>
                        </View>
                    </Left>
                    <Right>
                        <Avatar
                            size="medium"
                            onPress={() => navigation.navigate('Profile', {
                                _key: _key,
                                image: image,
                                name: name,
                                email: email
                            })}
                            rounded
                            source={{uri: image}}
                            containerStyle={{marginTop: 0,}}
                        />
                    </Right>
                </View>
                {
                    console.log(userLatitude, userLongitude)
                }
                <View style={{flex: 1}}>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}>
                        <MapView
                            initialRegion={{
                                latitude: 20.7105,
                                longitude: -103.4127,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{
                                width: windowWidth-20,
                                height: (windowHeight/2) - 40,
                            }}
                        >
                            {
                                branchOffice.map(branch => {
                                    return <Marker
                                        coordinate={{
                                            latitude: branch.latitude,
                                            longitude: branch.longitude,
                                        }}
                                        title={branch.name}
                                        description={branch.address.substr(0, 30) + "..."}
                                    />
                                })
                            }
                            <Marker
                                coordinate={{
                                    latitude: userLatitude,
                                    longitude: userLongitude,
                                }}
                                title={userAddress}
                                description={userAddress.substr(0, 30) + "..."}
                            />
                        </MapView>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{
                            flex: 1.3,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row"
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <ListItem avatar>
                                    <Left>
                                        <Avatar
                                            size="large"
                                            source={{uri: image}}/>
                                    </Left>
                                    <Body>
                                        <Text style={styles.user}>{name}</Text>
                                        <Text style={styles.details}>Tardará 35 min en llegar el pedido</Text>
                                        <Text style={styles.details}>{userAddress}</Text>

                                    </Body>
                                </ListItem>
                            </View>
                        </View>
                        <View style={{
                            flex: 2,
                            backgroundColor: "white",
                            justifyContent: "center",
                        }}>
                            <ListItem icon>
                                <Left>
                                    <Icon active name="wallet"
                                          size={20}/>
                                </Left>
                                <Body>
                                    <Text>$ {total}</Text>
                                </Body>
                                <Right>
                                    <Text>Pago con {type}</Text>
                                </Right>
                            </ListItem>
                            {
                                branchOffice.map(address => {
                                    return  <ListItem icon key={address._key}>
                                        <Left>
                                            <Icon active name="truck-fast"
                                                  size={20}/>
                                        </Left>
                                        <Body>
                                            <Text>{address.name}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                        <View style={{
                            flex: 1.25,
                            backgroundColor: "white",
                            justifyContent: "center",
                        }}>
                            {
                                delivery.map(user => {
                                    return <ListItem avatar key={user._key}>
                                        <Left>
                                            <Avatar
                                                size='medium'
                                                source={{uri: user.image}}/>
                                        </Left>
                                        <Body>
                                            <Text>{user.name}</Text>
                                        </Body>
                                        <Right>
                                            <Text>Tú repartidor</Text>
                                        </Right>
                                    </ListItem>
                                })
                            }
                        </View>
                        <Text style={styles.text}>Contacto</Text>

                        <View style={{
                            flex: 1,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>

                            {
                                delivery.map(user => {
                                    return <View style={{flexDirection: 'row'}} key={user._key}>
                                        <Left>
                                            <TouchableOpacity
                                                style={styles.button4}
                                                onPress={() => makeCall(user.phone)}
                                            >
                                                <Icon
                                                    size={30}
                                                    name='phone'
                                                    color={"#cb333b"}
                                                />
                                            </TouchableOpacity>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity style={styles.button4}>
                                                <Icon
                                                    size={30}
                                                    name='message'
                                                    color={"#cb333b"}
                                                />
                                            </TouchableOpacity>
                                        </Right>
                                    </View>
                                })
                            }

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
