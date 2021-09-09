import React from 'react'
import {View, Dimensions, TouchableOpacity, Text, Animated, ScrollView, Linking} from 'react-native'
import {Container, Header, Left, Right, Button, Segment, Separator} from 'native-base';
import {Image} from 'react-native-elements';
import styles from "../Style";
import Icon from 'react-native-vector-icons/Fontisto'
import {makeCall} from "../components";
import {getResource, getResourceCondition} from "../initFirebase";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class BranchOfficeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            translateX: new Animated.Value(0),
            translateXTabOne: new Animated.Value(0),
            translateXTabTwo: new Animated.Value(windowWidth),
            translateY: -1000,
            post: [],
            lastPost: ''
        }
    }

    async init() {
        const post = await getResource('post')
        this.setState({post})
        post.map(lastPost => {
            if (!this.state.lastPost) {
                this.setState({lastPost: lastPost.description})
            }
        })
    }

    componentDidMount() {
        this.init()
    }

    handleSlide = type => {
        let {active, translateX, translateXTabTwo, translateXTabOne} = this.state
        Animated.spring(translateX, {
            toValue: type,
            duration: 20,
            useNativeDriver: true
        }).start()
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 20,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: windowWidth,
                    duration: 20,
                    useNativeDriver: true
                }).start()
            ])
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: windowWidth,
                    duration: 20,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 20,
                    useNativeDriver: true
                }).start()
            ])
        }
    }

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabTwo,
            translateXTabOne,
            translateY
        } = this.state;

        const {name, uri_image, description, phone, address, questions, rating} = this.props.route.params.branchOffice

        return (
            <View style={{flex: 1}}>
                <Image
                    source={{uri: uri_image}}
                    style={{widthWidth: -10, height: 200}}
                />
                <View style={{
                    flexDirection: "row",
                    height: windowHeight / 16,
                    position: 'relative',
                    backgroundColor: "#cb333b"
                }}>
                    <Animated.View style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        backgroundColor: "#DB030E",
                        transform: [{
                            translateX
                        }]
                    }}/>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onLayout={event => this.setState({xTabOne: event.nativeEvent.layout.x})}
                        onPress={() => this.setState({active: 0}, () => this.handleSlide(xTabOne))}
                    >
                        <Text style={styles.title4}>Información</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onLayout={event => this.setState({xTabTwo: event.nativeEvent.layout.x})}
                        onPress={() => this.setState({active: 1}, () => this.handleSlide(xTabTwo))}
                    >
                        <Text style={styles.title4}>Reseñas</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            transform: [{
                                translateX: translateXTabOne
                            }]
                        }}
                        onLayout={event => this.setState({translateY: event.nativeEvent.layout.height})}
                    >
                        <View style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            paddingTop: 20,
                            paddingHorizontal: 30
                        }}>
                            <View style={{paddingBottom: 10}}>
                                <Text style={styles.text}>{name}</Text>
                                <Text>{rating} Estrellas de lo mejor</Text>
                                <Text style={styles.text3}>{description}</Text>
                            </View>
                            <View style={{paddingBottom: 10}}>
                                <Text style={styles.text}>Direccion</Text>
                                <Text style={styles.text3}>{address}</Text>
                            </View>
                            <Text style={styles.text}>Contacto</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Left>
                                    <TouchableOpacity
                                        style={styles.button4}
                                        onPress={() => makeCall(phone)}
                                    >
                                        <Icon
                                            size={30}
                                            name='phone'
                                            color={"#cb333b"}
                                        />
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity style={styles.button4} onPress={() => {
                                        Linking.openURL('https://instagram.com/mixapizza?igshid=tu90cgkpeioi')
                                    }}>
                                        <Icon
                                            size={30}
                                            name='world'
                                            color={"#cb333b"}
                                        />
                                    </TouchableOpacity>
                                </Right>
                            </View>
                            <View>
                                <Text style={styles.text}>Preguntas</Text>
                                {
                                    questions.map(question => {
                                        return <Text key={question._key} style={styles.text3}>{question}</Text>
                                    })
                                }
                            </View>
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={{
                            transform: [
                                {translateX: translateXTabTwo},
                                {translateY: -translateY}
                            ]
                        }}
                    >
                        <View style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingHorizontal: 30
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 1 / 3,
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        style={styles.buttonSucStars}>
                                        <Text style={styles.textResena}>{rating}</Text>

                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 3
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 2
                                    }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={styles.buttonStars}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={styles.textStars}>1</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon
                                                            size={10}
                                                            name='star'
                                                            color='#FD8700'
                                                        />

                                                    </View>

                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={styles.buttonStars}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={styles.textStars}>2</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon
                                                            size={10}
                                                            name='star'
                                                            color='#FD8700'
                                                        />

                                                    </View>

                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={styles.buttonStars}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={styles.textStars}>3</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon
                                                            size={10}
                                                            name='star'
                                                            color='#FD8700'
                                                        />

                                                    </View>

                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1 / 2
                                    }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 2 / 12,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={styles.buttonStars}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={styles.textStars}>4</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon
                                                            size={10}
                                                            name='star'
                                                            color='#FD8700'
                                                        />

                                                    </View>

                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={styles.buttonStars}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={styles.textStars}>5</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 1 / 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon
                                                            size={10}
                                                            name='star'
                                                            color='#FD8700'
                                                        />

                                                    </View>

                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{paddingBottom: 30, paddingTop: 25}}>
                                <Text style={styles.text}>Ultimo comentario</Text>
                                <Text style={styles.text3}>{this.state.lastPost}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.textStarsStatus}>5</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Icon
                                                size={10}
                                                name='star'
                                                color='#cb333b'
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    marginLeft: 5,
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    height: 10

                                }}>

                                    <TouchableOpacity style={styles.bar5Stars}/>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.textStarsStatus}>4</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Icon
                                                size={10}
                                                name='star'
                                                color='#cb333b'
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    marginLeft: 5,
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    height: 10

                                }}>

                                    <TouchableOpacity style={styles.bar4Stars}/>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.textStarsStatus}>3</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Icon
                                                size={10}
                                                name='star'
                                                color='#cb333b'
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    marginLeft: 5,
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    height: 10

                                }}>

                                    <TouchableOpacity style={styles.bar3Stars}/>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.textStarsStatus}>2</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Icon
                                                size={10}
                                                name='star'
                                                color='#cb333b'
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    marginLeft: 5,
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    height: 10

                                }}>

                                    <TouchableOpacity style={styles.bar2Stars}/>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 2 / 10,
                                }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.textStarsStatus}>1</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 1 / 2,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Icon
                                                size={10}
                                                name='star'
                                                color='#cb333b'
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flex: 7 / 10,
                                    marginLeft: 5,
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    height: 10

                                }}>

                                    <TouchableOpacity style={styles.bar1Stars}/>
                                </View>
                            </View>
                            {
                                this.state.post.map(post => {
                                    return <View style={{paddingTop: 30}} key={post._key}>
                                        <View style={{
                                            flexDirection: 'row',
                                            backgroundColor: '#e0e0e0'
                                        }}>
                                            <View style={{
                                                flexDirection: 'column',
                                                flex: 7 / 10,

                                            }}>
                                                <Text style={styles.text}>{post.user_id}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'column',
                                                flex: 3 / 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row'
                                                }}>
                                                    <Icon
                                                        size={15}
                                                        name='star'
                                                        color='#FD8700'
                                                    />
                                                    <Icon
                                                        size={15}
                                                        name='star'
                                                        color='#FD8700'
                                                    />
                                                    <Icon
                                                        size={15}
                                                        name='star'
                                                        color='#FD8700'
                                                    />
                                                    <Icon
                                                        size={15}
                                                        name='star'
                                                        color='#FD8700'
                                                    />
                                                    <Icon
                                                        size={15}
                                                        name='star'
                                                        color='#FD8700'
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.text3}>{post.description}</Text>
                                    </View>
                                })
                            }
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        )
    }
}

