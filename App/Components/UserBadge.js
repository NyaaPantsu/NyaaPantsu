import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import styles from './Styles/UserBadgeStyle'
import {Images} from '../Themes'
import LoginActions, {isLoggedIn} from '../Redux/LoginRedux'

class UserBadge extends React.Component {
  constructor (props) {
    super(props)
    this.linkPress = this.linkPress.bind(this)
  }

  linkPress () {
    if (this.props.isAuthenticated) {
      this.props.logout()
    } else {
      this.props.navigation.navigate('LoginScreen')
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
      // Did the login attempt complete?
    console.log(newProps)
  }
  componentWillMount () {
    if (this.props.isAuthenticated) { this.props.checkLogin(this.props.user.username, this.props.user.token) }
  }
  render () {
    let avatar = Images.anon
    let username = 'れんちょん'
    let link = 'Login'
    if (this.props.isAuthenticated) {
      avatar = {uri: 'https://www.gravatar.com/avatar/' + this.props.user.md5}
      username = this.props.user.username
      link = 'Logout'
    }
    return (
      <View style={styles.container}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.link} onPress={this.linkPress}>
          <Text style={styles.linkText}>{ link }</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = function (state) {
  const { login } = state
  return {
    isAuthenticated: isLoggedIn(login),
    user: login.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    checkLogin: (username, token) => dispatch(LoginActions.checkLoginRequest(username, token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserBadge)

// // Prop type warnings
UserBadge.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func
}
UserBadge.defaultProps = {
  isAuthenticated: false
}
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// UserBadge.defaultProps = {
//   someSetting: false
// }
