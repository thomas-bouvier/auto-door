import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Config from 'app-config';

const States = {
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    DISCONNECTED: 'disconnected'
};

export default class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            status: States.DISCONNECTED,
        };
    }

    componentDidMount () {
        this.connect();
    }

    connect () {
        this.ws = new WebSocket('ws://tomatrocho.ddns.net:81');

        this.ws.onopen = () =>
            this.onConnectionOpen();

        this.ws.onmessage = (e) =>
            this.onConnectionMessage(e);

        this.ws.onerror = (e) =>
            this.onConnectionError(e);

        this.ws.onclose = (e) =>
            this.onConnectionClose(e);

        this.ws.sendJSON = (obj) =>
            this.ws.send(JSON.stringify(obj));

        this.setState({
            status: States.CONNECTING,
        });
    }

    onConnectionOpen () {

    }

    onConnectionMessage() {

    }

    onConnectionError () {

    }

    onConnectionClose () {

    }

    componentWillUnmount () {
        this.ws.close();
    }

    render () {
        return (
            <View style = { styles.container }>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
