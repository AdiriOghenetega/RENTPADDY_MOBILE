import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Chatbox from "../../components/chatComponents/chatbox";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import { EvilIcons } from "@expo/vector-icons";
import { mockChatList } from "../../data/mockData";
import ChatParticipantCard from "../../components/chatComponents/chatParticipantCard";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetChatListQuery } from "../../features/chat/chatApiSlice";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { io } from "socket.io-client";


const { width, height } = Dimensions.get("window");

export default function Chat({ navigation, route }) {
  const socket = useRef();

  const userInfo = useSelector(selectCurrentUser);

  const {
    data: chatList,
    isLoading,
    isError,
    error,
  } = useGetChatListQuery({ userId: userInfo._id });

  const routeName = route?.params?.routeName;

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredChats, setFilteredChats] = useState(mockChatList);
  const [participanto, setParticipanto] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    if (route?.params?.chatId) {
      setCurrentChat(route?.params?.chatId);
    }
  }, [route]);

  useEffect(() => {
    const getChats = async () => {
      // Filter out the participant that matches the logged-in user
      const filteredChats = chatList?.chats?.map((chat) => {
        const filteredParticipants = chat?.participants?.filter(
          (participant) => {
            return (
              participant?._id !== userInfo?._id &&
              participant?.username !== userInfo?.username
            );
          }
        );

        return { ...chat, participants: filteredParticipants };
      });

      setChats(filteredChats);
    };

    getChats();
  }, [userInfo?._id, userInfo?.username, chatList]);

  const io_link = EXPO_PUBLIC_BASE_URL;

  useEffect(() => {
    socket.current = io(io_link);
    socket.current.emit("new-user-add", userInfo?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userInfo, io_link]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    const searchedChats = chats?.filter((chat) => {
      return (
        chat?.participants[0]?.username
          ?.toLowerCase()
          .includes(search?.toLowerCase()) ||
        chat?.participants[0]?.name
          ?.toLowerCase()
          ?.includes(search?.toLowerCase())
      );
    });

    if (searchedChats) {
      setFilteredChats(searchedChats);
    } else {
      setFilteredChats(chats);
    }
  }, [search, chats]);

  const rightHeader = {
    exists: true,
    component: (
      <View style={styles.imageContainer}>
        <Image source={{ uri: userInfo?.avatar?.url }} style={styles.image} />
      </View>
    ),
  };

  const handleNavigate = () => {
    navigation.navigate(routeName || "Home");
  };

  if (!chatList) {
    return (
      <SafeAreaView style={[styles.container]}>
        <CustomHeader
          title={"Messages"}
          rightHeader={rightHeader}
          isNavigate={true}
          handleNavigate={handleNavigate}
        />
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const handleToogleModal = () => {
    setCurrentChat(null);
  };

  const checkOnlineStatus = (chat) => {
    const onlineParticipantIds = onlineUsers.map((user) => user.userId);

    const onlineParticipant = chat?.participants?.find((participant) =>
      onlineParticipantIds.includes(participant._id)
    );

    return onlineParticipant ? true : false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={!!currentChat}>
        <Chatbox
          handleToogleModal={handleToogleModal}
          chat={currentChat}
          participants={participanto}
          currentUser={userInfo?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage} // Pass receivedMessage to ChatBox
        />
      </Modal>
      <CustomHeader
        title={"Messages"}
        rightHeader={rightHeader}
        isNavigate={true}
        handleNavigate={handleNavigate}
      />
      <View style={styles.searchInput}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          keyboardType="web-search"
          placeholder="Search for a user"
          style={styles.searchInputText}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        {filteredChats?.length < 1 ? (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>No Chats Found</Text>
            <Text style={styles.noChatsSubText}>
              Click the chat button on any property display page to open chat
              with the owner
            </Text>
            <Text style={styles.noChatsEmoji}>😴</Text>
          </View>
        ) : (
          <View style={styles.chatListContainer}>
            <FlatList
              data={filteredChats}
              keyExtractor={(item) => item.chatId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.chatList}
                  onPress={() => {
                    setCurrentChat(item.chatId);
                    setParticipanto(item);
                  }}
                >
                  <ChatParticipantCard
                    {...item}
                    handleToogleModal={handleToogleModal}
                    checkOnlineStatus={checkOnlineStatus}
                    item={item}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
    paddingHorizontal: 15,
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
  searchInput: {
    width: "95%",
    height: 50,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchInputText: {
    flex: 1,
    fontSize: 14,
  },
  chatListContainer: {
    flex: 1,
  },
  chatList: {
    width: width - 30,
    alignSelf: "center",
  },
  noChatsContainer: {
    width: "100%",
    height: height * 0.75,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatsContainer: {
    width: "100%",
    height: height * 0.75,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatsText: {
    color: colors.darkgray,
    fontSize: 18,
    fontWeight: "bold",
  },
  noChatsEmoji: {
    fontSize: 100,
  },
  noChatsSubText: {
    color: colors.darkgray,
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
    width: "80%",
  },
});
