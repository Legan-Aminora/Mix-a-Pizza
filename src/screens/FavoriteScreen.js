import React from 'react'
import { View } from 'react-native'
import { Container, Content, ListItem, Text, Left, Body,Separator, Right, Thumbnail } from 'native-base';
import { Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from "../Style";
import {getResource} from '../initFirebase'

export default class FavoriteScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pizza: []
        }
    }

    async init() {
        const pizza = await getResource('pizza')
        this.setState({pizza})
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const { navigation } = this.props
        const {_key, image, name, email} = this.props.route.params

        return (
            <Container>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: "flex-start",
                    paddingHorizontal: 10,
                    paddingTop:30
                }}>
                    <View style={{flexDirection:"row"}}>
                        <Left style={{flexDirection:"row"}}>
                            <View style={styles.topic}>
                                <Icon
                                    size={15}
                                    name="heart"
                                    color={"white"}
                                />
                                <Text style={styles.title3}>Favoritos</Text>
                            </View>
                        </Left>
                        <Right>
                            <Avatar
                                size="medium"
                                onPress={() => navigation.navigate('Profile', {_key: _key, image: image, name: name, email: email})}
                                rounded
                                source={{ uri: image}}
                                containerStyle={{ marginTop: 0,}}
                            />
                        </Right>
                    </View>
                
                    <Content style={{ backgroundColor: "#FFFFF" }}>
                        <Separator>
                            <Text style={styles.MidField}>Mix a Pizza Andares</Text>
                        </Separator>
                        {
                            this.state.pizza.map((pizza) => {
                                return <ListItem avatar onPress={() => navigation.navigate('PizzaDetail', {pizza})} key={pizza._key}>
                                    <Left>
                                        <Thumbnail source={{uri: pizza.uri_image}}/>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{pizza.name}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.textOrderRed2}>$ {pizza.actual_price}</Text>
                                    </Right>
                                </ListItem>
                            })
                        }
                    </Content>
                </View>
            </Container>
        )
    }
}
