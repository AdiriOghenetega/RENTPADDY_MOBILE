import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomHeader from '../../customComponents/customHeader'
import colors from '../../configs/colors'
import { EvilIcons } from "@expo/vector-icons";
import { mockChatList } from '../../data/mockData';
import ChatParticipantCard from '../../components/chatComponents/chatParticipantCard';

export default function Chat() {

  const [search, setSearch] = useState('');
  const [filteredChats,setFilteredChats] = useState(mockChatList);

  useEffect(() => {
    const searchedChats = mockChatList.filter((chat) => {
      return chat?.name
        ?.toLowerCase()
        .includes(search?.toLowerCase());
    });

    if (searchedChats) {
      setFilteredChats(searchedChats);
    } else {
      setFilteredChats(mockChatList);
    }
  }, [search, mockChatList]);

  const rightHeader = {
    exists:true,
    component:<View style={styles.imageContainer}>
  <Image source={{uri:"https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww"}} style={styles.image} />
    </View>
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={"Messages"} rightHeader={rightHeader} />
      <View style={styles.searchInput}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          keyboardType="web-search"
          placeholder="Search for a user"
          style={styles.searchInputText}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={styles.chatListContainer}>
        <FlatList
        data={mockChatList}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <ChatParticipantCard {...item} />
        )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
    paddingHorizontal: 15
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow:"hidden",
    backgroundColor: colors.tertiary
  },
  image:{
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
    fontSize: 16,
  },
  chatListContainer: {
  }
})