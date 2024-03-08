import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import CustomButton from "../../customComponents/CustomButton";
import { Octicons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";

const { width, height } = Dimensions.get("window");

export default function PropertyDetails({ navigation, route }) {
  const [liked, setLiked] = useState(false);

  const {
    title,
    images,
    img,
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
  } = route.params;

  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={14} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={14} color="gold" />
  );

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const rightHeader = {
    exists: true,
    component: (
      <TouchableOpacity style={styles.gridContainer} onPress={handleLike}>
        {liked ? (
          <Octicons name="heart-fill" size={24} color={colors.red} />
        ) : (
          <Octicons name="heart" size={24} color={colors.red} />
        )}
      </TouchableOpacity>
    ),
  };

  const handleBooking = () => {};

  const handleGoBack = () => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        rightHeader={rightHeader}
        handleNavigate={handleGoBack}
      />
      <View>
        <View style={styles.imagesFlatList}>
          <FlatList
            data={images}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            )}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <SimpleLineIcons
              name="location-pin"
              size={15}
              color={colors.gray}
            />
            <Text style={styles.locationText}>
              {country},{state},{city}
            </Text>
          </View>
          <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {ratedStars && ratedStars}
                {unratedStars && unratedStars}
              </View>
              <Text style={styles.ratingText}>{rating}.0</Text>
            </View>
            <Text style={styles.reviewText}>{reviews} Reviews</Text>
          </View>
          <Text style={styles.price}>₦{price}</Text>
          <View style={globalStyles.customHr}></View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <View style={styles.ownerContainer}>
            <View style={styles.ownerDetailsContainer}>
              <View style={styles.ownerImageContainer}>
                <Image
                  source={{ uri: owner.image }}
                  style={styles.ownerImage}
                />
              </View>
              <View style={styles.ownerDesc}>
                <Text style={styles.ownerName}>{owner.name}</Text>
                <Text style={styles.ownerDescText}>{owner.phone}</Text>
              </View>
            </View>
            <View style={styles.ownerChatContainer}>
              <Ionicons
                name={"chatbox-ellipses-outline"}
                color={colors.gray}
                size={22}
              />
            </View>
          </View>
          <CustomButton
            buttonLabel={"Book Now"}
            onPress={handleBooking}
            customStyle={styles.customButtonStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  gridContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    overflow: "hidden",
    width: width * 0.927,
    aspectRatio: 1.4699,
    borderRadius: 10,
    margin: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    gap: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 22,
  },
  locationText: {
    fontSize: 12,
    color: colors.gray,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  reviewText: {
    fontSize: 12,
    color: colors.gray,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionContainer: {},
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  descriptionText: {
    lineHeight: 20,
    color: colors.gray,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ownerDetailsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  ownerImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  ownerImage: {
    height: "100%",
    width: "100%",
  },
  ownerName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  ownerDescText: {
    color: colors.gray,
    fontSize: 12,
  },
  ownerChatContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.lightgray,
    justifyContent: "center",
    alignItems: "center",
  },
  customButtonStyle: {
    backgroundColor: colors.secondary,
  },
});
