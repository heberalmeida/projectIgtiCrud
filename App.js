import React, { Component } from 'react'
import {Root} from 'native-base'
import { createAppContainer } from 'react-navigation'
import { createRootNavigator } from './src/Routes'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/api'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signedIn: true,
    }
  }

  render() {
    const { signedIn } = this.state
    const Layout = createRootNavigator(signedIn)
    const AppContainer = createAppContainer(Layout)
    return <Root>
        <AppContainer style={{flex: 1}} />
      </Root>
  }
}