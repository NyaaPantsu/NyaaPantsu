import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/SearchScreenStyles'
import {Images, Metrics} from '../Themes'

class SearchScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  static navigationOptions = ({ navigation }) => ({
      title: "Search",
      headerTitle: "Search Torrents - NyaaPantsu",
    });

  constructor (props) {
    super(props)
    this.state = {
      title: "",
      category: '_',
      max: "50",
      s: "",
      visibleHeight: Metrics.screenHeight,
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the search attempt complete?
    if (this.isAttempting) {
      this.props.navigation.goBack()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }

  handlePressSearch = () => {
    const {navigate} = this.props.navigation;
    const { title, category, max, s } = this.state
    this.isAttempting = true
    // attempt a search - a saga is listening to pick it up from here.
    console.log("query:" + title)
    navigate("TorrentListScreen", {title: title, category:category, max: max, status:s})
  }

  handleChangeQuery = (text) => {
    this.setState({ title: text })
  }

  handleChangeCategory = (itemValue, itemIndex) => {
    this.setState({ category: itemValue })
  }

  handleChangeMaxResults = (itemValue, itemIndex) => {
    this.setState({ max: itemValue })
  }

  handleChangeStatus = (itemValue, itemIndex) => {
    this.setState({ s: itemValue })
  }

  render () {
    const { title, category, max, s } = this.state
    const editable = !this.isAttempting
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView style={ styles.background }>
        <Image source={Images.megumin} style={styles.topLogo} />
        <View contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Title</Text>
            <TextInput
              ref='title'
              style={textInputStyle}
              value={title}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeQuery}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressSearch}
              placeholder='Title' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Category</Text>
            <Picker
                ref="category"
                selectedValue={category}
                onValueChange={this.handleChangeCategory}
                editable={editable}>
                <Picker.Item value="_" label="All categories" />
                <Picker.Item value="3_" label="Anime" />
                <Picker.Item value="3_12" label="Anime - Anime Music Video" />
                <Picker.Item value="3_5" label="Anime - English-translated" />
                <Picker.Item value="3_13" label="Anime - Non-English-translated" />
                <Picker.Item value="3_6" label="Anime - Raw" />
                <Picker.Item value="2_" label="Audio" />
                <Picker.Item value="2_3" label="Audio - Lossless" />
                <Picker.Item value="2_4" label="Audio - Lossy" />
                <Picker.Item value="4_" label="Literature" />
                <Picker.Item value="4_7" label="Literature - English-translated" />
                <Picker.Item value="4_14" label="Literature - Non-English-translated" />
                <Picker.Item value="4_8" label="Literature - Raw" />
                <Picker.Item value="5_" label="Live Action" />
                <Picker.Item value="5_9" label="Live Action - English-translated" />
                <Picker.Item value="5_10" label="Live Action - Idol/Promotional Video" />
                <Picker.Item value="5_18" label="Live Action - Non-English-translated" />
                <Picker.Item value="5_11" label="Live Action - Raw" />
                <Picker.Item value="6_" label="Pictures" />
                <Picker.Item value="6_15" label="Pictures - Graphics" />
                <Picker.Item value="6_16" label="Pictures - Photos" />
                <Picker.Item value="1_" label="Software" />
                <Picker.Item value="1_1" label="Software - Applications" />
                <Picker.Item value="1_2" label="Software - Games" />
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Picker
                ref="s"
                selectedValue={s}
                onValueChange={this.handleChangeStatus}
                editable={editable}>
                <Picker.Item value="0" label="Show all" />
                <Picker.Item value="1" label="Filter Remakes" />
                <Picker.Item value="2" label="Trusted" />
                <Picker.Item value="3" label="A+" />
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Max Results</Text>
            <Picker
                ref="max"
                selectedValue={max}
                onValueChange={this.handleChangeMaxResults}
                editable={editable}>
                <Picker.Item value="5" label="5" />
                <Picker.Item value="10" label="10" />
                <Picker.Item value="15" label="15" />
                <Picker.Item value="20" label="20" />
                <Picker.Item value="25" label="25" />
                <Picker.Item value="30" label="30" />
                <Picker.Item value="35" label="35" />
                <Picker.Item value="40" label="40" />
                <Picker.Item value="45" label="45" />
                <Picker.Item value="50" label="50" />
                <Picker.Item value="70" label="70" />
                <Picker.Item value="100" label="100" />
                <Picker.Item value="150" label="150" />
                <Picker.Item value="200" label="200" />
                <Picker.Item value="300" label="300" />
            </Picker>
          </View>
          <View style={[styles.searchRow]}>
            <TouchableOpacity style={styles.searchButtonWrapper} onPress={this.handlePressSearch}>
              <View style={styles.searchButton}>
                <Text style={styles.searchText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    )
  }
}


export default SearchScreen
