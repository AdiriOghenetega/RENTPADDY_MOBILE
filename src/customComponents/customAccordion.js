import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../configs/colors";

const CustomAccordion = ({ title, message, customMessageStyle, preOpen }) => {
  useEffect(() => {
    if (preOpen) {
      setIsOpen(preOpen);
    }
  }, [preOpen]);

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle} style={styles.title}>
        <Entypo
          name={isOpen ? "minus" : "plus"}
          size={18}
          color={!isOpen ? colors.primary : colors.lightgold}
        />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.message, customMessageStyle]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  title: {
    minHeight: 34,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
    flex: 1,
  },
  titleText: {
    flex: 1,
  },
  message: {
    height: 107,
    backgroundColor: colors.white,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  messageText: {
    color: colors.white,
  },
});

export default CustomAccordion;
