import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import PropertyCardBooking from "../../components/profileComponents/propertyCardBooking";
import { mockUserData } from "../../data/mockData";

export default function BookHistory({ navigation }) {
  const { bookingHistory } = mockUserData;
  const handleNavigate = () => {
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Booking History"}
        handleNavigate={handleNavigate}
        isNavigate={true}
      />
      {bookingHistory?.length > 0 ? (
        <View style={styles.historyFlatList}>
          <FlatList
            data={bookingHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PropertyCardBooking {...item} />}
          />
        </View>
      ) : (
        <View style={styles.emptyHistoryContainer}>
          <Text style={styles.emptyHistoryText}>
            There is no booking history, book now.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  historyFlatList: {},
  emptyHistoryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHistoryText: {
    color: colors.gray,
    fontSize: 14,
  },
});
