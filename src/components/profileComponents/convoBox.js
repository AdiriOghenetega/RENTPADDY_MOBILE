import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import colors from "../../configs/colors";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { mockChatList } from "../../data/mockData";

export default function ConvoBox({ toogleConvoBox }) {
  const scroll = useRef(null);

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { messages: chat, currentUser, profileImage } = mockChatList[0];
 

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={toogleConvoBox}
        style={styles.topSubContainer}
      ></TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.secondContainer}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={[styles.conversation, globalStyles.shadowContainer]}
            onPress={toogleConvoBox}
          >
            <View style={styles.conversationInner}>
              <View>
                <Image
                  source={{ uri: profileImage }}
                  alt="Profile"
                  style={styles.avatar}
                />
              </View>
              <Text style={styles.convoText}> Chat with Kevwe</Text>
            </View>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.chatBox}>
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
                    {chat?.map((message, index) => {
                      // const newTime = message?.timestamp;
                      // const customTimeAgo = formatDistanceToNow(newTime, new Date(), {
                      //   addSuffix: true,
                      // });
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
                <TouchableOpacity style={styles.sendButton}>
                  <MaterialCommunityIcons
                    name="send-outline"
                    size={24}
                    color={colors?.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  topSubContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    flex: 1,
    gap: 10,
  },
  conversation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors?.white,
    padding: 15,
    borderRadius: 15,
  },
  conversationInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  convoText: {
    color: colors?.primary,
  },
  chatBox: {
    flex: 1,
    backgroundColor: colors?.white,
    padding: 15,
    borderRadius: 15,
  },
  secondContainer: {
    height: "75%",
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
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  messageText: {
    color: colors.primary,
    fontSize: 14,
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
