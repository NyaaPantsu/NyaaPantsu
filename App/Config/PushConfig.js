import React from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import PushNotification from 'react-native-push-notification'
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';

// https://github.com/zo0r/react-native-push-notification
PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    if (__DEV__) console.log('TOKEN:', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    if (__DEV__) console.log('NOTIFICATION:', notification)
    const torrentFilePath = notification.message
    console.log(torrentFilePath)
    Share.open({
      message: "Torrent File - NyaaPantsu",
      url: "file://"+torrentFilePath,
      subject: "Torrent File - NyaaPantsu" //  for email
    });
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  // Leave this off unless you have good reason.
  popInitialNotification: true,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    * This example app shows how to best call requestPermissions() later.
    */
  requestPermissions: true
})

async function requestExternalStoragePermission() {
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
      console.log("You can upload torrents")
    } else {
      console.log("External Storage permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}