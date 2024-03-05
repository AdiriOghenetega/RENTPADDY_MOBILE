import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import colors from "./colors";

export default function CustomTabs({
  data,
  handleCategoryPress,
  selectedCategory,
  customBoxStyle,
  customCategoryContainerStyle,
}) {
  return (
    <View style={styles.categorySelector}>
      <View style={[styles.categoryContainer,customCategoryContainerStyle]}>
        <View style={styles.categoryMain}>
          {data?.map((elem, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBox,
                  selectedCategory == elem.categoryName
                    ? styles.selectedCategory
                    : null,
                    customBoxStyle,
                ]}
                onPress={() => handleCategoryPress(elem.categoryName)}
              >
                {elem.img}

                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory == elem.categoryName
                      ? styles.selectedCategoryText
                      : null,
                  ]}
                >
                  {elem.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryMain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryImage: {
    width: 35,
    height: 25,
  },

  categoryText: {
    textAlign: "center",
    color: colors.gray,
    fontFamily: "RalewayBold",
    fontSize: 10,
  },

  selectedCategory: {
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  selectedCategoryText: {
    color: colors.primary,
  },
  categoryBox: {
    borderColor: colors.gray,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    gap:4,
    height: 100,
    padding: 10,
    borderRadius: 15,
  },
});
