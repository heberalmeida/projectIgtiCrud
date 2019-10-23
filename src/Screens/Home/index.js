import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base'
import UsersView from '../Users'
import ProductsView from '../Products'

export default class HomeIndex extends Component {
    constructor (props) {
    super(props)
    this.state = {
      selectTab: 'Users'
    }
  }

  setTab = tab => {
    this.setState({
      selectTab: tab
    })
  }

    render () {
        const {selectTab} = this.state
        return  <Container>
        <Header>
          <Text>{selectTab}</Text>
        </Header>
        <Content>
          {selectTab === 'Users' ? <UsersView {...this.props} /> : <ProductsView {...this.props} />}
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.setTab('Users')} active={selectTab === 'Users'} vertical>
              <Text>Usuários</Text>
            </Button>
            <Button onPress={() => this.setTab('Products')} active={selectTab === 'Products'} vertical>
              <Text>Produtos</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    }
}