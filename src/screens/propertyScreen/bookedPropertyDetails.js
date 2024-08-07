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
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../customComponents/customHeader";
import CustomButton from "../../customComponents/CustomButton";
import {
  Octicons,
  SimpleLineIcons,
  Ionicons,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  useGetPropertyQuery,
  useGetPropertyReviewsQuery,
  useGetSavedPropertiesQuery,
  useSavePropertyMutation,
  useUnSavePropertyMutation,
  useLikePropertyMutation,
  useUpdateAvaliabilityMutation,
} from "../../features/properties/propertiesApiSlice";
import {
  useUpdateOwnRentedStatusMutation,
  useUpdateRentedStatusMutation,
  useRemoveOwnRentedHistoryMutation,
  useRemoveRentedHistoryMutation,
  useSendNotificationBookExpiredMutation,
} from "../../features/user/userApiSlice";
import { useCreateChatMutation } from "../../features/chat/chatApiSlice";
import { calculateAverageRating } from "../../utils/averageRating";
import { numberWithCommas } from "../../utils/numbersWithComma";
import AcceptRentalModal from "../../components/profileComponents/acceptRentalModal";

const { width, height } = Dimensions.get("window");

export default function BookedPropertyDetails({ navigation, route }) {
  const userInfo = useSelector(selectCurrentUser);

  const { propertyId, routeName, myBooking, renter, status } = route?.params;

  const { data: property } = useGetPropertyQuery(propertyId);
  const { data: reviewsData } = useGetPropertyReviewsQuery(propertyId);
  const { data: savedProperties } = useGetSavedPropertiesQuery();
  const [saveProperty, { isLoading: saving }] = useSavePropertyMutation();
  const [unSaveProperty, { isLoading: unsaving }] = useUnSavePropertyMutation();
  const [likeProperty, { isLoading: liking }] = useLikePropertyMutation();
  const [createChat, { isLoading: chatting }] = useCreateChatMutation();
  const [updateOwnRentedStatus, { isLoading: updatingOwnRentedStatus }] =
    useUpdateOwnRentedStatusMutation();
  const [updateRentedStatus, { isLoading: updatingRentedStatus }] =
    useUpdateRentedStatusMutation();
  const [removeOwnRentedHistory, { isLoading: removingOwnHistory }] =
    useRemoveOwnRentedHistoryMutation();
  const [removeRentedHistory, { isLoading: removingHistory }] =
    useRemoveRentedHistoryMutation();
  const [
    updatePropertyAvailability,
    { isLoading: updatingPropertyAvailability },
  ] = useUpdateAvaliabilityMutation();
  const [
    sendNotificationBookExpired,
    { isLoading: sendingNotificationBookExpired },
  ] = useSendNotificationBookExpiredMutation();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openAcceptModal, setAcceptModal] = useState(false);

  useEffect(() => {
    let savedProp =
      savedProperties &&
      savedProperties?.find((item) => item._id === propertyId);
    if (savedProperties && savedProp?._id) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [saving, unsaving, savedProperties, property]);

  useEffect(() => {
    let likedProp = property?.likes?.includes(userInfo?._id);
    if (likedProp) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [property, liking]);

  if (!property) {
    return (
      <Text style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />;
      </Text>
    );
  }

  const {
    title,
    images,
    price,
    city,
    state,
    country,
    address,
    description,
    owner,
    likes,
  } = property;

  const rating = calculateAverageRating(reviewsData);

  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={14} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={14} color="gold" />
  );

  const handleLike = async () => {
    try {
      const res = await likeProperty({ propertyId }).unwrap();
    } catch (error) {
      alert("Network Error, Please try again");
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (saved) {
        const res = await unSaveProperty({ propertyId }).unwrap();

        if (res?.message === "Property removed from saved list") {
          alert("Removed from saved list");
        } else {
          alert("Error removing from saved list");
        }
      } else {
        const res = await saveProperty(propertyId).unwrap();

        if (res?.message === "Property added to saved list") {
          alert("Property saved sucesfully");
          setSaved(true);
        } else {
          alert("Error adding property to saved list");
        }
      }
    } catch (error) {
      alert("Network Error. Please try again!");
      console.log(error);
    }
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
      img: images[0],
      price,
      city,
      state,
      country,
      address,
      description,
      owner,
      likes,
      propertyId,
      reviewsData,
    });

  const handleCreateChat = async () => {
    try {
      const res = await createChat({
        userId: userInfo?._id,
        body: {
          participants: [myBooking ? owner?._id : renter?._id, userInfo?._id],
        },
      }).unwrap();

      if (res?.chat?.participants?.length > 1) {
        navigation.navigate("Message", {
          chatId: res.chat._id,
        });
      } else {
        alert("Error creating chat", "Please try again");
      }
    } catch (error) {
      alert("Network Error, Please try again");
      console.log(error);
    }
  };

  const toogleModal = () => {
    setAcceptModal(!openAcceptModal);
  };

  const handleRemoveRentalHistoryPrompt = async () => {
    return Alert.alert(
      "you're about to deactivate an existing rental contract",
      "this action cannot be undone, a new contract will have to be forged in the future",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleRemoveRentalHistory },
      ]
    );
  };

  const handleRemoveOwnRentalHistoryPrompt = async () => {
    return Alert.alert(
      "you're about to deactivate an existing rental contract",
      "this action cannot be undone, a new contract will have to be forged in the future",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleRemoveOwnRentalHistory },
      ]
    );
  };

  const handleRemoveRentalHistory = async () => {
    try {
      const res = await removeRentedHistory({
        userId: userInfo?._id,
        body: { propertyId },
      }).unwrap();
      const res2 = await updateOwnRentedStatus({
        userId: renter?._id,
        body: {
          rentedAt: null,
          rentedUntil: null,
          propertyId,
          status: "expired",
        },
      });
      const res3 = await updatePropertyAvailability({
        userId: userInfo._id,
        body: { propertyId, avaliability: true },
      }).unwrap();
      await sendNotificationBookExpired({
        body: { user: renter?._id, property },
      }).unwrap();
      if (res?._id && res3?._id) {
        alert("rental history removed successfully");
        handleGoBack();
      } else {
        alert("there was an error removing rental history, try again");
      }
    } catch (err) {
      alert("Network Error, Try Again");
      console.log(err);
    }
  };

  const handleRemoveOwnRentalHistory = async () => {
    try {
      const res = await removeOwnRentedHistory({
        userId: userInfo?._id,
        body: { propertyId },
      }).unwrap();
      // const res2 = await updateRentedStatus({
      //   userId: owner?._id,
      //   body: {
      //     rentedAt: null,
      //     rentedUntil: null,
      //     propertyId,
      //     status: "expired",
      //   },
      // });

      if (res?._id) {
        alert("rental history removed successfully");
        handleGoBack();
      } else {
        alert("there was an error removing rental history, try again");
      }
    } catch (err) {
      alert("Network Error, Try Again");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        rightHeader={rightHeader}
        handleNavigate={handleGoBack}
      />
      <Modal visible={openAcceptModal} animationType="slide" transparent={true}>
        <AcceptRentalModal
          property={property}
          toogleModal={toogleModal}
          renter={renter}
        />
      </Modal>
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
                  <Image source={{ uri: item.url }} style={styles.image} />
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
                    <Text style={globalStyles.likesText}>{likes.length}</Text>
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
              <Text style={styles.reviewText}>
                {reviewsData?.length} Reviews
              </Text>
            </TouchableOpacity>
            <Text style={styles.price}>₦{numberWithCommas(price)}</Text>
            <View style={globalStyles.customHr}></View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
            <Text style={styles.descriptionTitle}>
              Continue conversation with {!myBooking ? "renter" : "owner"}
            </Text>
            <View style={styles.ownerContainer}>
              <View style={styles.ownerDetailsContainer}>
                <View style={styles.ownerImageContainer}>
                  <Image
                    source={{
                      uri: myBooking ? owner?.avatar?.url : renter?.avatar?.url,
                    }}
                    style={styles.ownerImage}
                  />
                </View>
                <View style={styles.ownerDesc}>
                  <Text style={styles.ownerName}>
                    {myBooking ? owner?.name : renter?.name}
                  </Text>
                </View>
              </View>
              <View style={styles.ownerContactsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `tel:${myBooking ? owner?.mobile : renter?.mobile}`
                    )
                  }
                  style={styles.ownerChatContainer}
                >
                  <Ionicons
                    name={"call-outline"}
                    color={colors.gray}
                    size={22}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ownerChatContainer}
                  onPress={handleCreateChat}
                >
                  {chatting ? (
                    <ActivityIndicator size={"small"} color={colors.primary} />
                  ) : (
                    <Ionicons
                      name={"chatbox-ellipses-outline"}
                      color={colors.gray}
                      size={22}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={globalStyles.customHr}></View>
          <View style={styles.switchContainer}>
            {myBooking ? (
              status?.toLowerCase() === "expired" && (
                <View style={styles.optionCTA}>
                  <Text>Remove Rental History</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleRemoveOwnRentalHistoryPrompt}
                  >
                    {removingOwnHistory || updatingRentedStatus ? (
                      <ActivityIndicator
                        size={"small"}
                        color={colors.primary}
                      />
                    ) : (
                      <MaterialIcons
                        name="delete"
                        size={24}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <>
                {!(status?.toLowerCase() === "expired") && (
                  <View style={styles.optionCTA}>
                    <Text>Edit Rental Status/Duration</Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={toogleModal}
                    >
                      <FontAwesome6 name="edit" size={24} color={"#FF29A6"} />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.optionCTA}>
                  <Text>Remove Rental History</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleRemoveRentalHistoryPrompt}
                  >
                    {removingHistory ||
                    updatingOwnRentedStatus ||
                    updatingPropertyAvailability ||
                    sendingNotificationBookExpired ? (
                      <ActivityIndicator
                        size={"small"}
                        color={colors.primary}
                      />
                    ) : (
                      <MaterialIcons
                        name="delete"
                        size={24}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
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
    width: width * 0.7,
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
  ownerContactsContainer: {
    flexDirection: "row",
    gap: 10,
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
