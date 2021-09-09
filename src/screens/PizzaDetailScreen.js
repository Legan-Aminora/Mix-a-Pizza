import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native'
import {Container, Text, Content} from 'native-base';
import {Image} from 'react-native-elements';
import styles from "../Style";
import Icon from 'react-native-vector-icons/AntDesign'
import {getResourceWhere} from "../initFirebase";

export default class PizzaDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            total: 0
        }
    }

    componentDidMount() {
        this.setState({total: this.props.route.params.pizza.actual_price})
    }

    render() {
        const {navigation} = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const {
            actual_price,
            description,
            last_price,
            name,
            review,
            times_requested,
            summary,
            uri_image,
            cheese_id,
            dough_id,
            sauce_id,
            ingredient_id
        } = this.props.route.params.pizza

        return (
            <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <Image
                        source={{uri: uri_image}}
                        style={{widthWidth: -10, height: 270}}
                    />
                    <View style={{flex: 5, justifyContent: 'flex-end'}}>
                        <View style={{
                            width: windowWidth,
                            height: 4 * windowHeight / 6,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 30,
                            paddingTop: 50,
                            paddingHorizontal: 30,
                            paddingBottom: 20
                        }}>
                            <Content>
                                <View style={{paddingBottom: 10}}>
                                    <Text style={styles.text}>Resumen</Text>
                                    <Text>{summary}</Text>
                                </View>
                                <Text style={styles.text}>Ingredientes</Text>
                                <View style={{paddingBottom: 10, flexDirection: "row"}}>
                                    <View style={{paddingVertical: 10, flex: 1}}>
                                        <Text style={{fontWeight: 'bold'}}>Masas</Text>
                                        {
                                            dough_id.map(dough => {
                                                return <Text key={dough._key}>{dough}</Text>
                                            })
                                        }
                                    </View>
                                    <View style={{paddingVertical: 10, flex: 1}}>
                                        <Text style={{fontWeight: 'bold'}}>Quesos</Text>
                                        {
                                            cheese_id.map(cheese => {
                                                return <Text key={cheese._key}>{cheese}</Text>
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={{paddingBottom: 10, flexDirection: "row"}}>
                                    <View style={{paddingVertical: 10, flex: 1}}>
                                        <Text style={{fontWeight: 'bold'}}>Salsas</Text>
                                        {
                                            sauce_id.map(sauce => {
                                                return <Text key={sauce._key}>{sauce}</Text>
                                            })
                                        }
                                    </View>
                                    <View style={{paddingVertical: 10, flex: 1}}>
                                        <Text style={{fontWeight: 'bold'}}>Ingredientes</Text>
                                        {
                                            ingredient_id.map(ingredient => {
                                                return <Text key={ingredient._key}>{ingredient}</Text>
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={{paddingBottom: 10}}>
                                    <Text style={styles.text}>Descripcion</Text>
                                    <Text>{description}</Text>
                                </View>
                                <Text style={styles.text}>Cantidad</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center"
                                }}>
                                    <TouchableOpacity
                                        style={styles.buttonQuantity}
                                        onPress={() => {
                                            if (this.state.quantity > 1) {
                                                this.setState({quantity: this.state.quantity - 1})
                                            }
                                        }}
                                    >
                                        <Icon
                                            size={20}
                                            name='minus'
                                            color={"#58A2BB"}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{paddingHorizontal: 15}}>{this.state.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.buttonQuantity}
                                        onPress={() => this.setState({quantity: this.state.quantity + 1})}
                                    >
                                        <Icon
                                            size={20}
                                            name='plus'
                                            color={"#58A2BB"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Content>
                        </View>
                        <View style={{
                            height: (4 * windowHeight / 6) + 25,
                            alignSelf: "flex-end",
                            width: windowWidth / 2,
                            position: "absolute"
                        }}>
                            <View style={{
                                backgroundColor: "orange",
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                alignItems: "center",
                                justifyContent: "space-around",
                                flexDirection: "row",
                                paddingVertical: 10
                            }}>
                                <Text style={styles.Cost0}>$ {actual_price}</Text>
                                <Text style={styles.Cost1}>$ {last_price}</Text>
                            </View>
                        </View>
                        <View style={{
                            height: windowHeight - 110,
                            alignSelf: "flex-end",
                            width: windowWidth / 2,
                            position: "absolute"
                        }}>
                            <Text style={styles.Name}>{name}</Text>
                            <Text style={styles.Review}>{review} Estrellas</Text>
                            <Text style={styles.Votes}>{times_requested} Votos</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: "#DCDCDC",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 30
                    }}>
                        <View>
                            <Text style={styles.textTotal}>Total</Text>
                            <Text style={styles.titlePurchase}>$ {this.state.total * this.state.quantity}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Pago', {
                                    total: this.state.total * this.state.quantity,
                                    uri_image: uri_image,
                                    namePizza: name,
                                    actual_price: actual_price,
                                    type: 0,
                                    hasOrder: true,
                                    quantity: this.state.quantity
                                })}
                                style={styles.buttonOrder}>
                                <Text style={styles.title3}>Pagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Container>
        )
    }
}
