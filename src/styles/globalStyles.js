import { StyleSheet } from "react-native";
import colors from "../configs/colors";

export const globalStyles = StyleSheet.create({
  shadowContainer: {
    elevation: 3,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  logo: {
    width: 53,
    height: 75,
  },
  customHr: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.lightgray,
    marginVertical: 10,
  },
  naira: {
    color: colors.primary,
    fontSize: 18,
  },
  nairaContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  grayText: {
    color: colors.gray,
    fontSize: 18,
  },
  blackText: {
    color: colors.black,
    fontSize: 18,
  },
  rightHeader: {
    marginRight: 20,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  dropDownButton: {
    backgroundColor: "rgba(14, 168, 87, 0.3)",
    width: "100%",
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  dropDownRowText: {
    color: colors.primary,
    fontSize: 15,
  },
  dropDownButtonText: {
    fontSize: 15,
  },
});
