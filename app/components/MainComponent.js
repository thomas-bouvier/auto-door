import React from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Button,
    Text } from 'native-base';

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
                    <Button primary full>
                        <Text>Ouvrir la porte</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
