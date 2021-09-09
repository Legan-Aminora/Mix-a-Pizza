import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {Left, Right, Body, CardItem, ListItem, Thumbnail, Text, Content} from 'native-base';
import {Avatar, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto'
import styles from "../Style";
import {getResource, getResourceCondition} from "../initFirebase";

export default class NotificationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pizzas: []
        }
    }

    async init() {
        const pizzas = await getResourceCondition('pizza', 'like', '==', true)
        this.setState({pizzas})
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {navigation} = this.props
        const {_key, image, name, email} = this.props.route.params

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: "flex-start",
                paddingHorizontal: 10,
                paddingTop: 30
            }}>
                <View style={{flexDirection: "row"}}>
                    <Left style={{flexDirection: "row"}}>
                        <View style={styles.topic}>
                            <Icon
                                size={15}
                                name="bell"
                                color={"white"}
                            />
                            <Text style={styles.title3}>Notificaciones</Text>
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
                <Content>
                    <View style={{backgroundColor: "#FFFFF"}}>
                        <ListItem avatar onPress={() => navigation.navigate('Ordenar')}>
                            <Left>
                                <Thumbnail source={require('../../assets/logo.jpeg')}/>
                            </Left>
                            <Body>
                                <Text style={styles.ListF}>Mix a Pizza Andares</Text>
                                <Text note>Llevas tiempo sin una pizza checa...</Text>
                            </Body>
                            <Right>
                                <Text note>4:20 am</Text>
                            </Right>
                        </ListItem>
                        <ListItem last avatar onPress={() => navigation.navigate('Pago')}>
                            <Left>
                                <Thumbnail source={require('../../assets/logo.jpeg')}/>
                            </Left>
                            <Body>
                                <Text style={styles.ListF}>Mix a Pizza Support</Text>
                                <Text note>Gracias por contactarte a Tech ...</Text>
                            </Body>
                            <Right>
                                <Text note>13:26 pm</Text>
                            </Right>
                        </ListItem>

                        {
                            this.state.pizzas.map(pizza => {
                                return <TouchableOpacity onPress={() => navigation.navigate('PizzaDetail', {pizza})} key={pizza._key}>
                                    <Card>
                                        <Card.Title style={styles.button}>{pizza.name}</Card.Title>
                                        <CardItem cardBody>
                                            <Image
                                                source={{uri: pizza.uri_image}}
                                                style={{height: 200, width: null, flex: 1}}/>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>{pizza.description}</Text>
                                                <Left style={styles.button2}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        marginTop: 5,
                                                        alignItems: 'center'
                                                    }}>
                                                        <Thumbnail source={require('../../assets/logo.jpeg')}/>
                                                        <Text style={styles.YFMAP}>Your Friends{"\n"}Mix a Pizza</Text>
                                                    </View>
                                                </Left>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </Content>
            </View>
        )
    }
}
