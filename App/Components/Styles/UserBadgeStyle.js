import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  avatar: {
    borderRadius: 35,
    alignSelf: "flex-start",
    height: 70,
    width: 70,
    position: "relative"
  },
  username: {
    position: "relative",
    flex:1,
    paddingTop: 20,
    paddingHorizontal: Metrics.baseMargin,
    alignSelf: "flex-start",
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.emphasis
  },
  link: {
    position: "relative",
    alignSelf: "flex-end",
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin
  },
  linkText: {
    textAlign: "right",
    ...Fonts.style.h6
  }
})
