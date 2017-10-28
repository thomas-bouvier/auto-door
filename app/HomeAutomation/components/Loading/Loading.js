import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import Style from './style';

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = { Style.container }>
                <ActivityIndicator size = "large" />
                <Text>{ this.props.text }</Text>
            </View>
        );
    }
}
