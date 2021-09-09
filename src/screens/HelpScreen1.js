import React from 'react'
import {View, Dimensions, TouchableOpacity, Image, FlatList} from 'react-native'
import {Text} from 'native-base';
import styles from "../Style";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 4 }).map((_, i) => {
    switch (i) {
        case 0:
            return {
                id: i,
                image: require('../../assets/help1.png'),
                title: 'Personaliza tu pizza'
            };
        case 1:
            return {
                id: i,
                image: require('../../assets/help2.png'),
                title: 'Pide tu pizza para llevar'
            };
        case 2:
            return {
                id: i,
                image: require('../../assets/help3.png'),
                title: 'Sigue al repartidor en tiempo real'
            };
        case 3:
            return {
                id: i,
                image: require('../../assets/help4.png'),
                title: 'Disfruta tu pizza'
            };
    }
});

function Slide({ data }) {
    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: "center",
        }}>
            <View style={{alignItems: "center"}}>
                <Text style={styles.titleHelp}>{data.title}</Text>
            </View>
            <View style={{paddingTop: windowWidth/20}}>
                <Image
                    source={data.image}
                    style={{
                        width: windowWidth,
                        resizeMode: 'contain',
                        height: windowHeight/2
                    }}
                />
            </View>
        </View>
    );
}

export default class HelpScreen1 extends React.Component {
    render () {
        const { navigation } = this.props
        const {user} = this.props.route.params
        return (
            <View style={{flex:1, backgroundColor:"#fff"}}>
                <FlatList
                    data={slideList}
                    renderItem={({ item }) => {
                        return <Slide data={item}/>;
                    }}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={true}
                />
                <View style={{
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal:30,
                    paddingVertical: 50
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Tab', {user})}
                        transparent>
                        <Text style={styles.link2}>Saltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Tab', {user})}
                        style={styles.button3}>
                        <Text style={styles.title3}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
