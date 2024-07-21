import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import CustomHeader from "../../customComponents/customHeader";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import NotificationCard from "../../components/notificationComponent/notificationCard";
import { useGetNotificationsQuery,useUpdateNotificationStatusMutation } from "../../features/notification/notificationApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {useSelector} from "react-redux"
import { io } from "socket.io-client";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { formatDistanceToNow } from "date-fns";

export default function Notification({ navigation,route }) {
  
 const routeName  = route?.params?.routeName

 const userInfo = useSelector(selectCurrentUser)

 const {data : notificationData, isLoading, isError} = useGetNotificationsQuery({userId:userInfo?._id});
 const [markAsRead] = useUpdateNotificationStatusMutation();

 const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

 useEffect(() => {
  let notifications, unreadCount 
  if(notificationData) {
   notifications = notificationData?.notifications;
   unreadCount  = notificationData?.unreadCount;
  setNotifications(notifications);
  setUnreadCount(unreadCount);
}
  
  const io_link = EXPO_PUBLIC_BASE_URL;
  const socket = io(io_link);

  // Listen for incoming notifications
  socket.on(`notification_${userInfo._id}`, (notification) => {
    console.log(notification,"notification")
    // Update the notifications state with the new notification
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications,
    ]);

    // Update the unread count
    setUnreadCount((prevCount) => prevCount + 1);
  });

  // Clean up event listener on unmount
  return () => {
    socket.off("notification_USER_ID");
  };
}, [userInfo._id, notificationData]);

  const notificationCategories = {
    booking: {
      icon: <MaterialCommunityIcons name="book-alert" size={24} color={colors?.white} />,
      color: "#44E37A",route:"BookHistory"
    },
    newPropUpdate: {
      icon: <MaterialCommunityIcons name="home-analytics" size={24} color={colors?.white} />,
      color: "#B490FF", route:"Search"
    },
    chat: {
      icon: <MaterialCommunityIcons name="message-reply-text" size={24} color={colors?.white} />,
      color: "#FF29A6",route:"Message"
    },
    infoUpdate: {
      icon: <FontAwesome name="user" size={24} color={colors?.white} />,
      color: "#3F4857", route:"Profile"
    },
    review: {
      icon: <MaterialCommunityIcons name="star" size={24} color={colors?.white} />,
      color: "#c5c4c1",route:"Reviews" 
    },
  };


  const handleGoToChat = async (id,name,notificationId) => {

    try{
      const res = await markAsRead({userId : userInfo?._id,body:{notificationId}}).unwrap();
      
    }catch(error){
      console.log(error)
    }

    let color = notificationCategories[name]
    name === "chat" && navigation.navigate(color?.route,{routeName:route?.name,chatId:id})
  };

  const rightHeader = {
    exists: true,
    component: (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: userInfo?.avatar?.url
          }}
          style={styles.image}
        />
      </View>
    ),
  };
  
  const handleNavigate = () => {
    navigation.navigate(routeName || "Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Notifications"}
        rightHeader={rightHeader}
        isNavigate={true}
        handleNavigate={handleNavigate}
      />
      <View style={styles.subContainer}>
        <View style={globalStyles.historyHeader}>
          <Text style={[globalStyles.headerText]}>Most Recent</Text>
          <TouchableOpacity onPress={() => navigation.navigate("BookHistory")}>
            <Text style={globalStyles.viewAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
         <FlatList
         data={notifications}
         keyExtractor={(item)=>item._id}
        renderItem={({item})=>{
          const id = item?.link?.split("/")[2];
          const name = item?.link?.split("/")[1];
          const notificationId = item._id
          return <TouchableOpacity style={styles.notificationList} onPress={()=>handleGoToChat(id,name,notificationId)}>
          <NotificationCard {...item} color={notificationCategories[name]} name={name} />
        </TouchableOpacity>
        }}
         />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
  },
  subContainer: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.tertiary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  flatListContainer:{
  flex:1,
  marginBottom:20,
  marginTop:10
  }
});
