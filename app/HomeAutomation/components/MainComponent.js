import React from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Button,
    Text } from 'native-base';
import { StatusBar, Alert } from 'react-native';

export default class MainComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    doorAction() {
        this.props.io.emit('door_action', { token: this.props.token }, (data) => {
            if (data.status == 400) {
                Alert.alert(
                    "Erreur d'authentification",
                    data.error,
                    [
                        { text: 'OK' }
                    ],
                    { cancellable: false }
                );
            }
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Auto-Door</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Button primary full onPress = { () => this.doorAction() }>
                        <Text>Ouvrir la porte</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
