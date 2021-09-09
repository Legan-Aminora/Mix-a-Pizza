import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {DeckSwiper, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from "../Style"

const cards = [
    {
        text: 'Deliciosa pizza de quesos',
        name: 'Pizza de 3 quesos',
        price: 100,
        image: require('../TinderPromo/T1.jpg'),
    },
    {
        text: 'Exquisita pizza con una salsa especial',
        name: 'Deep Deep Deli',
        price: 120,
        image: require('../TinderPromo/T2.jpg'),
    },
    {
        text: 'Pizza dividida en 6 deliciosas partes',
        name: 'Six Pack',
        price: 150,
        image: require('../TinderPromo/T3.jpg'),
    },
    {
        text: 'Deliciosa y saludable pizza con calabazas',
        name: 'Calabacitas Yummy',
        price: 100,
        image: require('../TinderPromo/T4.jpg'),
    },
    {
        text: 'Pizza elegante de carnes deliciosas',
        name: 'Monday Nights',
        price: 150,
        image: require('../TinderPromo/T5.jpg'),
    },
];
export default class CouponsScreen extends Component {
    render() {
        const { navigation } = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        return (
            <View style={{flex: 1, justifyContent: "center", paddingTop: 25, backgroundColor: '#cb333b',}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection:"row"}}>
                        <Left style={{flexDirection:"row"}}>
                            <TouchableOpacity
                                onPress={() => navigation.pop()}
                                style={styles.topic}
                            >
                                <Icon
                                    size={15}
                                    name="arrow-left"
                                    color={"white"}
                                />
                                <Text style={styles.title3}>Ofertas del Dia</Text>
                            </TouchableOpacity>
                        </Left>
                    </View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderEmpty={() =>
                            <View style={{alignSelf: "center"}}>
                                <Text>Over</Text>
                            </View>
                        }
                        renderItem={item =>
                            <Card style={{elevation: 5}}>
                                <Card.Title style={styles.button}>{item.name}</Card.Title>
                                <CardItem cardBody>
                                    <Image style={{height: 250, flex: 1}} source={item.image}/>
                                </CardItem>
                                <CardItem >
                                    <Left>
                                        <Thumbnail source={require('../../assets/logo.jpeg')}/>
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text>Precio ${item.price}</Text>
                                            <Text note>Mix a Pizza Andares</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        }
                    />
                    <View style={{
                        width: windowWidth,
                        justifyContent: 'space-between',
                        alignItems: "center",
                        flexDirection: "row",
                        flex: 1,
                        paddingTop: 425,
                        paddingHorizontal: 10
                    }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#cfb7a2",
                                flexDirection: "row",
                                width: 2 * windowWidth / 5,
                                height: windowHeight / 18,
                                alignItems: "center",
                                justifyContent: "space-around",
                                borderRadius: 30
                            }}
                            onPress={() => this._deckSwiper._root.swipeLeft()}
                        >
                            <Icon name="arrow-left"
                                  color="white"
                                  size={20}/>
                            <Text>Meh!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3CBE52",
                                flexDirection: "row",
                                width: 2 * windowWidth / 5,
                                height: windowHeight / 18,
                                alignItems: "center",
                                justifyContent: "space-around",
                                borderRadius: 30
                            }}
                            onPress={() => this._deckSwiper._root.swipeRight()}
                        >
                            <Text>Pizza Time!!!</Text>
                            <Icon name="pizza-slice"
                                  color="white"
                                  size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}