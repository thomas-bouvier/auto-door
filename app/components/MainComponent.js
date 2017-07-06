import React from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Button,
    Text } from 'native-base';
import { Alert } from 'react-native';

export default class MainComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
        };
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
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
                console.log(data);
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
            <Container style = {{ paddingTop: Expo.Constants.statusBarHeight }}>
                <Header androidStatusBarColor="#2c3e50">
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
