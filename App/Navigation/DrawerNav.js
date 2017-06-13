import React, { Component } from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import { TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TorrentListScreen from '../Containers/TorrentListScreen'
import SearchScreen from '../Containers/SearchScreen'
import UploadScreen from '../Containers/UploadScreen'

import UserBadge from "../Components/UserBadge"

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const DrawerNav = DrawerNavigator({
  TorrentListScreen: {
    screen: TorrentListScreen,
    path: "torrents?title=&category=&status=&max="
  },
  SearchScreen: {
    screen: SearchScreen
  },
  UploadScreen: { screen: UploadScreen },
}, {
  // Default config for all screens
  initialRouteName: 'TorrentListScreen',

  contentComponent: props => renderDrawer(props),
  contentOptions: {
    style: styles.drawer,
    labelStyle: styles.drawerText,
  }
})

renderDrawer = props => {
  return (
  <ScrollView style={ [styles.container, styles.drawer] }>
    <UserBadge navigation={ props.navigation } />

    <DrawerItems {...props} />
  </ScrollView>
  )
};

export default DrawerNav
