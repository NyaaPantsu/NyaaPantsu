import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images} from '../Themes'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/TorrentListScreenStyle'
import API from '../Services/Api'

class TorrentListScreen extends React.Component {
  state: {
    dataSource: Object
  }

  static navigationOptions = ({ navigation }) => ({
      title: "Torrents",
      headerTitle: ((navigation.state.params && navigation.state.params.title) ? "Results for '" + navigation.state.params.title + "' - NyaaPantsu" : "Torrents - NyaaPantsu"),
      headerRight: ((navigation.state.params) ? (
        <TouchableOpacity style={ { paddingRight: 10, paddingLeft: 10 } } onPress={ navigation.state.params.setButtonReload }>
        <Icon name={( (navigation.state.params && (navigation.state.params.title || navigation.state.params.category || navigation.state.params.max || navigation.state.params.status )) ? "times-circle-o" : "refresh" )} size={30} />
        </TouchableOpacity>
      ) : '')
    });
  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = []

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    this.title = ""
    this.category = ""
    this.max = ""
    this.status = ""
    const rowHasChanged = (r1, r2) => r1.id !== r2.id

    // DataSource configured
    this.ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: this.ds.cloneWithRows(dataObjects)
    }
  }
  getData = async (params) => {
    if (params) {
      if (params.title !== undefined) this.title = params.title
      if (params.category !== undefined) this.category = params.category
      if (params.max !== undefined) this.max = params.max
      if (params.status !== undefined) this.status = params.status
    } else {
      this.title = ""
      this.category = ""
      this.max = ""
      this.status = ""
    }
    const api = API.create()
    const torrents = await api.getTorrents(this.title, this.category, this.max, this.status)
    if (torrents.ok) {
      this.setState({
        dataSource: this.ds.cloneWithRows(torrents.data)
      })
    } else {
      Alert.alert(
        'Error',
        'Seems like there was a network error, please try again.',
        [
          {text: 'Cancel', onPress: () => this.props.navigation.navigate("TorrentListScreen"), style: 'cancel'},
          {text: 'OK', onPress: () => this.getData()},
        ],
        { cancelable: false }
      )
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/

  renderRow (rowData) {
    const {navigate} = this.props.navigation;
    return (
      <View style={ styles.topView }>
      <View style={styles.row}>
        <TouchableOpacity onPress={ () => navigate("TorrentViewScreen", { id: rowData.id, name: rowData.name }) }>
          <Text style={styles.boldLabel}>{rowData.name}</Text>
        </TouchableOpacity>
          <Text style={ styles.uploader }>{rowData.uploader_name}</Text>
      </View>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
  componentDidMount() {
    const { username } = this.props;
    this.fetchUser(username);
  }
  *************************************************************/

  _setButtonReload() {
    if (this.title != "" || this.category != "" || this.max != "" || this.status != "" ) {
      this.props.navigation.setParams({ title: "", category: "", max: "", status: ""})
    } else {
      this.getData()
    }
  }

  componentDidMount() {
    // set handler method with setParams
    this.props.navigation.setParams({ 
      setButtonReload: this._setButtonReload.bind(this)
    });
    this.timerInterval = setInterval(() => {
      this.getData()
    }, 300000); // Every five minutes
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  componentWillReceiveProps (newProps) {
    let params = newProps.navigation.state.params
    if (params.title != this.title || params.category != this.category || params.max != this.max || params.status != this.status)
    this.getData(params)
    
  }
  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  // Render a footer.
  renderFooter = () => {
    return (
      <Text></Text>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.renchon} style={styles.topLogo} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderFooter={this.renderFooter}
          enableEmptySections
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentListScreen)
