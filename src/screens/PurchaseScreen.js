import React from 'react'
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native'
import {Container, Left, Separator, Right, Thumbnail, Body, ListItem} from 'native-base';
import {Avatar} from 'react-native-elements';
import styles from "../Style";
import Icon from "react-native-vector-icons/Fontisto";
import {getResource, getResourceCondition} from "../initFirebase";

const {width: windowWidth, height: windowHeight} = Dimensions.get("window");

export default class PurchaseScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shipping: 0,
            type: 0,
            hasOrder: false,
            userAddress: '',
            userLatitude: '',
            userLongitude: '',
            branchOffice:''
        }
    }

    async init() {
        const branchOffice = await getResource('branch_office')
        this.setState({branchOffice})
        await this.setState({
            type: this.props.route.params.type,
            hasOrder: this.props.route.params.hasOrder
        })
        const userAddress = await getResourceCondition('address', 'user_id', '==', this.props.route.params._key)
        userAddress.map(address => {
            if (!this.state.userAddress) {
                this.setState({
                    userAddress: address.address,
                    userLatitude: address.latitude,
                    userLongitude: address.longitude
                })
            }
        })
        if (this.props.route.params.total * .15 >= 100) {
            this.setState({
                shipping: 100
            })
        } else {
            this.setState({
                shipping: (this.props.route.params.total * .15).toFixed(2)
            })
        }
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {navigation} = this.props
        const {_key, image, name, email, totalCheese, totalIngredient, totalSauce, totalDough, total, namePizza, uri_image, actual_price, quantity} = this.props.route.params
        return (
            <Container>
                {this.state.hasOrder ?
                    <View style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        paddingHorizontal: 10,
                        paddingTop: 30
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <Left style={{flexDirection: "row"}}>
                                <View style={styles.topic}>
                                    <Icon
                                        size={15}
                                        name="shopping-basket"
                                        color={"white"}
                                    />
                                    <Text style={styles.title3}>Pago</Text>
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
                        {/*  */}
                        {/* Detalles */}
                        {/*  */}
                        <View style={{flexDirection: 'column', flex: 3 / 10}}>
                            <View style={{flexDirection: 'row', flex: 1 / 3}}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon
                                        size={20}
                                        name="shopping-bag"
                                        color={"#cb333b"}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    justifyContent: 'center',
                                    paddingLeft: 1
                                }}>
                                    {
                                        this.state.branchOffice.map(address => {
                                            return <Text style={styles.textOrder}>{address.name}</Text>
                                        })
                                    }

                                    {this.state.type == 0 ?
                                        <Text style={styles.textOrder}>x{quantity} {namePizza}</Text>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1 / 3}}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon
                                        size={20}
                                        name="map-marker-alt"
                                        color={"#cb333b"}
                                    />
                                </View>
                                <View style={{flexDirection: 'column', flex: 7 / 10, justifyContent: 'center'}}>
                                    <Text style={styles.textOrder}>{this.state.userAddress}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1 / 3}}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon
                                        size={20}
                                        name="clock"
                                        color={"#cb333b"}
                                    />
                                </View>
                                <View style={{flexDirection: 'column', flex: 7 / 10, justifyContent: 'center'}}>
                                    <Text style={styles.textOrder}>Entrega estimada: 15 min</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', flex: .6 / 10,}}>
                            <Separator>
                                <Text style={styles.MidField}>Pedido</Text>
                            </Separator>
                        </View>
                        {this.state.type == 1 ?
                            <View style={{flexDirection: 'row', flex: 2.4 / 10}}>
                                <View style={{flexDirection: 'column', flex: 1 / 4}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 3 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Thumbnail
                                            source={{uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F02%2F19%2Fla-mejor-masa-para-pizza-2000.jpg&q=85 '}}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.textOrderRed2}>$ {totalDough}</Text></View>
                                </View>
                                <View style={{flexDirection: 'column', flex: 1 / 4}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 3 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Thumbnail
                                            source={{uri: 'https://www.grupomara.com.mx/wp-content/uploads/2019/04/provoleta-envasada-al-vacio.jpg'}}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.textOrderRed2}>$ {totalCheese}</Text></View>
                                </View>
                                <View style={{flexDirection: 'column', flex: 1 / 4,}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 3 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Thumbnail
                                            source={{uri: 'https://unareceta.com/wp-content/uploads/2017/04/salsa-de-tomate-para-pizza.jpg'}}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.textOrderRed2}>$ {totalSauce}</Text></View>
                                </View>
                                <View style={{flexDirection: 'column', flex: 1 / 4,}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 3 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Thumbnail
                                            source={{uri: 'https://i.blogs.es/18ae6a/pizza-jamon-champinones/1366_2000.jpg'}}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 5,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.textOrderRed2}>$ {totalIngredient}</Text></View>
                                </View>
                            </View>
                            :
                            <View style={{flex: 2.4 / 10, justifyContent: "center"}}>
                                <ListItem avatar style={{height: 90}}>
                                    <Left>
                                        <Thumbnail source={{uri: uri_image}}/>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{namePizza}</Text>
                                    </Body>
                                    <Right style={{alignItems: "center", justifyContent: "center"}}>
                                        <Text style={styles.textOrderRed2}>$ {actual_price}</Text>
                                    </Right>
                                </ListItem>
                            </View>
                        }
                        <View style={{flexDirection: 'column', flex: 1.5 / 10, backgroundColor: 'white'}}>
                            <View style={{flexDirection: 'row', flex: 1 / 2}}>
                                <View style={{flexDirection: 'column', flex: .5 / 10}}/>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 6.5 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.textOrder}>Precio del pedido</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 3 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.textOrderGrey2}>${total}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1 / 2}}>
                                <View style={{flexDirection: 'column', flex: .5 / 10}}/>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 6.5 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.textOrder}>Costo del envio</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 3 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.textOrderGrey2}>${this.state.shipping}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', flex: 1.5 / 10}}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: .5 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}/>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 3.5 / 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.textOrderGrey2}>Total:</Text>
                                    <Text style={styles.textOrderRed}>$ {total - (-this.state.shipping)}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 5.5 / 10,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PurchaseDetail', {
                                            _key: _key,
                                            image: image,
                                            name: name,
                                            email: email,
                                            userAddress: this.state.userAddress,
                                            total: total - (-this.state.shipping),
                                            branchOffice: this.state.branchOffice,
                                            userLatitude: this.state.userLatitude,
                                            userLongitude: this.state.userLongitude
                                        })}
                                        style={styles.buttonOrder}>
                                        <Text style={styles.title3}>Pagar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            flex: 1 / 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => this.setState({hasOrder: false})}
                                style={styles.buttonOrderGrey}>
                                <Text style={styles.textOrderGrey}>Cancelar Orden</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                    }}>
                        <Image
                            source={require('../../assets/NoOrder.png')}
                            style={{
                                width: windowWidth,
                                resizeMode: 'contain',
                                height: windowHeight / 2
                            }}
                        />
                        <Text style={styles.textNoOrder}>No hay ordenes en espera</Text>
                        <Text style={styles.textNoOrder}>Descubre y ordena ahora</Text>
                    </View>
                }
            </Container>
        )
    }
}

