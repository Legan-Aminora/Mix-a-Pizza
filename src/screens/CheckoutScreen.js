import React from 'react'
import { View, Text, Button } from 'react-native'

export default class CheckoutScreen extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pagar"
                    onPress={() => navigation.navigate('Detail')}
                />
                <Button
                    title="Volver al home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        )
    }
}
