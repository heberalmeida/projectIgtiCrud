import { createStackNavigator, DrawerNavigator } from 'react-navigation-stack'
import Login from '../Screens/Login'
import Home from '../Screens/Home'
import Users from '../Screens/Users'
import Products from '../Screens/Products/details'


export const createRootNavigator = (signedIn = false) => {
    return createStackNavigator(
        {
            Login: { screen: Login },
            Home: { screen: Home },
            Users: { screen: Users },
            Products: { screen: Products },
        },
        {
            initialRouteName: signedIn ? 'Login' : 'Home',
            headerMode: 'none'
        }
    )
}
