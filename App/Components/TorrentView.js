import React from 'react'
import { View, Text, TouchableOpacity, Platform, Alert, Clipboard } from 'react-native'
import PushNotification from 'react-native-push-notification'
import RNFetchBlob from 'react-native-fetch-blob'

import styles from './Styles/TorrentViewStyle'
import ConvertCategory from '../Transforms/ConvertCategory'
import { Colors } from '../Themes'

export default class TorrentView extends React.Component {
  constructor (props) {
    super(props)
    this.onDownloadTorrentPress = this.onDownloadTorrentPress.bind(this)
    this.onCopyPress = this.onCopyPress.bind(this)

    this.state = {
      copyMess: 'Copy',
      downloadMess: 'Download',
      showMore: false,
      showFiles: false
    }
  }
  onDownloadTorrentPress () {
    if (this.props.torrent.torrent !== '') {
/*    Old RN way
      const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
      RNFS.downloadFile({
        fromUrl: this.props.torrent.torrent,
        toFile: `${SavePath}/${this.props.torrent.hash}.torrent`,
      }).promise.then((r) => {
        PushNotification.localNotification({
          title: "Torrent File downloaded",
          message: this.props.torrent.hash
        })
      });
*/
      let dirs = RNFetchBlob.fs.dirs
      const SavePath = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir
      RNFetchBlob
      .config({
        // response data will be saved to this path if it has access right.
        path: SavePath + '/' + this.props.torrent.hash + '.torrent'
      })
      .fetch('GET', this.props.torrent.torrent, {
        // some headers ..
      })
      .then((res) => {
        RNFetchBlob.fs.scanFile([ { path: res.path(), mime: 'application/x-bittorrent' } ])
        PushNotification.localNotification({
          title: 'Torrent File downloaded in the following path:',
          message: res.path()
        })
        this.setState({downloadMess: 'Downloaded'})
      })
    } else {
      Alert.alert(
        'Error',
        'Seems like there is no download link for this torrent...',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      )
    }
  }

  onCopyPress () {
    Clipboard.setString(this.props.torrent.magnet)
    this.setState({copyMess: 'Copied'})
  }

  render () {
    if (this.props.torrent.name === '') {
      return (
        <View style={styles.container}>
          <Text style={styles.center}>Fetching data...</Text>
        </View>
      )
    }

    let torrent = this.props.torrent
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{ torrent.name }</Text>
        <Text><Text style={styles.boldText}>Category:</Text> { ConvertCategory(torrent.category, torrent.sub_category) }</Text>
        <Text><Text style={styles.boldText}>Uploaded by:</Text> { torrent.uploader_name }</Text>
        <Text><Text style={styles.boldText}>Website Link:</Text> { torrent.website_link }</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressGreen, { flex: torrent.seeders }]} />
          <View style={[styles.progressRed, { flex: torrent.leechers }]} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, {backgroundColor: Colors.palegreen}]} onPress={this.onDownloadTorrentPress}>
            <Text style={styles.buttonText}>{ this.state.downloadMess }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: Colors.coal}]} onPress={this.onCopyPress}>
            <Text style={styles.buttonText}>{this.state.copyMess}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => { this.setState({showMore: !this.state.showMore}) }}>
          <Text style={[styles.buttonText, styles.buttonDisplay]}>Toggle More Infos</Text>
        </TouchableOpacity>
        <MoreInfos
          date={torrent.date}
          hash={torrent.hash}
          filesize={torrent.filesize}
          seeders={torrent.seeders}
          leechers={torrent.leechers}
          completed={torrent.completed}
          last_scrape={torrent.last_scrape}
          display={this.state.showMore} />
        <Text style={styles.title}>Comments</Text>
        <View style={styles.moreinfos}>
          <Text style={styles.center}>No comments</Text>
        </View>
      </View>
    )
  }
}

TorrentView.defaultProps = {
  torrent: {}
}

TorrentView.propTypes = {
  torrent: React.PropTypes.object.isRequired
}

class MoreInfos extends React.Component {
  render () {
    if (this.props.display) {
      return (<View style={styles.moreinfos}>
        <Text><Text style={styles.boldText}>Date:</Text> { this.props.date }</Text>
        <Text><Text style={styles.boldText}>Hash:</Text> { this.props.hash }</Text>
        <Text><Text style={styles.boldText}>Size:</Text> { this.props.filesize }</Text>
        <Text><Text style={styles.boldText}>Seeders:</Text> { this.props.seeders }</Text>
        <Text><Text style={styles.boldText}>Leechers:</Text> { this.props.leechers }</Text>
        <Text><Text style={styles.boldText}>Completed:</Text> { this.props.completed }</Text>
        <Text><Text style={styles.boldText}>Last scraped:</Text> { this.props.last_scrape }</Text>
      </View>)
    } else {
      return null
    }
  }
}

/* Waiting for scraping to actually work on the website
class Files extends React.Component {
  renderRow(rowData) {
    return ()
  }
  render() {
    if (this.props.display) {
      const rows = this.props.filelist.map((o, value) => this.renderRow(value))
    return (<View style={ styles.moreinfos  }>
            <Text><Text style={ styles.boldText }>Date:</Text> { this.props.date }</Text>
            <Text><Text style={ styles.boldText }>Hash:</Text> { this.props.hash }</Text>
            <Text><Text style={ styles.boldText }>Size:</Text> { this.props.filesize }</Text>
            <Text><Text style={ styles.boldText }>Seeders:</Text> { this.props.seeders }</Text>
            <Text><Text style={ styles.boldText }>Leechers:</Text> { this.props.leechers }</Text>
            <Text><Text style={ styles.boldText }>ompleted:</Text> { this.props.completed }</Text>
            <Text><Text style={ styles.boldText }>Last scraped:</Text> { this.props.last_scrape }</Text>
          </View>)
    }
  }
} */

// // Prop type warnings
// TorrentView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// TorrentView.defaultProps = {
//   someSetting: false
// }
