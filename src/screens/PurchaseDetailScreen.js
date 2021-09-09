import React from "react";
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Right, Left, Body, ListItem, Content} from 'native-base';
import styles from "../Style"
import Icon from 'react-native-vector-icons/FontAwesome'
import {Overlay} from "react-native-elements";
import {getResourceCondition, getResourceTwoCondition} from "../initFirebase";

export default class PurchaseDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            creditShow: false,
            debitShow: false,
            payPalShow: false,
            credit: [],
            debit: [],
            payPal: [],
            delivery: []
        }
    }

    async init() {
        const credit = await getResourceTwoCondition(
            'card',
            'user_id',
            "==",
            this.props.route.params._key,
            'type',
            '==',
            'credit'
        )
        const debit = await getResourceTwoCondition(
            'card',
            'user_id',
            "==",
            this.props.route.params._key,
            'type',
            '==',
            'debit'
        )
        const payPal = await getResourceTwoCondition(
            'card',
            'user_id',
            "==",
            this.props.route.params._key,
            'type',
            '==',
            'payPal'
        )
        const delivery = await getResourceCondition('user', 'role', '==', 'delivery')
        this.setState({
            credit: credit,
            debit: debit,
            payPal: payPal,
            delivery: delivery
        })
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {navigation} = this.props
        const windowHeight = Dimensions.get('window').height;
        const {_key, image, name, email, userAddress, total, branchOffice, userLatitude, userLongitude} = this.props.route.params

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: "center",
                justifyContent: "space-around",
                paddingVertical: windowHeight / 5
            }}>
                <ListItem
                    icon
                    style={styles.buttonTB}
                    onPress={() => this.setState({debitShow: !this.state.debitShow})}
                >
                    <Left style={{width: 60, height: 30, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="bank" size={30}/>
                    </Left>
                    <Body>
                        <Text style={styles.MP}>Tarjeta de Debito</Text>
                    </Body>
                    <Right>
                        <Icon name="chevron-right"/>
                    </Right>
                </ListItem>

                <ListItem
                    icon
                    style={styles.buttonTC}
                    onPress={() => this.setState({creditShow: !this.state.creditShow})}
                >
                    <Left style={{width: 60, height: 30, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="cc-mastercard" size={30}/>
                    </Left>
                    <Body>
                        <Text style={styles.MP}>Tarjeta de Credito</Text>
                    </Body>
                    <Right>
                        <Icon name="chevron-right"/>
                    </Right>
                </ListItem>

                <ListItem
                    icon
                    style={styles.buttonE}
                    onPress={() => navigation.navigate('Map', {
                        _key: _key,
                        image: image,
                        name: name,
                        email: email,
                        userAddress: userAddress,
                        total: total,
                        branchOffice: branchOffice,
                        type: 'Efectivo',
                        delivery: this.state.delivery,
                        userLongitude: userLongitude,
                        userLatitude: userLatitude
                    })}
                >
                    <Left style={{width: 60, height: 30, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="dollar" size={30}/>
                    </Left>
                    <Body>
                        <Text style={styles.MP}>Efectivo</Text>
                    </Body>
                    <Right>
                        <Icon name="chevron-right"/>
                    </Right>
                </ListItem>

                <ListItem
                    icon
                    style={styles.buttonPP}
                    onPress={() => this.setState({payPalShow: !this.state.payPalShow})}
                >
                    <Left style={{width: 60, height: 30, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="paypal" size={30}/>
                    </Left>
                    <Body>
                        <Text style={styles.MP}>PayPal</Text>
                    </Body>
                    <Right>
                        <Icon name="chevron-right"/>
                    </Right>
                </ListItem>

                <Overlay
                    isVisible={this.state.debitShow}
                    overlayStyle={{
                        height: "70%",
                        width: "90%",
                    }}
                >
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.overlayTitle}>Seleccionar tarjeta de debito</Text>
                    </View>
                    <Content>
                        <View style={{flex: 10}}>
                            {
                                this.state.debit.map(card => {
                                    return <ListItem avatar key={card._key} onPress={() => {
                                        this.setState({debitShow: !this.state.debitShow})
                                        navigation.navigate('Map', {
                                            _key: _key,
                                            image: image,
                                            name: name,
                                            email: email,
                                            userAddress: userAddress,
                                            total: total,
                                            branchOffice: branchOffice,
                                            type: 'Tarjeta de debito',
                                            delivery: this.state.delivery,
                                            userLongitude: userLongitude,
                                            userLatitude: userLatitude
                                        })
                                    }}>
                                        <Left>
                                            <Icon size={25} name="credit-card" color={"black"}/>
                                        </Left>
                                        <Body>
                                            <Text style={styles.ListF}>**** ****
                                                **** {card.card.substr(card.card.length - 4)}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                    </Content>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            style={styles.button3Gray}
                            onPress={() => {
                                this.setState({debitShow: !this.state.debitShow})
                            }}
                        >
                            <Text style={styles.textOrderGrey}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.creditShow}
                    overlayStyle={{
                        height: "70%",
                        width: "90%",
                    }}
                >
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.overlayTitle}>Seleccionar tarjeta de crédito</Text>
                    </View>
                    <Content>
                        <View style={{flex: 10}}>
                            {
                                this.state.credit.map(card => {
                                    return <ListItem avatar key={card._key} onPress={() => {
                                        this.setState({creditShow: !this.state.creditShow})
                                        navigation.navigate('Map', {
                                            _key: _key,
                                            image: image,
                                            name: name,
                                            email: email,
                                            userAddress: userAddress,
                                            total: total,
                                            branchOffice: branchOffice,
                                            type: 'Tarjeta de credito',
                                            delivery: this.state.delivery,
                                            userLongitude: userLongitude,
                                            userLatitude: userLatitude
                                        })
                                    }}>
                                        <Left>
                                            <Icon size={25} name="credit-card" color={"black"}/>
                                        </Left>
                                        <Body>
                                            <Text style={styles.ListF}>**** ****
                                                **** {card.card.substr(card.card.length - 4)}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                    </Content>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            style={styles.button3Gray}
                            onPress={() => {
                                this.setState({creditShow: !this.state.creditShow})
                            }}
                        >
                            <Text style={styles.textOrderGrey}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.payPalShow}
                    overlayStyle={{
                        height: "70%",
                        width: "90%",
                    }}
                >
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.overlayTitle}>Seleccionar tarjeta de PayPal</Text>
                    </View>
                    <Content>
                        <View style={{flex: 10}}>
                            {
                                this.state.payPal.map(card => {
                                    return <ListItem avatar key={card._key} onPress={() => {
                                        this.setState({payPalShow: !this.state.payPalShow})
                                        navigation.navigate('Map', {
                                            _key: _key,
                                            image: image,
                                            name: name,
                                            email: email,
                                            userAddress: userAddress,
                                            total: total,
                                            branchOffice: branchOffice,
                                            type: 'Pay Pal',
                                            delivery: this.state.delivery,
                                            userLongitude: userLongitude,
                                            userLatitude: userLatitude
                                        })
                                    }}>
                                        <Left>
                                            <Icon size={25} name="credit-card" color={"black"}/>
                                        </Left>
                                        <Body>
                                            <Text style={styles.ListF}>**** ****
                                                **** {card.card.substr(card.card.length - 4)}</Text>
                                        </Body>
                                    </ListItem>
                                })
                            }
                        </View>
                    </Content>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            style={styles.button3Gray}
                            onPress={() => {
                                this.setState({payPalShow: !this.state.payPalShow})
                            }}
                        >
                            <Text style={styles.textOrderGrey}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
        )
    }
}
