import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 70
  },
  background: {
    backgroundColor: Colors.background
  },
  form: {
    backgroundColor: Colors.snowAlpha,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  searchRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  searchButtonWrapper: {
    flex: 1,
    height: 35,
    paddingHorizontal: 50
  },
  searchButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  searchText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    position: 'absolute',
    top: 0,
    right: 0,
    resizeMode: 'contain'
  }
})
