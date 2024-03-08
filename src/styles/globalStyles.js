import { StyleSheet } from "react-native";
import colors from "../configs/colors";

export const globalStyles = StyleSheet.create({
  shadowContainer: {
    shadowColor: colors.lightgray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
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
  gridContainer:{
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems:"center",
    justifyContent:"center"
  },
});
