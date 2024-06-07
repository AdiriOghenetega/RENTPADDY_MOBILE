import { StyleSheet,Dimensions } from "react-native";
import colors from "../configs/colors";

const { width, height } = Dimensions.get("window");

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
    backgroundColor: "rgba(0, 128, 255, 0.3)",
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
  historyHeader:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
   },
   headerText:{
   fontSize:18,
   color:colors.secondary,
   },
   viewAllText:{
     color:colors.gray,
     fontSize:14
   },
   likesContainer: {
    position: "absolute",
  bottom: 5,
  right: 5,
  zIndex: 1,
  flexDirection: "row",
  padding:5,
  alignItems:"center"
},
likesText:{
    color:colors.white,
  fontSize:14,
  marginRight:5
},
noPropertiesContainer: {
  height: height / 3,
},
noPropertiesText: {
  textAlign: "center",
  fontSize: 18,
  color: colors.secondary,
  fontFamily: "RalewayRegular",
  marginTop: 20,
},
});
