import React from "react";
import {View,TouchableOpacity,} from 'react-native'
import { Container, Content, Separator, ListItem, Switch, Text, Left, Body, Thumbnail, Right, Header } from 'native-base';
import {SocialIcon} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from "../Style";

export default class CreatePizzaSettingsScreen extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Icon
                            size={20}
                            name="md-arrow-back"
                            color={"#cb333b"}
                        />
                    </Left>
                    <Right>
                        <View style={{
                            alignItems: 'flex-end'
                        }}>
                        </View>
                    </Right>
                </Header>
                <Content style={{ backgroundColor: "#FFFFF" }}>
                    <Separator>
                        <Text style={styles.MidField}>Configuraciones</Text>
                    </Separator>
                    <ListItem avatar >
                        <Left>
                        </Left>
                        <Body>
                            <Text style={styles.ListF}>Notificaciones </Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                    <ListItem last avatar >
                        <Left>
                            <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Touch_ID_logo.png/200px-Touch_ID_logo.png ' }} />
                        </Left>
                        <Body>
                            <Text style={styles.ListF}>Touch ID</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text style={styles.MidField}>Redes Sociales</Text>
                    </Separator>
                    <ListItem avatar >
                        <Left>
                            <SocialIcon type='facebook'/>
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>Conectar con Facebook</Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                    <ListItem avatar>
                        <Left>
                            <SocialIcon type='google'/>
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>Conectar con Google</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem last avatar >
                        <Left>
                            <Thumbnail source={{ uri: 'https://www.apple.com/v/apple-pay/i/images/overview/og_image.png?202010020241 ' }} />
                        </Left>
                        <Body>
                            <Text style={styles.ListF1}>   Conectar con Apple</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text style={styles.MidField}>Otros</Text>
                    </Separator>
                    <ListItem avatar>
                        <Body>
                            <Text style={styles.ListF}> Actividades </Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                    <ListItem last avatar >
                        <Body>
                            <Text style={styles.ListF}>Ayuda de inicio</Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}
