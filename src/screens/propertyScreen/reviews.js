import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import { Octicons } from "@expo/vector-icons";
import CustomButton from "../../customComponents/CustomButton";
import ReviewCard from "../../components/propertyComponents/reviewCard";
import WriteReviewForm from "../../components/propertyComponents/writeReviewForm";
import { calculateAverageRating } from "../../utils/averageRating";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetPropertyReviewsQuery } from "../../features/properties/propertiesApiSlice";

const { height } = Dimensions.get("window");

export default function Reviews({ navigation, route }) {

  const userInfo = useSelector(selectCurrentUser);

  const {
    routeName,
    propertyId
  } = route?.params;

  const { data: reviewsData } = useGetPropertyReviewsQuery(propertyId);

  if(!reviewsData){
    return <ActivityIndicator size="large" color={colors.primary} />
  }

  const [writeReviewModal, setWriteReviewModal] = useState(false);

  const rating = calculateAverageRating(reviewsData);

  const toogleWriteReviewModal = () => {
    setWriteReviewModal((prev) => !prev);
  };

  const handleNavigate = () => {
    navigation.navigate(routeName || "Home", {
      propertyId
    });
  };

  const rightHeader = {
    exists: true,
    component: (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: userInfo?.avatar?.url,
          }}
          style={styles.image}
        />
      </View>
    ),
  };

  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={20} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={20} color="gold" />
  );

  let noExcellentReviews = 0,
    noGoodReviews = 0,
    noAverageReviews = 0,
    noPoorReviews = 0;
  for (let review of reviewsData) {
    if (review.rating >= 4) noExcellentReviews++;
    if (review.rating === 3) noGoodReviews++;
    if (review.rating === 2) noAverageReviews++;
    if (review.rating <= 1) noPoorReviews++;
  }

  const percentExcellentReviews = Math.round(
    (noExcellentReviews / reviewsData.length) * 100
  );
  const percentGoodReviews = Math.round((noGoodReviews / reviewsData.length) * 100);
  const percentAverageReviews = Math.round(
    (noAverageReviews / reviewsData.length) * 100
  );
  const percentPoorReviews = Math.round((noPoorReviews / reviewsData.length) * 100);

  const classes = [
    {
      name: "Excellent",
      percent: percentExcellentReviews,
    },
    {
      name: "Good",
      percent: percentGoodReviews,
    },
    {
      name: "Average",
      percent: percentAverageReviews,
    },
    {
      name: "Poor",
      percent: percentPoorReviews,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={writeReviewModal}
        animationType="slide"
        transparent={true}
      >
        <WriteReviewForm toogleWriteReviewModal={toogleWriteReviewModal} propertyId={propertyId} />
      </Modal>
      <CustomHeader
        title={"Property Review"}
        isNavigate={true}
        handleNavigate={handleNavigate}
        rightHeader={rightHeader}
      />
      <View style={styles.overall}>
        <Text style={styles.overallText}>Overall Rating</Text>
        <Text style={styles.boldRating}>{!Number.isInteger(rating) ? parseFloat(rating.toFixed(1)):rating + ".0"}</Text>
        <View style={styles.starsContainer}>
          {ratedStars && ratedStars}
          {unratedStars && unratedStars}
        </View>
        <Text style={styles.basedOn}>Based on {reviewsData?.length} reviews</Text>
        <View style={styles.classify}>
          {classes?.map((item, index) => {
            return (
              <View style={styles.class}>
                <Text style={styles.classText}>{item?.name}</Text>
                <View style={styles.sliderContainer}>
                  <View
                    style={{
                      width: item.percent + "%",
                      backgroundColor: "#FF29A6",
                      height: "100%",
                    }}
                  ></View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: colors.gray,
                      height: "100%",
                    }}
                  ></View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.reviewFlatList}>
        <FlatList
          data={reviewsData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            let isOwn = userInfo?._id === item.user._id;
            return (<ReviewCard {...item} isOwn={isOwn} />)
          }}
        />
      </View>
      <CustomButton
        buttonLabel={"Write a review"}
        customStyle={styles.customButtonStyle}
        onPress={toogleWriteReviewModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
  },
  overall: {
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  overallText: {
    fontSize: 24,
    color: colors.gray,
  },
  boldRating: {
    fontSize: 72,
    fontWeight: "bold",
    color: colors.black,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  basedOn: {
    fontSize: 18,
    color: colors.gray,
    marginVertical: 10,
  },
  classify: {
    flex: 1,
    gap: 10,
    marginVertical: 10,
  },
  class: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  classText: {
    fontSize: 16,
    color: colors.black,
  },
  customButtonStyle: {
    backgroundColor: "#FF29A6",
    marginBottom: 10,
  },
  reviewFlatList: {
    height: height / 3.5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.tertiary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
