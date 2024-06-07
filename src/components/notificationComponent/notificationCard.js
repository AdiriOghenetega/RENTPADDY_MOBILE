import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../configs/colors";

export default function NotificationCard({
  color,
 name,
  createdAt,
  message,
 link,
 status
}) {
   
 
  return (
    <View style={styles.container} >
      <View style={[styles.iconContainer, { backgroundColor: color?.color }]}>
        {color?.icon}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={[styles.timeStamp]}>
            {createdAt?.split(" ")[1]} {createdAt?.split(" ")[2]}
          </Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    alignItems:"center",
    marginVertical:5,
    gap:10
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems:"center",
    justifyContent:"center",
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    padding: 10,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    width:"60%",
  },
  timeStamp: {
    width:"30%",
    color:colors.primary
  },
  message: {
    marginTop: 10,
    fontSize: 14,
  },
});
