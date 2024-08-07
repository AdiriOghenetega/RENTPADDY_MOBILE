import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import {
  useRemoveRentedHistoryMutation,
  useRemoveOwnRentedHistoryMutation,
  useSendNotificationBookDeclineMutation,
} from "../../features/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import AcceptRentalModal from "../profileComponents/acceptRentalModal";

const { height, width } = Dimensions.get("window");

export default function PropertyCardBooking({
  property,
  renter,
  rentedAt,
  rentedUntil,
  status,
  navigation,
  routeName,
  myBooking,
}) {
  const userInfo = useSelector(selectCurrentUser);

  const [removeRentedHistory, { isLoading: removingHistory }] =
    useRemoveRentedHistoryMutation();
  const [removeOwnRentedHistory, { isLoading: removingOwnHistory }] =
    useRemoveOwnRentedHistoryMutation();
  const [sendNotificationBookDecline, { isLoading: sendingNotification }] =
    useSendNotificationBookDeclineMutation();

  const [openAcceptModal, setAcceptModal] = useState(false);

  const { title, images } = property;

  const handleNavigateToBookingDetails = () => {
    navigation.navigate("BookedPropertyDetails", {
      routeName,
      myBooking,
      propertyId: property?._id,
      renter,
      status,
    });
  };

  const toogleModal = () => {
    setAcceptModal(!openAcceptModal);
  };

  const handleDeclineBooking = async () => {
    try {
      const res = await removeRentedHistory({
        userId: userInfo?._id,
        body: { propertyId: property?._id },
      });
      await sendNotificationBookDecline({
        body: { user: renter?._id, property },
      }).unwrap();
    } catch (err) {
      alert("Network Error, Try Again");
      console.log(err);
    }
  };

  const handleBookAgain = async () => {
    console.log(property?._id);
    try {
      const res = await removeOwnRentedHistory({
        userId: userInfo?._id,
        body: { propertyId: property?._id },
      }).unwrap();
      console.log(res, "res");
      if (res?._id) {
        alert("rental history removed, click Book Now to book again");
        navigation.navigate("PropertyDetails", {
          routeName,
          propertyId: property?._id,
        });
      } else {
        alert("there was an error removing rental history, try again");
      }
    } catch (err) {
      alert("Network Error, Try Again");
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigateToBookingDetails}
    >
      <Modal visible={openAcceptModal} animationType="slide" transparent={true}>
        <AcceptRentalModal
          property={property}
          toogleModal={toogleModal}
          renter={renter}
        />
      </Modal>
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0]?.url }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.propertyNameText}>{title}</Text>
        <Text style={styles.checkInDate}>
          Booked on :{" "}
          {(rentedAt && new Date(rentedAt)?.toLocaleDateString()) || "N/A"}
        </Text>
        <Text style={styles.checkInDate}>
          {status?.toLowerCase() === "expired" ? "Expired" : "Expires"} on :{" "}
          {(rentedUntil && new Date(rentedUntil)?.toLocaleDateString()) ||
            "N/A"}
        </Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  (status?.toLowerCase() === "expired" && colors.red) ||
                  (status?.toLowerCase() === "active" && "green") ||
                  (status?.toLowerCase() === "pending" && "purple"),
              },
            ]}
          >
            {status}
          </Text>
          {!myBooking && status?.toLowerCase() === "pending" && (
            <View style={styles.bookPromptContainer}>
              {removingHistory || sendingNotification ? (
                <ActivityIndicator
                  size={"small"}
                  color={colors.primary}
                  style={{ marginHorizontal: 10 }}
                />
              ) : (
                <TouchableOpacity onPress={handleDeclineBooking}>
                  <Text style={styles.declineBook}>Decline</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={toogleModal}>
                <Text style={styles.acceptBook}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
          {status?.toLowerCase() === "expired" && myBooking && (
            <TouchableOpacity onPress={handleBookAgain}>
              {removingHistory || removingOwnHistory ? (
                <ActivityIndicator size={"small"} color={colors.primary} />
              ) : (
                <Text style={styles.bookAgain}>Book again</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
    gap: 5,
  },
  propertyNameText: {
    fontSize: 16,
    fontFamily: "RalewayBold",
    color: colors.secondary,
  },
  checkInDate: {
    fontSize: 14,
    color: colors.gray,
  },
  statusText: {
    textTransform: "capitalize",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookAgain: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  bookPromptContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  acceptBook: {
    color: "#44E37A",
  },
  declineBook: {
    color: colors.red,
    marginRight: 15,
  },
});
