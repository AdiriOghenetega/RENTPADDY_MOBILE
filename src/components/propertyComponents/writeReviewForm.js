import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import CustomButton from "../../customComponents/CustomButton";
import CustomStar from "../../customComponents/customStar";
import {
  usePostPropertyReviewMutation,
  useUpdatePropertyReviewMutation,
} from "../../features/properties/propertiesApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function WriteReviewForm({
  toogleWriteReviewModal,
  propertyId,
  isEdit,
  handleToogleIsEdit,
  initialComment,
  initialRating,
  reviewId
}) {
  const userInfo = useSelector(selectCurrentUser);

  const [postReview, { isLoading, error }] = usePostPropertyReviewMutation();
  const [updateReview, { isLoading: isUpdateLoading }] =
    useUpdatePropertyReviewMutation();

  const { name, avatar } = userInfo;

  const [comment, setComment] = useState(isEdit ? initialComment : "");
  const [rating, setRating] = useState(isEdit ? initialRating : 0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmitReview = async () => {
    try {
      let res;
      if (isEdit) {
        res = await updateReview({
          reviewId,
          body: { rating, comment },
        }).unwrap();
      } else {
        res = await postReview({
          rating,
          comment,
          property: propertyId,
        }).unwrap();
      }

      if (res?._id) {
        alert(isEdit ? "Review updated successfully":"Review posted successfully");
        toogleWriteReviewModal();
      } else {
        alert(isEdit ? "There was an error updating the review. Please try again.":"There was an error posting the review. Please try again.");
      }
    } catch (error) {
      alert("Network Error, Try again");
      console.log(error);
    }
  };

  const handleGoBack = () => {
    toogleWriteReviewModal();
    isEdit && handleToogleIsEdit();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.topSubContainer}
        ></TouchableOpacity>
        <KeyboardAvoidingView behavior="padding" style={styles.secondContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.titleText}>Rate Property</Text>
            <Image source={{ uri: avatar?.url }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.customStarsContainer}>
              <CustomStar
                rating={rating}
                handleRating={handleRating}
                size={30}
                customStyle={styles.customStyle}
              />
            </View>
            <TextInput
              placeholder="Type your review here..."
              onChangeText={(text) => setComment(text)}
              value={comment}
              style={styles.textInput}
              multiline={true}
              placeholderTextColor={colors.gray}
            />
            {(isLoading || isUpdateLoading) ? (
              <ActivityIndicator
                size={"small"}
                color={colors.primary}
                style={{ marginVertical: 10 }}
              />
            ) : (
              <CustomButton
                buttonLabel={isEdit ? "Update":"Submit"}
                onPress={handleSubmitReview}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  topSubContainer: {
    flex: 1,
  },
  subContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    margin: 10,
    height: "90%",
    gap: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignSelf: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
    alignSelf: "center",
  },
  customStarsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  customStyle: {
    gap: 10,
    marginVertical: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.lightgray,
    padding: 20,
    borderRadius: 10,
  },
});
