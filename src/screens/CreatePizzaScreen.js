import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import {
    Content,
    Left,
    Right,
    Separator,
    ListItem,
    Thumbnail,
    Body
} from "native-base";
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo'
import styles from "../Style";
import {getResource} from "../initFirebase";


export default class CreatePizzaScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doughs: [],
            sauces: [],
            cheeses: [],
            ingredients: [],
            totalDough: 0,
            totalSauce: 0,
            totalCheese: 0,
            totalIngredient: 0,
            selected: false
        }
    }

    async init() {
        const doughs = await getResource('dough')
        const sauces = await getResource('sauce')
        const cheeses = await getResource('cheese')
        const ingredients = await getResource('ingredient')
        this.setState({
            doughs: doughs,
            sauces: sauces,
            cheeses: cheeses,
            ingredients: ingredients
        })
    }

    componentDidMount() {
        this.init()
    }

    setSelected(selected) {
        this.setState({selected: selected});
    }

    textStyle() {
        return this.state.selected ? styles.text2 : styles.text;
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
                                name="sound-mix"
                                color={"white"}
                            />
                            <Text style={styles.title3}>Ordenar</Text>
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
                    <View style={{flex: 3}}>
                        <Separator>
                            <Text style={styles.MidField}>Masas</Text>
                        </Separator>
                        {
                            this.state.doughs.map((dough, i) => {
                                return <ListItem
                                    avatar
                                    onPress={() => this.setState({totalDough: this.state.totalDough - (-dough.price)})}
                                    key={dough._key}
                                >
                                    <Left>
                                        <Text>{i + 1}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{dough.name}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.textOrderRed2}>$ {dough.price}</Text>
                                    </Right>
                                </ListItem>
                            })
                        }
                        <Separator>
                            <Text style={styles.MidField}>Salsas</Text>
                        </Separator>
                        {
                            this.state.sauces.map((sauce, i) => {
                                return <ListItem
                                    avatar
                                    onPress={() => this.setState({totalSauce: this.state.totalSauce - (-sauce.price)})}
                                    key={sauce._key}
                                >
                                    <Left>
                                        <Text>{i + 1}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{sauce.name}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.textOrderRed2}>$ {sauce.price}</Text>
                                    </Right>
                                </ListItem>
                            })
                        }
                        <Separator>
                            <Text style={styles.MidField}>Quesos</Text>
                        </Separator>
                        {
                            this.state.cheeses.map((cheese, i) => {
                                return <ListItem
                                    avatar
                                    onPress={() => this.setState({totalCheese: this.state.totalCheese - (-cheese.price)})}
                                    key={cheese._key}
                                >
                                    <Left>
                                        <Text>{i + 1}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{cheese.name}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.textOrderRed2}>$ {cheese.price}</Text>
                                    </Right>
                                </ListItem>
                            })
                        }
                        <Separator>
                            <Text style={styles.MidField}>Ingredientes</Text>
                        </Separator>
                        {
                            this.state.ingredients.map((ingredient, i) => {
                                return <ListItem
                                    avatar
                                    onPress={() => this.setState({totalIngredient: this.state.totalIngredient - (-ingredient.price)})}
                                    key={ingredient._key}
                                >
                                    <Left>
                                        <Text>{i + 1}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.ListF}>{ingredient.name}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.textOrderRed2}>$ {ingredient.price}</Text>
                                    </Right>
                                </ListItem>
                            })
                        }
                    </View>
                </Content>
                <View style={{
                    flex: 1 / 3,
                    backgroundColor: "#DCDCDC",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius:10
                }}>
                    <View style={{
                        flex: 3,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <View style={{alignItems: "center", justifyContent: "space-between"}}>
                            <Thumbnail
                                source={{uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F02%2F19%2Fla-mejor-masa-para-pizza-2000.jpg&q=85 '}}/>
                            <Text style={styles.textOrderRed2}>$ {this.state.totalDough}</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Thumbnail
                                source={{uri: 'https://unareceta.com/wp-content/uploads/2017/04/salsa-de-tomate-para-pizza.jpg'}}/>
                            <Text style={styles.textOrderRed2}>$ {this.state.totalSauce}</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Thumbnail
                                source={{uri: 'https://www.grupomara.com.mx/wp-content/uploads/2019/04/provoleta-envasada-al-vacio.jpg'}}/>
                            <Text style={styles.textOrderRed2}>$ {this.state.totalCheese}</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Thumbnail
                                source={{uri: 'https://i.blogs.es/18ae6a/pizza-jamon-champinones/1366_2000.jpg'}}/>
                            <Text style={styles.textOrderRed2}>$ {this.state.totalIngredient}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 2,
                        flexDirection: "row",
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={styles.textOrderGrey2}>Total: </Text>
                            <Text
                                style={styles.textOrderRed}>$ {this.state.totalDough - (-this.state.totalSauce) - (-this.state.totalCheese) - (-this.state.totalIngredient)}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Pago', {
                                    totalDough: this.state.totalDough,
                                    totalCheese: this.state.totalCheese,
                                    totalSauce: this.state.totalSauce,
                                    totalIngredient: this.state.totalIngredient,
                                    total: this.state.totalDough - (-this.state.totalSauce) - (-this.state.totalCheese) - (-this.state.totalIngredient),
                                    type: 1,
                                    hasOrder: true
                                })}
                                style={styles.button3}>
                                <Text style={styles.title3}>Ordenar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
