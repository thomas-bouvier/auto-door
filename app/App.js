import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

import Loading from './components/Loading/Loading';

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
        this.io = SocketIOClient(Config.serverURI);
        this.io.on('connected', this.onConnectionOpened);

        this.setState({
            status: States.CONNECTING,
        });
    }

    onConnectionOpened () {
        this.setState({
            status: States.CONNECTED,
        });
    }

    componentWillUnmount () {
        this.ws.close();
    }

    render () {
        if (this.state.status !== States.CONNECTED) {
            return (
                <Loading />
            );
        }

        return (
            <Text>Connecté à la Raspberry</Text>
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
