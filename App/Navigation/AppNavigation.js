import React from 'react'
import { StackNavigator } from 'react-navigation'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import DrawerNav from './DrawerNav'
import LoginScreen from '../Containers/LoginScreen'
import TorrentViewScreen from '../Containers/TorrentViewScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TorrentViewScreen: { screen: TorrentViewScreen },
  LaunchScreen: { screen: LaunchScreen,
    navigationOptions: { header: null }
  },
  LoginScreen: {
    screen: LoginScreen
  },
  MainScreen: {
    screen: DrawerNav,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu - NyaaPantsu',
      headerLeft: (<MenuButton navigation={navigation} />)
    })
  }
}, {
  // Default config for all screens
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

class MenuButton extends React.Component {
  constructor (props) {
    super(props)
    this.isOpen = false
    this.state = {
      icon: 'bars'
    }
  }

  openDrawer = () => this.props.navigation.navigate('DrawerOpen')
  closeDrawer = () => this.props.navigation.navigate('DrawerClose')

  toggleDrawer () {
    if (this.isOpen) {
      this.isOpen = false
      this.closeDrawer()
      this.setState({
        icon: 'bars'
      })
    } else {
      this.isOpen = true
      this.openDrawer()
      this.setState({
        icon: 'arrow-left'
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.navigation.state.index <= 1) {
      this.isOpen = newProps.navigation.state.index === 0
      this.toggleDrawer()
    }
  }
  render () {
    return (
      <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 10 }} onPress={() => this.toggleDrawer()}>
        <Icon name={this.state.icon} size={30} />
      </TouchableOpacity>
    )
  }
}

export default PrimaryNav
