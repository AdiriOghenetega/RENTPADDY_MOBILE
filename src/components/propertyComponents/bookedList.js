import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView } from "react-native";
import React from "react";
import PropertyCardBooking from "./propertyCardBooking";
import colors from "../../configs/colors";


const { width, height } = Dimensions.get("window");

export default function BookedList({ data,navigation,routeName }) {
  
  return (
    <View style={styles.container}>
      {data?.length > 0 ? (
        <ScrollView style={styles.historyFlatList}>
          {data?.map((item, index) => (
            <View key={index} style={styles.historyFlatListSubContainer}>
            <PropertyCardBooking {...item} navigation={navigation} routeName={routeName} />
          </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyHistoryContainer}>
          <Text style={styles.emptyHistoryText}>
            There is no rental history.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyFlatList: {
    flex: 1,
  },
  historyFlatListSubContainer: {
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 5,
  },
  emptyHistoryContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  emptyHistoryText: {
    color: colors.gray,
    fontSize: 14,
  },
});
