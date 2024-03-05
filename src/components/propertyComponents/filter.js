import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import CustomRadioButton from "../../customComponents/customRadioButton";
import CustomButton from "../../customComponents/CustomButton";
import { globalStyles } from "../../styles/globalStyles";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

export default function Filter({
  handleFilterSearchTerm,
  onClose,
  maxPriceRange,
}) {
  const [selectedPropertyType, setSelectedPropertyTye] = useState("");
  const [maxPricedRange, setmaxPricedRange] = useState(0);
  const propertyOptions = ["House", "Apartment", "Flat", "Villa", "Studio"];

  const handlePropertyTypeSelect = (option) => {
    setSelectedPropertyTye(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter</Text>
      <View style={styles.propertyTypeContainer}>
        <Text style={styles.RentText}>Property Type</Text>
        <CustomRadioButton
          options={propertyOptions}
          handleOptionSelect={handlePropertyTypeSelect}
          selectedOption={selectedPropertyType}
          customParentContainerStyle={[styles.radioButton]}
        />
      </View>
      <View style={styles.propertyTypeContainer}>
        <Text style={styles.RentText}>Price Range</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={maxPriceRange}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => {
              setmaxPricedRange(value);
            }}
          />
          <Text style={styles.RentText}>₦{maxPricedRange}</Text>
        </View>
      </View>
      <CustomButton
        buttonLabel={"Continue"}
        onPress={() => {
          handleFilterSearchTerm({ selectedPropertyType, maxPricedRange });
          onClose();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingVertical: 20,
    gap: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.secondary,
  },
  RentContainer: {
    width: "80%",
    backgroundColor: "#EFF4FB",
    padding: 5,
    borderRadius: 10,
  },
  RentOption: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  RentText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 22,
  },
  propertyTypeContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    width: width * 0.9,
  },
  radioButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: width * 0.9,
  },
  sliderContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
