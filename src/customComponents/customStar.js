import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

export default function CustomStar({
  rating,
  handleRating,
  customStyle,
  size,
}) {
  return (
    <View style={[styles.container, customStyle]}>
      {[1, 2, 3, 4, 5].map((rate, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => handleRating(rate)}>
            <Octicons
              name="star-fill"
              size={size}
              color={rate <= rating ? "gold" : "gray"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
