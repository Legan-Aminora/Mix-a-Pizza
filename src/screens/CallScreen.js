import React from 'react'
import { View, Text, Button } from 'react-native'

export default class CallScreen extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Volver al home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        )
    }
}
