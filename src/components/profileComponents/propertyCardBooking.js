import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import colors from "../../configs/colors";

export default function PropertyCardBooking({
  propertyName,
  location,
  checkInDate,
  checkOutDate,
  images,
  status,
}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0] }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.propertyNameText}>{propertyName}</Text>
        <Text style={styles.checkInDate}>Booked on : {checkInDate}</Text>
        <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            { color: status === "expired" ? colors.red : "green" },
          ]}
        >
          {status}
        </Text>
        {status === "expired" && <TouchableOpacity>
          <Text style={styles.bookAgain}>Book again</Text>
        </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    gap: 5,
    width:"80%"
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
  justifyContent:"space-between"
  },
  bookAgain:{
    color:colors.primary,
    fontSize:16,
    fontWeight:"600",
  }
});
