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
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { EXPO_PUBLIC_BASE_URL } from "@env";
// import { io } from "socket.io-client";
// import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";

const { width, height } = Dimensions.get("screen");

export default function Chatbox({
  chat,
  // participants,
  currentUser,
  // setSendMessage,
  // receivedMessage,
  handleToogleModal,
  avatar,
  name,
}) {
  // const socket = useRef();
  const scroll = useRef(null);

  // const userInfo = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // const io_link = EXPO_PUBLIC_BASE_URL;

  // useEffect(() => {
  //   socket.current = io({ io_link });
  // }, [io_link]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.current.on("new-message", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, []);

  // fetch messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await fetch(
  //         `${EXPO_PUBLIC_BASE_URL}/api/v1/chat/messages/${chat}`,{
  //           method: "GET",
  //           cache: "no-store",
  //           credentials: "include",
  //           headers: {
  //             Authorization: `Bearer ${userInfo.token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();

  //       // Filter out the user with the same ID as userInfo._id
  //       const filteredUsers = data?.users?.filter(
  //         (user) => user._id !== userInfo._id
  //       );

  //       setUserData(filteredUsers);
  //       setMessages(data.messages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (chat !== null) fetchMessages();
  // }, [chat, userInfo._id]); // Include userInfo._id in the dependencies array

  // // Always scroll to last Message
  // useEffect(() => {
  //   scroll.current?.scrollToEnd({ animated: true });
  // }, []);

  // useEffect(() => {
  //   if (chat !== null) {
  //     const markMessagesAsRead = async () => {
  //       try {
  //         const res = await fetch(
  //           `${EXPO_PUBLIC_BASE_URL}/api/v1/chat/mark-as-read/${chat}`,
  //           {
  //             method: "PATCH",
  //             cache: "no-store",
  //             credentials: "include",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${userInfo.token}`,
  //             },
  //           }
  //         );

  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     markMessagesAsRead();
  //   }
  // }, [chat, currentUser._id]);

  // // Send Message
  // const handleSend = async () => {
  //   const message = {
  //     sender: currentUser,
  //     message: newMessage,
  //     chatId: chat,
  //   };
  //   const receiverId = userData[0]._id;
  //   // send message to socket server
  //   setSendMessage({ ...message, receiverId });
  //   socket.current.emit("send-message", {
  //     receiverId: receiverId,
  //     message: message,
  //   });
  //   // send message to database
  //   try {
  //     const res = await fetch(`${EXPO_PUBLIC_BASE_URL}/api/v1/chat/send`, {
  //       method: "POST",
  //       cache: "no-store",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //       body: JSON.stringify(message),
  //     });
  //     const data = await res.json();

  //     setMessages([...messages, data]);
  //     setNewMessage("");
  //   } catch {
  //     console.log("error");
  //   }
  // };

  // // Receive Message from parent component
  // useEffect(() => {
  //   // console.log("Message Arrived: ", receivedMessage);
  //   if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
  //     setMessages([...messages, receivedMessage?.message]);
  //   }
  // }, [receivedMessage, chat?._id, messages]);
  console.log(chat);
  return (
    <SafeAreaView>
      <View>
        {chat ? (
          <View>
            {/* chat-header */}
            <View style={[styles.chatBoxHeader, globalStyles.shadowContainer]}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="arrow-back"
                  size={23}
                  color={colors.primary}
                  onPress={handleToogleModal}
                />
              </View>
              <Image
                source={{
                  uri: avatar,
                }}
                alt="Profile"
                style={styles.avatar}
              />
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{name}</Text>
                </View>
              </View>
            </View>

            {/* chat-body */}
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1522444195799-478538b28823?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlYWwlMjBlc3RhdGUlMjBkb29kbGV8ZW58MHx8MHx8fDA%3D",
              }}
            >
              <View style={styles.chatBody}>
                <ScrollView
                  ref={scroll}
                  onContentSizeChange={() => {
                    scroll.current?.scrollToEnd({ animated: true });
                  }}
                >
                  {chat?.map((message, index) => {
                    const newTime = message?.timestamp;
                    // const customTimeAgo = formatDistanceToNow(
                    //   newTime,
                    //   new Date(),
                    //   { addSuffix: true }
                    // );

                    return (
                      <View
                        key={index}
                        style={
                          message?.sender === currentUser
                            ? styles.messageOwn
                            : styles.message
                        }
                      >
                        <Text style={styles.messageText}>
                          {message?.content}
                        </Text>
                        {/* <Text style={styles.timeagoText}>{customTimeAgo} ago</Text> */}
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
              <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text>Tap on a chat to start a conversation...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatBoxHeader: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.secondaryOffWhite,
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
    height: height - 200,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingTop: 5,
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
    paddingVertical: 10,
  },
  nameContainer: {},
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
