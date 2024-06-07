import { StyleSheet, Text, View, SafeAreaView, FlatList,Dimensions } from "react-native";
import React from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import PropertyCardBooking from "../../components/propertyComponents/propertyCardBooking";
import MyBookedListComponent from "../../components/propertyComponents/myBookedList";
import { mockUserData } from "../../data/mockData";

const { width, height } = Dimensions.get("window");

export default function MyBookedList({ navigation,route }) {

  const routeName = route?.params?.routeName
  
  const { bookingHistory } = mockUserData;
  // console.log(mockUserData,"see all")
  const handleNavigate = () => {
    navigation.navigate(routeName || "Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"My Booked List"}
        handleNavigate={handleNavigate}
        handleNotificationNavigate={()=>navigation.navigate("Notification",{routeName:route?.name})}
        isNavigate={true}
      />
      <MyBookedListComponent data={bookingHistory} navigation={navigation} routeName={route?.name} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  historyFlatList: {
    flex: 1,
  },
  historyFlatListSubContainer: {
    width: width - 20,
    alignSelf: "center",
  },
  emptyHistoryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHistoryText: {
    color: colors.gray,
    fontSize: 14,
  },
});
