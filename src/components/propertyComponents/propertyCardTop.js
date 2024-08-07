import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";

const PropertyCardTop = ({
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
  likes
}) => {
  
  const reviews = []
  const rating = 4;

  const handleGoToDetails = () => {
    navigation.navigate("PropertyDetails", {
      title,
      img,
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
      likes,
      propertyId: _id
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToDetails}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img?.url }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.locationText}>
          {country},{state},{city}
        </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCardTop;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  imageContainer: {
    width: 150,
    height: 112,
    overflow: "hidden",
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    width: 150,
    height: "auto",
    backgroundColor: colors.white,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    padding: 10,
    justifyContent: "space-between",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "400",
  },
  address: {
    fontSize: 10,
    color: colors.gray,
  },
});
