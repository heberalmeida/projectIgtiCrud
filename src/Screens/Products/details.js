import React, {Component} from 'react'
import {Text, TextInput, StyleSheet} from 'react-native'
import { Container, Header, Content, Left, Button, Icon } from 'native-base'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            productName: '',
            price: '',
            description: '',
            img_url: 'https://i.udemycdn.com/course/240x135/1325912_2431.jpg'
        }
    }

    componentDidMount () {
        this.request()
    }

    request () {
        console.log(this.props.navigation.state.params)
        const {id} = this.props.navigation.state.params
        axios(`products/${id}`).then(resp => {
            const data = resp.data[0]
            console.log(data)
            this.setState({
                id: data._id,
                productName: data.productName,
                price: data.price,
                description: data.description,
                img_url: data.img_url
            })
        })
    }

    changeText (type, value) {
        this.setState({
            [type]: value
        })
    }

    gravar () {
        const {type} = this.props.navigation.state.params
        const dados = this.state
        console.log(dados)
        if (type === 'New') {
            console.log('cadastrar')
            axios.post('products', {
                productName: dados.productName,
                price: dados.price,
                description: dados.description,
                img_url: dados.img_url
            }).then(resp => {
                this.setState({
                    productName: '',
                    price: '',
                    description: ''
                }, () => this.props.navigation.goBack())
            }).catch(e => console.log(e))
        } else {
            console.log('editar')
            axios.put(`products/${dados.id}`, {
                _id: dados.id,
                productName: dados.productName,
                price: dados.price,
                description: dados.description,
                img_url: dados.img_url
            }).then(resp => {
                console.log(resp)
                this.setState({
                    productName: '',
                    price: '',
                    description: ''
                }, () => this.props.navigation.goBack())
            }).catch(e => console.log(e))
        }
    }

    render () {
        const {type} = this.props.navigation.state.params
        const {productName, price, description} = this.state
        return <Container>
        <Header>
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name='arrow-back' style={{ color: '#000' }} />
                </Button>
            </Left>
          <Text>Detalhes de Produtos</Text>
        </Header>
        <Content style={styles.container}>
          <Text>Produto - {type}</Text>
          <TextInput style={styles.input} placeholder="Nome do Produto" onChangeText={(e) => this.changeText('productName', e)} value={productName} />
          <TextInput style={styles.input} placeholder="Preço do Produto" onChangeText={(e) => this.changeText('price', e)} value={price.toString()} />
          <TextInput style={styles.input} placeholder="Descrição do Produto" onChangeText={(e) => this.changeText('description', e)} value={description} />
          <Button onPress={() => this.gravar()}>
              <Text>{type === 'New' ? 'Cadastrar': 'Editar'}</Text>
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