import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Octicons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useLikePropertyMutation,useGetPropertyReviewsQuery } from "../../features/properties/propertiesApiSlice";
import { calculateAverageRating } from "../../utils/averageRating";

export default function PropertyCardFeatured({
  _id,
  title,
  img,
  images,
  price,
  city,
  state,
  country,
  address,
  navigation,
  description,
  owner,
  routeName,
  likes,
}) {
  const userInfo = useSelector(selectCurrentUser);

  const { data: reviewsData } = useGetPropertyReviewsQuery(_id);
  const [likeProperty, { isLoading: liking }] = useLikePropertyMutation();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let likedProp = likes?.includes(userInfo?._id);
    if (likedProp) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [_id, liking, likes, userInfo]);

  if(!reviewsData){
    return <ActivityIndicator size="large" color={colors.primary} />
  }


  const handleLike = async () => {
    try {
      const res = await likeProperty({ propertyId: _id }).unwrap();
    } catch (error) {
      alert("Network Error, Please try again");
      console.log(error);
    }
  };

  const rating = calculateAverageRating(reviewsData);

  let ratedStars, unratedStars;
  ratedStars = Array(Math.round(rating)).fill(
    <Octicons name="star-fill" size={14} color="gold" />
  );
  unratedStars = Array(5 - ratedStars.length).fill(
    <Octicons name="star" size={14} color="gold" />
  );

  const handleGoToDetails = () => {
    navigation.navigate("PropertyDetails", {
      routeName,
      propertyId: _id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToDetails}>
      <View style={[styles.imageContainer, globalStyles.shadowContainer]}>
        <Image source={{ uri: img?.url }} style={styles.image} />
      </View>
      <View style={[styles.detailsContainer, globalStyles.shadowContainer]}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₦{price}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleLike}>
            {liking ? (
              <ActivityIndicator size={"small"} color={colors.primary} />
            ) : (
              <>
                {liked ? (
                  <Octicons name="heart-fill" size={20} color={colors.red} />
                ) : (
                  <Octicons name="heart" size={20} color={colors.red} />
                )}
              </>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.locationContainer}>
          <SimpleLineIcons name="location-pin" size={15} color={colors.gray} />
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
            <Text style={styles.ratingText}>{!Number.isInteger(rating) ? parseFloat(rating.toFixed(1)):rating + ".0"}</Text>
          </View>
          <Text style={styles.reviewText}>{reviewsData?.length} Reviews</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  imageContainer: {
    width: 311,
    height: 220,
    borderRadius: 7,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    backgroundColor: colors.white,
    width: 259,
    height: 158,
    padding: 15,
    borderRadius: 7,
    justifyContent: "space-between",
    zIndex: 2,
    transform: [{ translateY: -45 }],
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
  },
  iconContainer: {},
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  address: {
    color: colors.primary,
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
  },
});
