import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../configs/colors";

export default CustomRadioButton = ({
  options,
  handleOptionSelect,
  selectedOption,
  customContainerStyle,
  customParentContainerStyle,
}) => {
  return (
    <View style={[styles.container, customParentContainerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionSelect(option)}
          style={[styles.touchable, customContainerStyle]}
        >
          <View
            style={{
              ...styles.radioPrimary,
              borderColor:
                selectedOption === option ? colors.secondary : "gray",
            }}
          >
            {selectedOption === option && (
              <View style={styles.radioSecondary} />
            )}
          </View>
          <Text style={{ marginLeft: 10 }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  radioPrimary: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSecondary: {
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: colors.secondary,
  },
});
