import React, {Component} from 'react'
import {Text, StyleSheet, TextInput} from 'react-native'
import { Container, Header, Content, Button } from 'native-base'
import axios from 'axios'
import deviceStorage from '../../Components/deviceStorage'

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    changeText(type, value) {
        this.setState({
            [type]: value
        })
    }

    Logar () {
        const {username, password} = this.state
        if (!username || !password) {
            return alert('preencha seu usuario ou senha')
        }
        axios.post('auth', this.state)
            .then((response) => {
                const data = response.data;
                console.log(data.token);
                deviceStorage.saveKey("id_token", data.token);
                this.props.navigation.navigate('Home');
            })
            .catch(function (err) {
                alert(err)
            })
    }

    render () {
        const {username, password} = this.state
        return <Container>
        <Header>
          <Text>Teste</Text>
        </Header>
        <Content style={styles.container}>
          <TextInput style={styles.input} placeholder="Usuário" onChangeText={(e) => this.changeText('username', e)} value={username} />
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={(e) => this.changeText('password', e)} value={password} />
          <Button onPress={() => this.Logar()}>
              <Text>Entrar</Text>
          </Button>
        </Content>
      </Container>
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        borderRadius: 10,
        padding: 5
    }
})