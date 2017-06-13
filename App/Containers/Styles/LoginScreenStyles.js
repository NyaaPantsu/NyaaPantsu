import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.nyaabg
  },
  form: {
    backgroundColor: Colors.nyaarowbg,
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
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'center',
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  errorLabel: {
    backgroundColor: Colors.ember,
    padding: Metrics.smallMargin,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 5
  },
  errorText: {
    fontSize: Fonts.size.tiny
  }
})
