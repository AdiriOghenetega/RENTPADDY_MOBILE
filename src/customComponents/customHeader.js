import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import colors from "../configs/colors";

export default function CustomHeader({
  title,
  handleNavigate,
  rightHeader,
  leftHeader,
  isNavigate,
  handleNotificationNavigate,
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.headerTitle}>
        {isNavigate && (
          <View style={styles.arrowIcon}>
            <Ionicons
              name="arrow-back"
              size={23}
              color={colors.primary}
              onPress={handleNavigate}
            />
          </View>
        )}
        {leftHeader?.exists && !isNavigate && leftHeader.component}
        {title && (
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
        {!rightHeader && (
          <TouchableOpacity
            onPress={handleNotificationNavigate}
            style={styles.notification}
          >
            <Octicons name="bell" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}
        {rightHeader?.exists && rightHeader.component}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  arrowIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
  },
  titleTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  notification: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
