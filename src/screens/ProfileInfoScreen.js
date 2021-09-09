import React from "react";
import {View, TouchableOpacity, Dimensions} from 'react-native'
import {
    ListItem,
    Text,
    Left,
    Body,
    Right,
    Input,
    Item
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Style";
import {Overlay} from 'react-native-elements';

import {getResourceCondition, deleteDocument, addDocumentToResource} from "../initFirebase";

export default class ProfileInfoScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            addresses: [],
            longitude: 0,
            latitude: 0,
            visibleCard: false,
            visibleAddress: false,
            visibleConfirmation: false,
            card: '',
            type: 'credit',
            address: '',
            color: 3,
            color1: styles.buttonOrderSmall,
            color2: styles.buttonCancelSmall,
            color3: styles.buttonCancelSmall,
        }
    }

    async init() {
        const cards = await getResourceCondition('card', 'user_id', "==", this.props.route.params._key)
        const addresses = await getResourceCondition('address', 'user_id', "==", this.props.route.params._key)
        this.setState({cards: cards, addresses: addresses})
    }

    text() {
        return styles.textOrderGrey
    }

    async delete(resource, id, info) {
        await deleteDocument(resource, id)
        alert("La " + info + " se ha borrado exitosamente")
        this.init()
    }

    async addDocument(resource, document, info) {
        await addDocumentToResource(resource, document)
        alert("La " + info + " se agreó exitosamente")
        this.setState({
            visibleAddress: false,
            visibleCard: false,
            card: '',
            address: ''
        })
        this.init()
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {_key} = this.props.route.params
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingTop: 30
            }}>
                <View style={{
                    flex: 1
                }}>
                    <View style={styles.topic}>
                        <Icon size={20} name="credit-card" color={"white"}/>
                        <Text style={styles.title3}>Tarjetas</Text>
                    </View>
                    <View>
                        {
                            this.state.cards.map(card => {
                                return <ListItem avatar>
                                    <Left>
                                        <Icon size={25} name="credit-card" color={"black"}/>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>**** {card.card.substr(card.card.length - 4)}</Text>
                                    </Body>
                                    <Right style={{alignItems: "center", flexDirection: "row"}}>
                                        <Icon
                                            size={25}
                                            name="delete"
                                            color={"black"}
                                            onPress={() => this.delete('card', card._key, "tarjeta")}
                                        />
                                    </Right>
                                </ListItem>
                            })
                        }
                    </View>
                    <View style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        <TouchableOpacity
                            style={styles.button3}
                            onPress={() => this.setState({visibleCard: !this.state.visibleCard})}
                        >
                            <Text style={styles.title3}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topic}>
                        <Icon size={20} name="location-on" color={"white"}/>
                        <Text style={styles.title3}>Direcciones</Text>
                    </View>
                    <View>
                        {
                            this.state.addresses.map(address => {
                                return <ListItem avatar>
                                    <Left>
                                        <Icon size={25} name="location-on" color={"black"}/>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{address.address}</Text>
                                    </Body>
                                    <Right style={{alignItems: "center", flexDirection: "row"}}>
                                        <Icon
                                            size={25}
                                            name="delete"
                                            color={"black"}
                                            onPress={() => this.delete('address', address._key, "dirección")}
                                        />
                                    </Right>
                                </ListItem>
                            })
                        }
                    </View>
                    <View style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        <TouchableOpacity
                            style={styles.button3}
                            onPress={() => this.setState({visibleAddress: !this.state.visibleAddress})}
                        >
                            <Text style={styles.title3}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Overlay
                    isVisible={this.state.visibleCard}
                    overlayStyle={{
                        height: "70%",
                        width: "90%",
                    }}
                >
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.overlayTitle}>Agregar número de tarjeta</Text>
                        <Text style={styles.overlaySubTitle}>
                            La información sera confidencial y no se hará mal uso de ella.
                        </Text>
                    </View>
                    <View style={{
                        flex: 5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Item underline={true}>
                            <Icon size={25} name="credit-card" color={"black"}/>
                            <Input
                                placeholder='Número de tarjeta'
                                value={this.state.card}
                                onChangeText={(card) => this.setState({card})}
                            />
                        </Item>
                        <View style={{paddingVertical:10, flexDirection:"row"}}>
                            <TouchableOpacity
                                style={this.state.color1}
                                onPress={() => {
                                    this.setState({
                                        color1: styles.buttonOrderSmall,
                                        color2: styles.buttonCancelSmall,
                                        color3: styles.buttonCancelSmall,
                                        type: 'debit'
                                    })
                                }}
                            >
                                <Text style={this.text()}>Debito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.color2}
                                onPress={() => {
                                    this.setState({
                                        color1: styles.buttonCancelSmall,
                                        color2: styles.buttonOrderSmall,
                                        color3: styles.buttonCancelSmall,
                                        type: 'payPal'
                                    })
                                }}
                            >
                                <Text style={this.text()}>PayPal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.color3}
                                onPress={() => {
                                    this.setState({
                                        color1: styles.buttonCancelSmall,
                                        color2: styles.buttonCancelSmall,
                                        color3: styles.buttonOrderSmall,
                                        type: 'credit'
                                    })
                                }}
                            >
                                <Text style={this.text()}>Credito</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={() => {
                                this.setState({visibleConfirmation: !this.state.visibleConfirmation})
                            }}
                        >
                            <Text style={styles.textOrderGrey}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonAccept}
                            onPress={() => this.addDocument('card', {card: this.state.card, user_id: _key, type: this.state.type}, "tarjeta")}
                        >
                            <Text style={styles.title3}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.visibleAddress}
                    overlayStyle={{
                        height: "70%",
                        width: "90%",
                    }}
                >
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.overlayTitle}>Agregar dirección</Text>
                        <Text style={styles.overlaySubTitle}>
                            La información sera confidencial y no se hará mal uso de ella.
                        </Text>
                    </View>
                    <View style={{
                        flex: 5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Item underline={true}>
                            <Item underline={true}>
                                <Icon size={25} name="location-on" color={"black"}/>
                                <Input
                                    placeholder='Dirección'
                                    value={this.state.address}
                                    onChangeText={(address) => this.setState({address})}
                                />
                            </Item>
                        </Item>
                        <Item underline={true}>
                            <Input
                                placeholder='Latitude'
                                value={this.state.latitude}
                                onChangeText={(latitude) => this.setState({latitude})}
                            />
                        </Item>
                        <Item underline={true}>
                            <Input
                                placeholder='Longitude'
                                value={this.state.longitude}
                                onChangeText={(longitude) => this.setState({longitude})}
                            />
                        </Item>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={() => this.setState({visibleConfirmation: !this.state.visibleConfirmation})}
                        >
                            <Text style={styles.textOrderGrey}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonAccept}
                            onPress={() => this.addDocument('address', {
                                address: this.state.address,
                                user_id: _key,
                                latitude: parseFloat(this.state.latitude),
                                longitude: parseFloat(this.state.longitude)
                            }, "dirección")}
                        >
                            <Text style={styles.title3}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.visibleConfirmation}
                    overlayStyle={{
                        height: "40%",
                        width: "70%",
                    }}
                >
                    <View style={{
                        flex: 5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text>¿Desea borrar sus cambios?</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            style={styles.button3Gray}
                            onPress={() => {
                                this.setState({visibleConfirmation: !this.state.visibleConfirmation})
                            }}
                        >
                            <Text style={styles.textOrderGrey}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button3}
                            onPress={() => {
                                this.setState({visibleConfirmation: !this.state.visibleConfirmation})
                                this.setState({
                                    visibleCard: false,
                                    visibleAddress: false,
                                    visibleConfirmation: false,
                                    card: '',
                                    address: ''
                                })
                            }}
                        >
                            <Text style={styles.title3}>Si</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
        )
    }

}

