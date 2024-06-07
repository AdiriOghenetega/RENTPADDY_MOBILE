import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import CustomHeader from "../../customComponents/customHeader";
import CustomAccordion from "../../customComponents/customAccordion";
import { mockFaq } from "../../data/mockData";
import { icons } from "../../components/profileComponents/faqCard";
import colors from "../../configs/colors";

export default function Faq({ navigation, route }) {
  const faq = route?.params?.faq;

  const handleNavigate = () => {
    navigation.navigate("Support");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"FAQ"}
        isNavigate={true}
        handleNavigate={handleNavigate}
        handleNotificationNavigate={() =>
          navigation.navigate("Notification", { routeName: route?.name })
        }
      />
      <View style={styles.faqContainer}>
        <View>
          <FlatList
            data={mockFaq}
            renderItem={({ item }) => (
              <CustomAccordion
                title={item.question}
                message={item.answer}
                customMessageStyle={{
                  backgroundColor: icons[item.type]?.color,
                }}
                preOpen={faq === item.id ? true : false}
              />
            )}
            keyExtractor={(item) => item.id}
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
  faqContainer: {
    paddingHorizontal: 10,
  },
  subTitleText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
});
