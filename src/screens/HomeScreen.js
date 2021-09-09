import React from 'react'
import {View, Image, Dimensions, TouchableOpacity} from 'react-native'
import {Container, ListItem, Thumbnail, Text, Left, Body, Right, Content} from 'native-base';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto'
import styles from "../Style";
import ListSection from "react-native-paper/src/components/List/ListSection";
import {getResource, getResourceCondition, getResourceWhere} from "../initFirebase";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            branchOffices: [],
            promotion: [],
            offer: []
        }
    }

    async init() {
        const branchOffices = await getResource('branch_office')
        const promotion = await getResourceCondition('pizza', 'promotion', '==', true)
        const offer = await getResourceCondition('pizza', 'offer', '==', true)
        this.setState({
            branchOffices: branchOffices,
            promotion: promotion,
            offer: offer
        })
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {navigation} = this.props
        const windowWidth = Dimensions.get('window').width;
        const {_key, image, name, email} = this.props.route.params
        return (
            <Container>
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
                                    name='shopping-store'
                                    color={"white"}
                                />
                                <Text style={styles.title3}>Sucursales</Text>
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
                        <View style={{flex: 2 / 3}}>
                            {
                                this.state.branchOffices.map((branchOffice) => {
                                    return <ListItem
                                        thumbnail
                                        onPress={() => navigation.navigate('BranchOffice', {branchOffice})}
                                        key={branchOffice._key}
                                    >
                                        <Left>
                                            <Image
                                                source={require(`../../assets/sucursal1.png`)}
                                                style={{
                                                    width: 70,
                                                    resizeMode: 'contain',
                                                    height: 70,
                                                    borderRadius: 20
                                                }}
                                            />
                                        </Left>
                                        <Body>
                                            <Text style={{fontWeight: 'bold'}}>{branchOffice.name}</Text>
                                            <Text note>{branchOffice.address}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>Historial</Text>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        large
                                        source={{uri: 'https://emprendomas.com/wordpress/wp-content/uploads/2016/04/Pizza-Hut-hastala-pizza-necesita-innovaci%C3%B3n-WPress.jpg'}}
                                    />
                                </Left>
                                <Body>
                                    <Text style={{fontWeight: 'bold'}}>Pizza y vida</Text>
                                    <Text note style={{fontWeight: 'bold'}}>Mix a Pizza Andares</Text>
                                    <Text note>27/12/2020</Text>
                                    <Text style={styles.precio}>$ 120</Text>
                                </Body>
                            </ListItem>
                        </View>
                        <View style={{flex: 1}}>
                            <ListSection style={{flexDirection: "row"}}>
                                <Left>
                                    <Text style={styles.text}>Ofertas del día</Text>
                                </Left>
                                <Right>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Coupon')}
                                        transparent
                                    >
                                        <Text style={styles.link}>Más opciones</Text>
                                    </TouchableOpacity>
                                </Right>
                            </ListSection>
                            {
                                this.state.offer.map(pizza => {
                                    return <ListItem
                                        thumbnail
                                        onPress={() => navigation.navigate('PizzaDetail', {pizza})}
                                        key = {pizza._key}
                                    >
                                        <Left>
                                            <Thumbnail
                                                rounded
                                                large
                                                source={{uri: pizza.uri_image}}
                                            />
                                        </Left>
                                        <Body>
                                            <Text style={{fontWeight: 'bold'}}>{pizza.name}</Text>
                                            <Text note style={{fontWeight: 'bold'}}>Mix a Pizza Andares</Text>
                                            <Text note numberOfLines={1}>1 día tarde</Text>
                                            <Text style={styles.precio}>$ {pizza.actual_price}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                        <View style={{flex: 1, alignItems: "center"}}>
                            {
                                this.state.promotion.map(pizza => {
                                    return <TouchableOpacity
                                        onPress={() => navigation.navigate('PizzaDetail', {pizza})}
                                        transparent
                                        key = {pizza._key}
                                    >
                                        <Image
                                            source={{uri: pizza.uri_image}}
                                            style={{
                                                height: 200,
                                                width: windowWidth - 20,
                                                borderRadius: 30
                                            }}
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </Content>
                </View>
            </Container>
        )
    }
}
