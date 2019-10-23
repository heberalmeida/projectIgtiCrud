import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import axios from 'axios'

export default class ProductsIndex extends Component {
    constructor () {
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount () {
        this.request()
    }

    componentDidUpdate() {
        this.request()
    }

      async getProduct () {
        return new Promise((resolve, reject)=>{
            axios('products')
                .then(res => {
                    resolve(res.data)
                }).catch(e => console.log(e))
        })
      }

    async request () {
        const products = await this.getProduct()
        this.setState({
            products
        })
    }

    getNew (type, id = null) {
        this.props.navigation.navigate('Products', {
            type,
            id
        })
    }

    getDelete (id) {
        console.log('delete', id)
        axios.delete(`products/${id}`, {
            _id: id
        }).then(resp => {
            this.request()
        })
    }

    render () {
        const {products} = this.state
        return <View style={styles.container}>
            <Button small primary style={styles.btnSize} onPress={() => this.getNew('New')}>
                <Text>Novo</Text>
            </Button>
            {products.length ? products.map((product, key) => (
                <View key={key} style={styles.main}>
                    <View style={styles.list}>
                        <Text>{product.productName}</Text>
                        <Text>{product._id}</Text>
                    </View>
                    <View style={styles.action}>
                        <Button warning  onPress={() => this.getNew('Edit', product._id)}>
                            <Text>Editar</Text>
                        </Button>
                        <Button danger onPress={() => this.getDelete(product._id)}>
                            <Text>Apagar</Text>
                        </Button>
                    </View>

                </View>
            )): null}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    main: {
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        borderRadius: 10
    },
    btnSize: {
        width: 100
    },
    list: {
        flex: 2
    },
    action: {
        flex: 1,
        width: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})