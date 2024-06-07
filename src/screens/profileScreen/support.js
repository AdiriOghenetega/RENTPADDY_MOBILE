import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import { EvilIcons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import FaqCard from "../../components/profileComponents/faqCard";
import ConvoBox from "../../components/profileComponents/convoBox";
import FaqSearchContent from "../../components/profileComponents/faqSearchContent";
import { mockFaq } from "../../data/mockData";

export default function Support({ navigation, route }) {
  const [convoModal, setConvoModal] = useState(false);
  const [filterData, setFilterData] = useState(mockFaq);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = mockFaq.filter((item) => {
      return item.question.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterData(filteredData);
  }, [searchTerm]);

  const handleNavigate = () => {
    navigation.navigate("Settings");
  };

  const toogleConvoBox = () => {
    setConvoModal((prev) => !prev);
  };

  const handleNavigateToFaq = (item) => {
    navigation.navigate("Faq", { faq: item });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Modal visible={convoModal} animationType="slide" transparent={true}>
          <ConvoBox toogleConvoBox={toogleConvoBox} />
        </Modal>
        <CustomHeader
          title={"Support"}
          isNavigate={true}
          handleNavigate={handleNavigate}
          handleNotificationNavigate={() =>
            navigation.navigate("Notification", { routeName: route?.name })
          }
        />
        <Text style={styles.titleText}>Have a burning question ?</Text>
        <View style={styles.searchInput}>
          <TextInput
            keyboardType="web-search"
            placeholder="Search for a topics or questions"
            style={styles.searchInputText}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <EvilIcons name="search" size={24} color="black" />
        </View>
        {searchTerm?.length > 0 ? (
          <FaqSearchContent
            filteredData={filterData}
            handleNavigateToFaq={handleNavigateToFaq}
          />
        ) : (
          <View style={styles.subContainer}>
            <View style={globalStyles.historyHeader}>
              <Text style={[globalStyles.headerText, styles.faqHeader]}>
                Frequently Asked
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
                <Text style={[globalStyles.viewAllText, styles.faqViewAll]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.FaqFlatlist}>
              <FlatList
                data={mockFaq}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleNavigateToFaq(item.id)}
                    >
                      <FaqCard {...item} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={styles.conversationContainer}>
              <TouchableOpacity
                style={[styles.conversation, globalStyles.shadowContainer]}
                onPress={toogleConvoBox}
              >
                <View style={styles.conversationInner}>
                  <AntDesign
                    name="customerservice"
                    size={24}
                    color={colors?.primary}
                  />
                  <Text style={styles.convoText}>Start a conversation</Text>
                </View>
                <MaterialIcons name="arrow-drop-up" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
    paddingHorizontal: 15,
  },
  subContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
    flex: 1,
  },
  titleText: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    width: "90%",
    height: 50,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
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
  faqViewAll: {
    color: colors?.primary,
  },
  faqHeader: {
    color: colors?.black,
    fontWeight: "bold",
  },
  FaqFlatlist: {
    marginTop: 10,
  },
  conversationContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: 10,
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
});
