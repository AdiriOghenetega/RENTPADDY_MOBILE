import { StyleSheet, Text, View, SafeAreaView, FlatList,Dimensions } from "react-native";
import React from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import PropertyCardBooking from "../../components/propertyComponents/propertyCardBooking";
import BookedList from "../../components/propertyComponents/bookedList";
import {useSelector} from "react-redux"
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useGetUserRentedHistoryQuery } from "../../features/user/userApiSlice";

const { width, height } = Dimensions.get("window");

export default function BookHistory({ navigation,route }) {

  const routeName = route?.params?.routeName

  const userInfo = useSelector(selectCurrentUser)
  
  const {data: bookingHistory,isloading:bookingHistoryLoading} = useGetUserRentedHistoryQuery({userId:userInfo?._id});
  
  const handleNavigate = () => {
    navigation.navigate(routeName || "Profile");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Booking History"}
        handleNavigate={handleNavigate}
        handleNotificationNavigate={()=>navigation.navigate("Notification",{routeName:route?.name})}
        isNavigate={true}
      />
      <BookedList data={bookingHistory} navigation={navigation} routeName={route?.name} />
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
