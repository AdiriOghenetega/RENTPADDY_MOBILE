import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,Modal } from "react-native";
import React,{useState} from "react";
import colors from "../../configs/colors";
import { mockProperties } from "../../data/mockData";
import BookedPropertyDetails from "../../screens/propertyScreen/bookedPropertyDetails";


const {height,width} = Dimensions.get("window")

export default function PropertyCardBooking({
  propertyName,
  location,
  checkInDate,
  checkOutDate,
  images,
  status,
  myBooking,
  id,
  navigation,
  routeName
}) {

const handleNavigateToBookingDetails = () => {
  navigation.navigate("BookedPropertyDetails", {
    ...mockProperties[id],routeName,
    myBooking
})
}

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToBookingDetails}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0] }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.propertyNameText}>{propertyName}</Text>
        <Text style={styles.checkInDate}>Booked on : {checkInDate}</Text>
        <Text style={styles.checkInDate}>{status === "expired" ? "Expired":"Expires"} on : {checkInDate}</Text>
        <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            { color: status === "expired" && colors.red || status === "active" &&  "green" || status === "pending" &&  "purple" },
          ]}
        >
          {status}
        </Text>
        {(status === "expired" && !myBooking) && <TouchableOpacity>
          <Text style={styles.bookAgain}>Book again</Text>
        </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
   width:"100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    flex:1,
    gap: 5,
  },
  propertyNameText: {
    fontSize: 16,
    fontFamily: "RalewayBold",
    color: colors.secondary,
  },
  checkInDate: {
    fontSize: 14,
    color: colors.gray,
  },
  statusText: {
    textTransform: "capitalize",
  },
  statusContainer:{
    flexDirection:"row",
    alignItems:"center",
  justifyContent:"space-between",
  },
  bookAgain:{
    color:colors.primary,
    fontSize:14,
    fontWeight:"600",
  }
});
