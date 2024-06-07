import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import { FontAwesome6, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useDeletePropertyReviewMutation } from "../../features/properties/propertiesApiSlice";
import WriteReviewForm from "./writeReviewForm";

export default function ReviewCard({
  _id,
  rating,
  user,
  comment,
  createdAt,
  property,
  isOwn,
}) {
  const [deleteReview, { isLoading: deleting }] =
    useDeletePropertyReviewMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { name, avatar } = user;

  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={20} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={20} color="gold" />
  );

  const handleEdit = async () => {
    handleToogleIsEdit();
    toogleWriteReviewModal();
  };

  const handleToogleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteReview({ reviewId: _id }).unwrap();
      console.log(res);
      if(res?.message === "Review deleted successfully"){
        alert("Review Deleted Successfully");
      }else{
        alert("Error Deleting Review, Try Again");
      }
    } catch (err) {
      alert("Network Error, Try again");
      console.log(err);
    }
  };

  const toogleWriteReviewModal = () => {
    setModalVisible((prev) => !prev);
  };

  console.log(isEdit)

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <WriteReviewForm
          toogleWriteReviewModal={toogleWriteReviewModal}
          propertyId={property?._id}
          isEdit={isEdit}
          handleToogleIsEdit={handleToogleIsEdit}
          initialComment={comment}
          initialRating={rating}
          reviewId = {_id}
        />
      </Modal>
      <View style={styles.reviewDetails}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: avatar?.url }} style={styles.avatar} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.reviewerNameContainer}>
            <Text style={styles.reviewerName}>{name}</Text>
            <Text style={styles.createdAt}>
              {new Date(createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.ratingDetailsContainer}>
            <View style={styles.ratingContainer}>
              {ratedStars}
              {unratedStars}
            </View>
            <Text style={styles.ratingDetails}>({rating}.0)</Text>
          </View>
          <Text style={styles.reviewItemDesc}>{comment}</Text>
        </View>
      </View>
      {isOwn && (
        <View style={styles.isOwn}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleEdit}>
            <FontAwesome6 name="edit" size={24} color={"#FF29A6"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            {deleting ? (
              <ActivityIndicator size={"small"} color={colors.primary} />
            ) : (
              <MaterialIcons name="delete" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  reviewDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  reviewItemDesc: {},
  imageContainer: {
    height: 70,
    width: 70,
    borderRadius: 10,
    overflow: "hidden",
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
  },
  reviewerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdAt: {
    fontSize: 14,
    color: colors.gray,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewerName: {
    transform: "Capitalize",
    fontSize: 16,
    color: colors.gray,
    paddingVertical: 5,
  },
  ratingDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  ratingDetails: {
    fontSize: 14,
    color: colors.gray,
  },
  reviewItemDesc: {
    flex: 1,
    fontSize: 14,
    color: colors.gray,
    paddingVertical: 5,
  },
  isOwn: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: colors.secondaryOffWhite,
    justifyContent: "space-around",
  },
  deleteBtn: {},
});
