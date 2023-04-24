import { StyleSheet, Platform } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: '100%',
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 85,
    height: 85,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: Platform.OS === 'web' ? '105%' : '95%',
    height: Platform.OS === 'web' ? '25%' : '22%',
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0,
    borderColor: 'transparent',
    elevation: 0
  },
  logoImage: {
    width: "97%",
    height: "98%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  deleteButton: {
    marginRight: Platform.OS === 'web' ? 10 : 0,
    paddingRight: Platform.OS === 'web' ? 4 : 0,
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: {
    fontSize: SIZES.large - 2,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher:{
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
