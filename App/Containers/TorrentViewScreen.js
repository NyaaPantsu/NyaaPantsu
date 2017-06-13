import React from 'react'
import { ScrollView, TouchableOpacity, Alert, View, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TorrentViewScreenStyle'
import TorrentView from '../Components/TorrentView'
import API from '../Services/Api'
import {Images} from '../Themes'

class TorrentViewScreenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'View Torrent',
    headerTitle: ((navigation.state.params && navigation.state.params.name) ? navigation.state.params.name + ' - NyaaPantsu' : 'NyaaPantsu'),
    headerRight: ((navigation.state.params) ? (
      <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 10 }} onPress={navigation.state.params.setButtonReload}>
        <Icon name='refresh' size={30} />
      </TouchableOpacity>
      ) : '')
  });
  constructor (props) {
    super(props)
    this.name = ''
    this.id = 0

    // Datasource is always in state
    this.state = {
      torrent: {
        id: 0,
        name: '',
        status: 1,
        hash: '',
        date: '',
        filesize: 0,
        description: '',
        comments: [],
        sub_category: '',
        category: '',
        anidb_id: '',
        downloads: 0,
        uploader_id: 2,
        uploader_name: '',
        uploader_old: '',
        website_link: '',
        magnet: '',
        torrent: '',
        seeders: 0,
        leechers: 0,
        completed: 0,
        last_scrape: '',
        file_list: []
      }
    }
  }
  getData = async (params) => {
    console.log(params)
    if (params) {
      if (params.name !== undefined) this.name = params.name
      if (params.id !== undefined) this.id = params.id
    }
    const api = API.create()
    const torrentResult = await api.getTorrent(this.id)
    if (torrentResult.ok) {
      this.setState({
        torrent: torrentResult.data
      })
    } else {
      Alert.alert(
        'Error',
        'Seems like there was a network error, please try again.',
        [
          {text: 'Cancel', onPress: () => this.props.navigation.navigate('TorrentListScreen'), style: 'cancel'},
          {text: 'OK', onPress: () => this.getData()}
        ],
        { cancelable: false }
      )
    }
  }

  componentDidMount () {
     // set handler method with setParams
    this.props.navigation.setParams({
      setButtonReload: this.getData.bind(this)
    })
  }

  componentWillReceiveProps (newProps) {
    let params = newProps.navigation.state.params
    if (params.id !== this.id || params.name !== this.name) { this.getData(params) }
  }

  render () {
    return (
      <View style={styles.background}>
        <Image source={Images.renchon} style={styles.topLogo} />
        <ScrollView>
          <View contentContainerStyle={{justifyContent: 'center'}} style={styles.container} keyboardShouldPersistTaps='always'>
            <View style={styles.torrent}>
              <TorrentView torrent={this.state.torrent} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentViewScreenScreen)
