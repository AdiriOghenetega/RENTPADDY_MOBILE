import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef,useCallback } from "react";
import { useSelector } from "react-redux";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { io } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useGetChatMessagesQuery,useMarkAsReadMutation,useSendChatMutation } from "../../features/chat/chatApiSlice";
import { useGetNotificationsQuery } from "../../features/notification/notificationApiSlice";
import { selectNotificationIdentifier } from "../../features/notification/notificationSlice";

const { width, height } = Dimensions.get("screen");

export default function Chatbox({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  handleToogleModal,
}) {
  const socket = useRef();
  const scroll = useRef(null);

  const userInfo = useSelector(selectCurrentUser);
  const notificationIdentifier = useSelector(selectNotificationIdentifier);
  
  const {data : chatMessages} = useGetChatMessagesQuery({chatId:chat,userId:userInfo._id});
  const {data : notificationData} = useGetNotificationsQuery({userId:userInfo?._id});
  const [markAsRead] = useMarkAsReadMutation();
  const [sendChat,{isLoading:sendingMessage}] = useSendChatMutation();

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ participants,setParticipants] = useState({
    name: "",
    avatar: ""
  })

  const handleMarkAsRead = async(notificationId)=>{
    try{
      const res = await markAsRead({userId : userInfo?._id,body:{notificationId}}).unwrap();
      console.log(res,"res")
    }catch(error){
      console.log(error)
    }
  }

//check notification data and mark as read for this chat notification
useEffect(()=>{
  console.log(notificationData)
  let newNotification = notificationData?.notifications[0]
  let chatId = newNotification?.link?.split("/")[2]
  let notificationId = newNotification?._id
  if(chatId === chat){
    handleMarkAsRead(notificationId)
  }

},[notificationData])
  
  const io_link = EXPO_PUBLIC_BASE_URL;

  useEffect(() => {
    socket.current = io({ io_link });
  }, [io_link]);

  useEffect(()=>{
    let secondParticipant = chatMessages?.users?.filter(user => user._id !== userInfo?._id)

     setParticipants({
       name: secondParticipant && secondParticipant[0]?.name,
       avatar: secondParticipant && secondParticipant[0]?.avatar
     })
  },[chat,chatMessages])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.current.on("new-message", (message) => {
      console.log("new message")
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

 // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      
        // Filter out the user with the same ID as userInfo._id
        const filteredUsers = chatMessages?.users?.filter(
          (user) => user._id !== userInfo._id
        );

        setUserData(filteredUsers);
        setMessages(chatMessages?.messages);
     
    };

    if (chat !== null) fetchMessages();
  }, [chat, userInfo._id, chatMessages]); // Include userInfo._id in the dependencies array

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    if (chat !== null) {
      const markMessagesAsRead = async () => {
        try {
          const res = await markAsRead({userId: userInfo._id, body:{chatId:chat}}).unwrap();
        } catch (error) {
          console.error(error);
        }
      };

      markMessagesAsRead();
    }
  }, [chat, currentUser._id]);

  // Send Message
  const handleSend = useCallback(() => {
    (async () => {
      const message = {
        sender: currentUser,
        message: newMessage,
        chatId: chat,
      };
      if (newMessage?.length < 1) {
        return;
      }

      const receiverId = userData[0]._id;
      // send message to socket server
      setSendMessage({ ...message, receiverId });
      socket.current.emit("send-message", {
        receiverId: receiverId,
        message: message,
      });
      
      // send message to database
      try {
        const res = await sendChat({userId: userInfo._id, body: message}).unwrap();

        setMessages([...messages, res]);
        setNewMessage("");
      } catch {
        console.log("error");
      }
    })();
  }, [newMessage]);

  // Receive Message from parent component
  useEffect(() => {
    // console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage?.message]);
    }
  }, [receivedMessage, chat?._id, messages]);

  if(!chatMessages ){
    return <SafeAreaView style={styles.container}>
      <ActivityIndicator size={"small"} color={colors.primary} />
    </SafeAreaView>
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      {/* chat-header */}
      <View style={[styles.chatBoxHeader, globalStyles.shadowContainer]}>
        <View>
          <Ionicons
            name="arrow-back"
            size={23}
            color={colors.primary}
            onPress={handleToogleModal}
          />
        </View>
        <Image
          source={{
            uri: participants?.avatar
              ? participants?.avatar?.url
              : "https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=600",
          }}
          alt="Profile"
          style={styles.avatar}
        />
        <View style={{ fontSize: 9 }}>
          <View>
            <Text>{participants?.name}</Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior="height" style={styles.secondContainer}>
        {/* chat-body */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1522444195799-478538b28823?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlYWwlMjBlc3RhdGUlMjBkb29kbGV8ZW58MHx8MHx8fDA%3D",
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.chatBody}>
            <ScrollView
              ref={scroll}
              onContentSizeChange={() => {
                scroll.current?.scrollToEnd({ animated: true });
              }}
              keyboardShouldPersistTaps="always"
            >
              {messages?.map((message, index) => {
                const newTime = message?.timestamp;
                const customTimeAgo = formatDistanceToNow(newTime, new Date(), {
                  addSuffix: true,
                });
                return (
                  <View
                    key={index}
                    style={
                      message?.sender === currentUser
                        ? styles.messageOwn
                        : styles.message
                    }
                  >
                    <Text style={styles.messageText}>{message?.message}</Text>
                    <Text style={styles.timeagoText}>{customTimeAgo} ago</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
        {/* chat-sender */}
        <View style={styles.chatSender}>
          <TextInput
            value={newMessage}
            placeholder="Type a message..."
            onChangeText={handleChange}
            style={styles.chatInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            {sendingMessage ? <ActivityIndicator size={"small"} color={colors?.white} />:<Text style={styles.sendButtonText}>Send</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    flex: 1,
  },
  chatBoxHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 10 : null,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageOwn: {
    backgroundColor: colors.tertiary,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "flex-end",
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.lightgray,
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  messageText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  timeagoText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  chatBody: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, .7)",
  },
  chatInput: {
    width: "80%",
    height: 50,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightgray,
  },
  sendButton: {
    width: "20%",
    backgroundColor: colors.blue,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightgray,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  chatSender: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 65,
  },
});
