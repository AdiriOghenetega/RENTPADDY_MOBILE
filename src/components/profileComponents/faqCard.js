import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../../configs/colors";

export const icons = {
  property: {
    icon: (
      <MaterialCommunityIcons
        name="home-analytics"
        size={24}
        color={colors?.white}
      />
    ),
    color: "#B490FF",
  },
  contact: {
    icon: (
      <MaterialCommunityIcons
        name="message-reply-text"
        size={24}
        color={colors?.white}
      />
    ),
    color: "#FF29A6",
  },
  book: {
    icon: (
      <MaterialCommunityIcons
        name="book-alert"
        size={24}
        color={colors?.white}
      />
    ),
    color: "#44E37A",
  },
};

export default function FaqCard({ question, type }) {
  return (
    <View style={[styles.container, { backgroundColor: icons[type]?.color }]}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.iconContainer}>{icons[type]?.icon}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 150,
    padding: 15,
    borderRadius: 15,
    margin: 5,
  },
  question: {
    fontSize: 14,
    marginBottom: 10,
    width: "90%",
    color: colors?.white,
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
});
