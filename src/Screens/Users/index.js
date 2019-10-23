import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import axios from 'axios'

export default class ProductsIndex extends Component {
    constructor () {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount () {
        this.verificar()
    }
    
      async getUsers () {
        return new Promise((resolve, reject)=>{
            axios('users')
                .then(res => {
                    resolve(res.data)
                }).catch(e => console.log(e))
        })
      }
    
    async verificar () {
        const users = await this.getUsers()
        this.setState({
            users
        })
    }

    render () {
        const {users} = this.state
        return <View style={styles.container}>
            <Button small primary style={styles.btnSize}>
                <Text>Novo</Text>
            </Button>
            {users.length ? users.map((user, key) => (
                <View key={key} style={styles.main}>
                    <View style={styles.list}>
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                    </View>
                    <View style={styles.action}>
                        <Button warning>
                            <Text>Editar</Text>
                        </Button>
                        <Button danger> 
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