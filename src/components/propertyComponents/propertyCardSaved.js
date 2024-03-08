import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Octicons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";

const { width } = Dimensions.get("window");

export default function PropertyCardSaved({
  title,
  images,
  price,
  city,
  state,
  country,
  reviews,
  rating,
  address,
  description,
  owner,
  navigation,
  routeName,
}) {
  const handleGoToDetails = () => {
    navigation.navigate("PropertyDetails", {
      title,
      images,
      price,
      city,
      state,
      country,
      reviews,
      rating,
      address,
      description,
      owner,
      routeName,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, globalStyles.shadowContainer]}
      onPress={handleGoToDetails}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0] }} style={styles.propertyImage} />
        <View style={styles.ratingContainer}>
          <Octicons name="star-fill" size={18} color="gold" />
          <Text style={styles.ratingText}>{rating}.0</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={15} color={colors.secondary} />
          <Text style={styles.locationText}>
            {country},{state},{city}
          </Text>
        </View>
        <View style={styles.priceBookmarkContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₦{price}</Text>
            <Text style={styles.priceText}>/Month</Text>
          </View>
          <View style={styles.bookMarkContainer}>
            <Ionicons name="bookmark" size={20} color={colors.secondary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 10,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 10,
    width: width * 0.935,
    aspectRatio: 3 / 2,
    overflow: "hidden",
  },

  propertyImage: {
    height: "100%",
    width: "100%",
  },

  ratingContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },

  ratingText: {
    color: colors.gray,
    fontWeight: "bold",
    marginLeft: 3,
  },

  detailsContainer: {
    flex: 2,
    padding: 10,
  },

  title: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  locationText: {
    color: colors.gray,
    fontSize: 12,
  },
  priceBookmarkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  priceText: {
    color: colors.gray,
  },
  bookMarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: colors.tertiary,
    borderRadius: 50,
  },
});
