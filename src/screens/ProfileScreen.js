import React from 'react'
import {View} from 'react-native'
import { Container, Button, ListItem, Text, Left, Body, Right, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from "../Style";

export default class ProfileScreen extends React.Component {
    render() {
        const { navigation } = this.props
        const {_key, image, name, email} = this.props.route.params

        return (
            <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#cb333b',
                    paddingHorizontal: 10
                }}>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flex: 3/7, justifyContent: "center"}}>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail large source={{ uri: image }} />
                                </Left>
                                <Body>
                                    <Text style={styles.perfil}>{name}</Text>
                                    <Text style={styles.perfil2} >{email}</Text>
                                </Body>
                                <Right>
                                    <Icon
                                        size={25}
                                        name="cog"
                                        color={"black"}
                                        onPress={() => navigation.navigate('ProfileSetting', {_key})}
                                    />
                                </Right>
                            </ListItem>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            justifyContent: "center",
                            paddingHorizontal: 10
                        }}>
                            <View style={{ flex: 4/5, justifyContent: "space-around" }}>
                                <ListItem icon onPress={() => navigation.navigate('ProfileInfo', {_key})}>
                                    <Left>
                                        <Button transparent>
                                            <Icon size={20} name="address-card" color={"#cb333b"}/>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Administrar información</Text>
                                    </Body>
                                    <Right>
                                        <Icon size={20} name="angle-right"  color={"#cb333b"} />
                                        </Right>
                                </ListItem>
                                <ListItem icon onPress={() => navigation.navigate('Pago')}>
                                    <Left>
                                        <Button transparent>
                                            <Icon size={20}  name="directions"  color={"#cb333b"} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Pedidos</Text>
                                    </Body>
                                    <Right>
                                        <Icon size={20}  name="angle-right" color={"#cb333b"} />
                                    </Right>
                                </ListItem>
                                <ListItem icon onPress={() => navigation.navigate('Favoritos')}>
                                    <Left>
                                        <Button transparent>
                                            <Icon size={20}  name="heart" color={"#cb333b"} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Favoritos</Text>
                                    </Body>
                                    <Right>
                                        <Icon size={20}  name="angle-right" color={"#cb333b"} />
                                    </Right>
                                </ListItem>
                                <ListItem icon onPress={() => navigation.navigate('Coupon')}>
                                    <Left>
                                        <Button transparent>
                                            <Icon size={20}  name="gifts" color={"#cb333b"} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Promociones</Text>
                                    </Body>
                                    <Right>
                                        <Icon size={20}  name="angle-right" color={"#cb333b"}
                                        onPress={() => navigation.navigate('Coupon')}/>
                                    </Right>
                                </ListItem>
                                <ListItem icon onPress={() => navigation.popToTop()}>
                                    <Left>
                                        <Button transparent>
                                            <Icon size={20}  name="running" color={"#cb333b"} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Cerrar sesion</Text>
                                    </Body>
                                    <Right>
                                        <Icon size={20} name="angle-right"
                                            color={"#cb333b"}
                                            onPress={() => navigation.popToTop()}/>
                                    </Right>
                                </ListItem>
                            </View>
                        </View>
                    </View>
                </View>
            </Container>   
        )
    }
}
