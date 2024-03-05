import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../configs/colors";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomSearchInput({
  placeholder,
  value,
  onChangeText,
  isMultiline,
  customStyle,
  keyboardType,
  handleSearch,
  handleFilter,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.textInput, customStyle]}
          placeholder={placeholder}
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          value={value}
          onChangeText={onChangeText}
          multiline={isMultiline}
          keyboardType={keyboardType}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchContainer}>
          <EvilIcons name="search" size={34} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.filterContainer} onPress={handleFilter}>
        <MaterialCommunityIcons name="tune" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  textInputContainer: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "rgba(0, 128, 255, 0.3)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    width: "87%",
  },

  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
    fontSize: 14,
    fontFamily: "RalewayMedium",
    color: colors.black,
    width: "85%",
  },

  hideText: {
    color: colors.blueFaded,
    marginHorizontal: 10,
  },
  searchContainer: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: colors.black,
    borderLeftWidth: 1,
  },
  filterContainer: {
    width: "10%",
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
