import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    marginBottom: 20
  },
  center: {
    textAlign:"center"
  },
  table: {
    flexDirection: 'column',
    flex:1
  },
  row: {
    flexDirection: 'row'
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin
  },
  progressGreen: {
    height: 10,
    backgroundColor: Colors.palegreen
  },
  progressRed: {
    height: 10,
    backgroundColor: Colors.fire
  },
  title: {
    textAlign:"center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.purpleBlack,
  },
  button: {
    height: 45,
    borderRadius: 5,
    flex:1,
    marginHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  boldText: {
    fontWeight: "bold",
    color: Colors.purpleBlack,
  },
  buttonDisplay: {
    color: Colors.charcoal
  },
  moreinfos: {
    marginVertical: Metrics.baseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.cloud
  }
})
