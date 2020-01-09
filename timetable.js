import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class timetable extends PureComponent {
    render() {
        return (
            <View>
                <TextInput>Enter subject</TextInput>
            </View>
        )
    }
}
