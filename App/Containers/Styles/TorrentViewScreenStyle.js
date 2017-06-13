import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 70,
    paddingBottom: 70
  },
  background: {
    backgroundColor: Colors.nyaabg,
    flex: 1
  },
  torrent: {
    backgroundColor: Colors.nyaarowbg,
    margin: Metrics.baseMargin,
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin
  },
  topLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain'
  }
})
