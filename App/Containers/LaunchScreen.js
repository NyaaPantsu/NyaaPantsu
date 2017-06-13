import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  componentWillMount () {
    async function requestExternalStoragePermission () {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'NyaaPantsu Permission',
            'message': 'NyaaPantsu needs access to your file storage ' +
                      'so you can upload torrents.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can upload torrents')
        } else {
          console.log('External Storage permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestExternalStoragePermission()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity style={styles.logoOverBackground} onPress={() => this.props.navigation.navigate('MainScreen')} >
          <Image source={Images.megumin} />
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          <View style={styles.centered} >
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Congrats, You just installed the new app for NyaaPantsu!
            </Text>
            <Text style={styles.sectionText}>
              With this you're ready to grab anything you want! Now, it's time to *mofu* *mofu* (click) Megumin!
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
