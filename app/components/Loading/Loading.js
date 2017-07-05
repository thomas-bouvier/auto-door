import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import Style from './style';

export default function Loading () {
    return (
        <View style = { Style.container }>
            <ActivityIndicator size = "large" />
            <Text>Connexion en cours</Text>
        </View>
    );
}
