import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 70,
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
  switchRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: "row"
  },
  rowLabel: {
    color: Colors.charcoal
  },
  switchLabel: {
    alignSelf: "flex-start",
    flex: 1
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  uploadRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    flex: 1
  },
  uploadButtonWrapper: {
    flex: 1,
    paddingHorizontal: 50
  },
  uploadButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  fileButtonWrapper: {
    flex: 1,
    alignSelf: "flex-start",
    marginVertical: Metrics.baseMargin,
  },
  fileButton: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  fileLabel: {
    textAlign: 'center',
    flex:2,
    alignSelf: "flex-start",
    marginVertical: Metrics.smallMargin,
    color: Colors.charcoal,
    paddingTop: Metrics.baseMargin
  },
  uploadText: {
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