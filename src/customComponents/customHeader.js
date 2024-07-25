import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React,{ useEffect, useState, useRef } from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import colors from "../configs/colors";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { io } from "socket.io-client";
import { useGetNotificationCountQuery } from "../features/notification/notificationApiSlice";
import { selectCurrentUser } from "../features/auth/authSlice";
import {useSelector} from "react-redux"

export default function CustomHeader({
  title,
  handleNavigate,
  rightHeader,
  leftHeader,
  isNavigate,
  handleNotificationNavigate,
}) {

  const socket = useRef();
  const io_link = EXPO_PUBLIC_BASE_URL;

  const userInfo = useSelector(selectCurrentUser);

  const { data: notificationCountData } = useGetNotificationCountQuery({
    userId: userInfo._id
  });

  const [notificationCount, setNotificationCount] = useState(0);

  function fetchNotificationCount(){
    if(notificationCountData){
      setNotificationCount(notificationCountData?.unreadCount)
    }
  }

  useEffect(() => {

    fetchNotificationCount();
    
  }, [userInfo?._id,notificationCountData]);

  useEffect(() => {
    socket.current = io(io_link);
  }, [io_link]);

  useEffect(() => {
    // Listen for new notifications
    socket.current.on(`notification_${userInfo._id}`, (newNotification) => {
      // Increment notification count when a new notification arrives
      console.log("notification alert");
      setNotificationCount((prevCount) => prevCount + 1);
    });

    // Get initial notification count when the component mounts
    fetchNotificationCount();

    return () => {
      socket.current.disconnect();
    };
  }, [socket, userInfo._id,notificationCountData]);

  const handleNotificationGeneralNavigate = () => {
    handleNotificationNavigate()
    setNotificationCount(0);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.headerTitle}>
        {isNavigate && (
          <View style={styles.arrowIcon}>
            <Ionicons
              name="arrow-back"
              size={23}
              color={colors.primary}
              onPress={handleNavigate}
            />
          </View>
        )}
        {leftHeader?.exists && !isNavigate && leftHeader.component}
        {title && (
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
        {!rightHeader && (
          <TouchableOpacity
            onPress={handleNotificationGeneralNavigate}
            style={styles.notification}
          >
            {notificationCount > 0 && <Text style={[styles.notificationCountText,{color:notificationCount < 1 ? colors.gray:"red"}]}>{notificationCount}</Text>}
            <Octicons name="bell" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}
        {rightHeader?.exists && rightHeader.component}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  arrowIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
  },
  titleTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  notification: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCountText:{
    fontSize: 14,
    position: "absolute",
    top: 5,
    right: 5,
  }
});
