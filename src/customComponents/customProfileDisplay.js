import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "./colors";

export default function CustomProfileDisplay({
  coverPhoto,
  avatar,
  name,
  username,
}) {
  return (
    <View>
      <View style={styles.profileCover}>
        <Image
          source={{
            uri:
              coverPhoto ||
              "https://plus.unsplash.com/premium_photo-1678344170545-c3edef92a16e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D",
          }}
          style={styles.coverPhoto}
        />

        <View style={styles.storeProfileContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri:
                avatar ||
                "https://plus.unsplash.com/premium_photo-1678344170545-c3edef92a16e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D",
            }}
          />

          <View style={styles.storeNameInfo}>
            <View style={styles.storeNameContainer}>
              <Text style={styles.storeNameText}>{name}</Text>
              <Text style={styles.storeUsername}>@{username}</Text>
            </View>

            <View style={styles.ratingBox}>
              <AntDesign name="star" size={14} color={colors.lightgold} />
              <AntDesign name="star" size={14} color={colors.lightgold} />
              <AntDesign name="star" size={14} color={colors.lightgold} />
              <AntDesign name="star" size={14} color={colors.lightgold} />
              <AntDesign name="star" size={14} color={colors.lightgold} />

              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCover: {},

  coverPhoto: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },

  storeProfileContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profilePicture: {
    height: 100,
    width: 100,
    borderWidth: 6,
    borderColor: colors.white,
    borderRadius: 100,
    marginTop: -50,
  },

  storeNameInfo: {
    width: "80%",
    alignItems: "center",
  },

  storeNameContainer: {
    paddingVertical: 10,
  },

  storeNameText: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: "RalewayBold",
  },

  storeUsername: {
    color: colors.gray,
    fontFamily: "RalewayMedium",
    fontSize: 12,
    textAlign: "center",
  },

  ratingBox: {
    flexDirection: "row",
  },

  ratingText: {
    fontFamily: "RalewaySemiBold",
    marginLeft: 5,
    alignItems: "center",
  },
});
