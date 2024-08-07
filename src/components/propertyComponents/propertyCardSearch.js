import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import colors from "../../configs/colors";

const { height, width } = Dimensions.get("window");

export default function PropertyCardSearch({
  _id,
  title,
  img,
  images,
  price,
  city,
  state,
  country,
  address,
  description,
  owner,
  navigation,
  routeName,
  likes
}) {
  const reviews = [];
  const rating = 4;
  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={14} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={14} color="gold" />
  );

  const handleGoToDetails = () => {
    navigation.navigate("PropertyDetails", {
      reviews,
      rating,
      routeName,
      propertyId:_id
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToDetails}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img.url }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text>{title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={styles.locationText}>
            {address},{city},{state}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {ratedStars && ratedStars}
            {unratedStars && unratedStars}
          </View>
          <Text style={styles.ratingText}>{rating}.0</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    width: width * 0.9,
    alignItems: "center",
    gap: 20,
    // borderColor:"red",
    // borderWidth: 1,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    gap: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    width: "80%",
    // borderColor:"red",
    // borderWidth: 1,
  },
  locationText: {
    color: "grey",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    fontWeight: "bold",
    color: colors.gray,
  },
});
