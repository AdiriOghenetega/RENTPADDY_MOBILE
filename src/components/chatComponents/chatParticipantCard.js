import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import Chatbox from "./chatbox";

const { width } = Dimensions.get("window");

export default function ChatParticipantCard({
  chatId,
  participants,
  unreadMessages,
  item,
  checkOnlineStatus
}) {
  if(!item || !participants){
    return null
  }

  
  const name=participants && participants[0]?.name,avatar = participants && participants[0]?.avatar
  
  return (
    <View style={[styles.container, globalStyles.shadowContainer]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: avatar?.url || "https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
        <View style={styles.dot}></View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage}>unread : </Text>
          <View style={[styles.unreadContainer,{backgroundColor : parseInt(unreadMessages) > 0 ? colors.primary : colors?.gray}]}>
            <Text style={styles.unreadText}>{unreadMessages}</Text>
          </View>
        </View>
        {checkOnlineStatus(item) && <View style={styles.onlineDot}></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    gap:10
  },
  imageContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  dot: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  detailsContainer: {
    width: "78%",
    justifyContent: "space-between",
    
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
  },
  lastMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: colors.gray,
  },
  unreadContainer: {
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    color: colors.white,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    position: "absolute",
    top: 10,
    right: 10,
   
  },
});
