import React, {PropTypes} from 'react'
import { ScrollView, Text, TextInput, Image, TouchableOpacity, View, Picker, Switch } from 'react-native'
import { connect } from 'react-redux'
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker'
import RNFetchBlob from 'react-native-fetch-blob'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {Images} from '../Themes'
import styles from './Styles/UploadScreenStyle'
import {isLoggedIn} from '../Redux/LoginRedux'

class UploadScreenScreen extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    user: PropTypes.object
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Upload Torrent',
    headerTitle: 'Upload - NyaaPantsu'
  });
  constructor (props) {
    super(props)

    this.state = { // Default values
      name: '',
      category: '3_5',
      website: '',
      description: '',
      torrent: {fileName: ''},
      remake: false,
      anon: false
    }
    this.isAttempting = false
  }

  handleChangeName = (text) => {
    this.setState({name: text})
  }
  handleChangeWebsite = (text) => {
    this.setState({website: text})
  }
  handleChangeDescription = (text) => {
    this.setState({description: text})
  }
  handleChangeCategory = (itemValue, itemIndex) => {
    this.setState({category: itemValue})
  }
  handleChangeAnon = (bool) => {
    this.setState({anon: bool})
  }
  handleChangeRemake = (bool) => {
    this.setState({remake: bool})
  }

  handlePressUpload = () => {
    const { name, category, website, description, remake, anon, torrent } = this.state
    console.log(this.props.user)
    const token = (this.props.user) ? this.props.user.token : ''
    const username = (this.props.user) ? this.props.user.username : ''
    this.isAttempting = true
    RNFetchBlob.fetch('POST', 'http://nyaa.pantsu.cat/api/upload', {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    // here's the body you're going to send, should be a BASE64 encoded string
    // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
    // The data will be converted to "byte array"(say, blob) before request sent.
    }, [
  {name: 'torrent', filename: torrent.fileName, data: RNFetchBlob.wrap(torrent.uri)},
  {name: 'username', data: username},
  {name: 'name', data: name},
  {name: 'c', data: category},
  {name: 'website_link', data: website},
  {name: 'desc', data: description},
  {name: 'remake', data: (remake) ? 'true' : 'false'},
  {name: 'hidden', data: (anon) ? 'true' : 'false'}
    ])
    .then((res) => {
      this.isAttempting = false
      const resJson = res.json()
      if (resJson.ok) {
        this.props.navigation.navigate('TorrentViewScreen', { id: resJson.data.id, name: resJson.data.name })
      }
    })
    .catch((err) => {
      // error handling ..
      console.log(err)
    })
  }
  handlePressFile = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()]
    }, (error, url) => {
      if (error === null) {
        if (__DEV__) console.log(url)
        this.setState({torrent: url})
        if (this.state.name === '') {
          this.setState({name: url.fileName})
        }
      }
    })
  }

  render () {
    const { name, category, website, description, remake, anon, torrent } = this.state
    const editable = !this.isAttempting
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    let markAsAnon
    if (this.props.isLogged) {
      markAsAnon = (
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Upload as Anonymous</Text>
          <Switch
            onValueChange={this.handleChangeAnon}
            value={anon} />
        </View>
      )
    }
    return (
      <ScrollView style={styles.background}>
        <Image source={Images.megumin} style={styles.topLogo} />
        <View contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
          <View style={styles.form}>
            <View style={styles.uploadRow}>
              <TouchableOpacity style={styles.fileButtonWrapper} onPress={this.handlePressFile}>
                <View style={styles.fileButton}>
                  <Text style={styles.uploadText}>Choose Torrent File</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.fileLabel}>{ torrent.fileName }</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Name</Text>
              <TextInput
                ref='name'
                style={textInputStyle}
                value={name}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeName}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.category.focus()}
                placeholder='Name' />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Category</Text>
              <Picker
                ref='category'
                selectedValue={category}
                onValueChange={this.handleChangeCategory}
                editable={editable}>
                <Picker.Item value='3_12' label='Anime - Anime Music Video' />
                <Picker.Item value='3_5' label='Anime - English-translated' />
                <Picker.Item value='3_13' label='Anime - Non-English-translated' />
                <Picker.Item value='3_6' label='Anime - Raw' />
                <Picker.Item value='2_3' label='Audio - Lossless' />
                <Picker.Item value='2_4' label='Audio - Lossy' />
                <Picker.Item value='4_7' label='Literature - English-translated' />
                <Picker.Item value='4_14' label='Literature - Non-English-translated' />
                <Picker.Item value='4_8' label='Literature - Raw' />
                <Picker.Item value='5_9' label='Live Action - English-translated' />
                <Picker.Item value='5_10' label='Live Action - Idol/Promotional Video' />
                <Picker.Item value='5_18' label='Live Action - Non-English-translated' />
                <Picker.Item value='5_11' label='Live Action - Raw' />
                <Picker.Item value='6_15' label='Pictures - Graphics' />
                <Picker.Item value='6_16' label='Pictures - Photos' />
                <Picker.Item value='1_1' label='Software - Applications' />
                <Picker.Item value='1_2' label='Software - Games' />
              </Picker>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Website</Text>
              <TextInput
                ref='website'
                style={textInputStyle}
                value={website}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeWebsite}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.description.focus()}
                placeholder='http:// or irc://' />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Description</Text>
              <TextInput
                ref='description'
                value={description}
                editable={editable}
                multiline
                numberOfLines={4}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeDescription}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpload}
                placeholder='Markdown or HTML Tags accepted' />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Mark as Remake</Text>
              <Switch
                onValueChange={this.handleChangeRemake}
                value={remake} />
            </View>
            {markAsAnon}
            <View style={[styles.uploadRow]}>
              <TouchableOpacity style={styles.uploadButtonWrapper} onPress={this.handlePressUpload}>
                <View style={styles.uploadButton}>
                  <Text style={styles.uploadText}>Upload</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: isLoggedIn(state.login),
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreenScreen)
