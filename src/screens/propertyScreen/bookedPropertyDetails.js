import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import CustomButton from "../../customComponents/CustomButton";
import { Octicons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";

const { width, height } = Dimensions.get("window");

export default function BookedPropertyDetails({ navigation, route }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isRented, setIsRented] = useState(false);

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
    likes,
    routeName,
    myBooking,
  } = route?.params;

  const toggleAvailabilitySwitch = () => {
    setIsAvailable(!isAvailable);
  };

  const toggleRentedSwitch = () => {
    setIsRented(!isRented);
  };

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

  const handleSave = () => {
    setSaved((prev) => !prev);
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

  const handleGoBack = () => {
    navigation.navigate(routeName || "Profile");
  };

  const handleNavigateToReviews = () =>
    navigation.navigate("Reviews", {
      routeName: route?.name,
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
      likes,
      myBooking,
    });

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        rightHeader={rightHeader}
        handleNavigate={handleGoBack}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  <TouchableOpacity
                    style={styles.saveContainer}
                    onPress={handleSave}
                  >
                    {saved ? (
                      <Ionicons
                        name="bookmark"
                        size={28}
                        color={colors.secondary}
                      />
                    ) : (
                      <Ionicons
                        name="bookmark-outline"
                        size={28}
                        color={colors.secondary}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={globalStyles.likesContainer}>
                    <Text style={globalStyles.likesText}>{likes}</Text>
                    <Octicons name="heart-fill" size={18} color={colors.red} />
                  </View>
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
            <TouchableOpacity
              style={styles.reviewContainer}
              onPress={handleNavigateToReviews}
            >
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {ratedStars && ratedStars}
                  {unratedStars && unratedStars}
                </View>
                <Text style={styles.ratingText}>{rating}.0</Text>
              </View>
              <Text style={styles.reviewText}>{reviews?.length} Reviews</Text>
            </TouchableOpacity>
            <Text style={styles.price}>₦{price}</Text>
            <View style={globalStyles.customHr}></View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
            <Text style={styles.descriptionTitle}>
              Continue conversation with{" "}
              {myBooking ? "prospective renter" : "owner"}
            </Text>
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
          </View>
          <View style={styles.switchContainer}>
            {!myBooking ? (
              <View style={styles.optionCTA}>
                <Text style={styles.optionText}>
                  {isRented
                    ? "Turn Off Rented Status"
                    : "Turn On Rented Status"}
                </Text>
                <View style={styles.switchTransform}>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: colors.secondaryOffWhite,
                    }}
                    thumbColor={isRented ? colors.primary : "#f4f4f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleRentedSwitch}
                    value={isRented}
                  />
                </View>
              </View>
            ) : (
              <>
                <View style={styles.optionCTA}>
                  <Text style={styles.optionText}>
                    {isAvailable ? "Turn Off" : "Turn On"} Availability
                  </Text>
                  <View style={styles.switchTransform}>
                    <Switch
                      trackColor={{
                        false: "#767577",
                        true: colors.secondaryOffWhite,
                      }}
                      thumbColor={isAvailable ? colors.primary : "#f4f4f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleAvailabilitySwitch}
                      value={isAvailable}
                    />
                  </View>
                </View>
                <View style={styles.optionCTA}>
                  <Text style={styles.optionText}>
                    {isRented
                      ? "Turn Off Rented Status"
                      : "Turn On Rented Status"}
                  </Text>
                  <View style={styles.switchTransform}>
                    <Switch
                      trackColor={{
                        false: "#767577",
                        true: colors.secondaryOffWhite,
                      }}
                      thumbColor={isRented ? colors.primary : "#f4f4f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleRentedSwitch}
                      value={isRented}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
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
    margin: 5,
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
  saveContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  optionCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 14,
    color: colors.primary,
    flex: 1,
    fontWeight: "bold",
  },
  switchTransform: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  switchContainer: {
    paddingHorizontal: 25,
    marginVertical: 20,
  },
});
