import React from 'react'
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import { ScrollView } from 'react-native'

import TorrentListScreen from '../Containers/TorrentListScreen'
import SearchScreen from '../Containers/SearchScreen'
import UploadScreen from '../Containers/UploadScreen'

import UserBadge from '../Components/UserBadge'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const DrawerNav = DrawerNavigator({
  TorrentListScreen: {
    screen: TorrentListScreen,
    path: 'torrents?title=&category=&status=&max='
  },
  SearchScreen: {
    screen: SearchScreen
  },
  UploadScreen: { screen: UploadScreen }
}, {
  // Default config for all screens
  initialRouteName: 'TorrentListScreen',

  contentComponent: props => {
    return (
      <ScrollView style={[styles.container, styles.drawer]}>
        <UserBadge navigation={props.navigation} />

        <DrawerItems {...props} />
      </ScrollView>
    )
  },
  contentOptions: {
    style: styles.drawer,
    labelStyle: styles.drawerText
  }
})

export default DrawerNav
