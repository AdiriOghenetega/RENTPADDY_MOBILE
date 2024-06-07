import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome6, MaterialIcons, Octicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { useUpdateAvaliabilityMutation,useDeletePropertyMutation } from "../../features/properties/propertiesApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function MyPropertyCard({
  _id,
  title,
  price,
  address,
  city,
  state,
  country,
  images,
  likes,
  frequency,
  avaliability,
  handleEditTrue,
}) {
  const userInfo = useSelector(selectCurrentUser);

  const [updateAvaliability, { isLoading }] = useUpdateAvaliabilityMutation();
  const [deleteProperty, {isLoading: deleting}] = useDeletePropertyMutation();

  const toggleAvailabilitySwitch = async () => {
    try {
      const res = await updateAvaliability({
        userId: userInfo._id,
        body: { propertyId: _id, avaliability: !avaliability },
      }).unwrap();
    } catch (err) {
      alert("Network Error,Try again");
      console.log(err);
    }
  };

  const handleDeleteProperty = async ()=>{
   try{
    const res = await deleteProperty({userId:userInfo?._id,body:{propertyId:_id}}).unwrap();
    if(res?._id){
      alert("Property deleted successfully");
    }else{
      alert(res?.message || "Property delete failed");
    }
   }catch(err){
    alert("Network Error, Try again");
      console.log(err);
   }
  }

  return (
    <View style={[styles.container, globalStyles.shadowContainer]}>
      <View style={styles.imageContainer}>
        <View style={styles.edit_delete_buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditTrue(_id)}
          >
            <FontAwesome6 name="edit" size={24} color={"#FF29A6"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteProperty()}
          >
            {deleting ?  <ActivityIndicator size={"small"} color={colors.primary} /> : <MaterialIcons name="delete" size={24} color={colors.primary} />}
          </TouchableOpacity>
        </View>
        <View style={globalStyles.likesContainer}>
          <Text style={globalStyles.likesText}>{likes?.length}</Text>
          <Octicons name="heart-fill" size={18} color={colors.red} />
        </View>
        <Image source={{ uri: images[0]?.url }} style={styles.propertyImage} />
        <View style={styles.blurBackground}></View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          ${price} / {frequency}
        </Text>
        <Text style={styles.location}>
          {address}, {city}, {state}, {country}
        </Text>
        <View style={styles.optionCTA}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>
              Turn On/Off Property Availability
            </Text>
            <Text style={styles.optionText2}>
              (is property currently open to rent?)
            </Text>
          </View>
          <View style={styles.switchTransform}>
            {isLoading ? (
              <ActivityIndicator size={"small"} color={colors.primary} />
            ) : (
              <Switch
                trackColor={{
                  false: "#767577",
                  true: colors.secondaryOffWhite,
                }}
                thumbColor={avaliability ? colors.primary : "#f4f4f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleAvailabilitySwitch}
                value={avaliability}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: "50%",
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    opacity: 0.3,
    borderRadius: 5,
    zIndex: 0.5,
  },
  edit_delete_buttonsContainer: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    padding: 15,
    gap: 5,
    borderRadius: 5,
  },
  editButton: {},
  deleteButton: {},
  propertyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    marginVertical: 2,
  },
  location: {
    color: colors.gray,
    fontSize: 12,
    marginVertical: 2,
  },
  optionCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 2,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
  },
  optionText2: {
    fontSize: 10,
    color: colors.gray,
  },
  switchTransform: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
