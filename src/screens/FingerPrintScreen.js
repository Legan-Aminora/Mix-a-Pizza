import React from 'react'
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native'
import {Container} from "native-base";
import styles from "../Style";
import {getResourceWhere, updateDocumentTouchId} from '../initFirebase'

export default class FingerPrintScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            touchId: false
        }
    }

    async init() {
        const {touchId} = await getResourceWhere('user', this.props.route.params.docRef)
        this.setState({touchId})
    }

    componentDidMount() {
        this.init()
    }

    render() {
        const {docRef} = this.props.route.params
        const { navigation } = this.props
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        return (
            <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#cb333b',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{ width: windowWidth, alignItems: "center" }}>
                        <Text style={styles.title2}>Iniciemos</Text>
                        <Text style={styles.content2}>Crea una cuenta para continuar</Text>
                        <View style={{
                            height:windowHeight/2,
                            backgroundColor:"#fff",
                            width:windowWidth-85,
                            justifyContent:"center",
                            alignItems:"center",
                            borderRadius:40,
                        }}>
                            <Image
                                source={require('../../assets/fingerPrint.jpeg')}
                                style={{
                                    width:windowWidth-85,
                                    height:windowHeight/2,
                                    borderRadius:40
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={async () => {
                                await this.setState({touchId: true})
                                await updateDocumentTouchId('user', docRef, this.state.touchId)
                                navigation.navigate('PhoneVerify')
                            }}
                            style={styles.button}>
                            <Text style={styles.title2}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}
