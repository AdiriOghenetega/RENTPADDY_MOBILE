import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../configs/colors";

export default function FaqSearchContent({
  filteredData,
  handleNavigateToFaq,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.question}
            onPress={() => handleNavigateToFaq(item?.id)}
          >
            <Text style={styles.questionText}>{item.question}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  question: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  questionText: {
    color: colors?.primary,
  },
});
