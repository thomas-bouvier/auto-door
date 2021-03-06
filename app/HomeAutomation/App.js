import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

import Loading from './components/Loading/Loading';
import MainComponent from './components/MainComponent'

const States = {
    CONNECTING: 'connecting',
    AUTHENTICATING: 'authenticating',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
};

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: States.DISCONNECTED,
            token: '',
        };
    }

    componentDidMount() {
        this.connect();
    }

    connect() {
        this.io = SocketIOClient("http://tomatrocho.ddns.net:81");
        this.io.on('connected', this.onConnectionOpened.bind(this));

        this.setState({
            status: States.CONNECTING,
        });
    }

    onConnectionOpened() {
        this.io.emit('auth', { auth_key: 'KEY' }, (data) => {
            if (data.status == 200) {
                this.setState({
                    status: States.CONNECTED,
                    token: data.token,
                });
            }
        });

        this.setState({
            status: States.AUTHENTICATING,
        });
    }

    componentWillUnmount() {
        this.io.emit('disconnect');
    }

    render() {
        if (this.state.status == States.CONNECTING) {
            return (
                <Loading text = "Connexion en cours" />
            );
        }
        else if (this.state.status == States.AUTHENTICATING) {
            return (
                <Loading text = "Authentification en cours" />
            );
        }

        return (
            <MainComponent io = { this.io } token = { this.state.token } />
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
