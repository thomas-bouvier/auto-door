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
import { Font } from 'expo';

export default class MainComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
        });
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
            <Container style = {{ paddingTop: StatusBar.currentHeight }}>
                <Header>
                    <Body>
                        {
                            this.state.fontLoaded ? (
                                <Title>Auto-Door</Title>
                            ) : null
                        }
                    </Body>
                </Header>
                <Content padder>
                    <Button primary full onPress = { () => this.doorAction() }>
                        {
                            this.state.fontLoaded ? (
                                <Text>Ouvrir la porte</Text>
                            ) : null
                        }
                    </Button>
                </Content>
            </Container>
        );
    }
}
