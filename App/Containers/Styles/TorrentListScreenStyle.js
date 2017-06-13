import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.nyaabg
  },
  row: {
    flex: 1,
    backgroundColor: Colors.nyaarowbg,
    height: 45,
    borderWidth: 0.5,
    borderColor: Colors.nyaaborder,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: Metrics.baseMargin,
    color: Colors.purpleBlack,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  uploader: {
    fontWeight: 'bold',
    fontSize: 8,
    position: 'relative',
    top: 0,
    right: 10,
    alignSelf: 'flex-end',
    zIndex: 3,
    color: Colors.purpleBlack,
    textAlign: 'right'
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  topView: {
    height: 45,
    overflow: 'hidden',
    marginLeft: 0,
    marginBottom: 0
  },
  topLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain'
  }
})
