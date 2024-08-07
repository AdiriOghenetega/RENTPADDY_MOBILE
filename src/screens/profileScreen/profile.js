import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Switch,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import BookedList from "../../components/propertyComponents/bookedList";
import MyBookedListComponent from "../../components/propertyComponents/myBookedList";
import colors from "../../configs/colors";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  useGetuserProfileQuery,
  useDeleteUserMutation,
  useDeleteUserProfileMutation,
  useGetUserRentedHistoryQuery,
  useGetUserOwnRentedHistoryQuery
} from "../../features/user/userApiSlice";
import CustomButton from "../../customComponents/CustomButton";

const { width, height } = Dimensions.get("window");

export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();

  const routeName = route?.params?.routeName;

  const userInfo = useSelector(selectCurrentUser);
  const { data: user, isLoading } = useGetuserProfileQuery({
    userId: userInfo?._id,
  });
  const {data: bookingHistory,isloading:bookingHistoryLoading} = useGetUserRentedHistoryQuery({userId:userInfo?._id});
  const {data: ownBookingHistory,isloading:ownBookingHistoryLoading} = useGetUserOwnRentedHistoryQuery({userId:userInfo?._id});


  const [deleteProfile, { isLoading: deletingProfile }] =
    useDeleteUserMutation();
  const [deleteProfileData, { isLoading: deletingProfileData }] =
    useDeleteUserProfileMutation();

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  if (isLoading) {
    return;
  }

  const name = user?.name;
  const email = user?.email;
  const avatar = user?.avatar;

  const toggleLocationSwitch = () => {
    setIsLocationEnabled(!isLocationEnabled); // Update state on toggle
  };

  const rightHeader = {
    exists: true,
    component: (
      <TouchableOpacity
        style={[globalStyles.gridContainer, globalStyles.shadowContainer]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    ),
  };

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigation.replace("LoginScreen");
  };

  const handleEraseProfileDataPrompt = () => {
    return Alert.alert(
      "you're about to delete your profile's data",
      "this will include all data except your name and login info",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleEraseProfileData },
      ]
    );
  };

  const handleDeleteProfilePrompt = () => {
    return Alert.alert(
      "you're about to completely delete your profile",
      "this action is irreversible, and you'll be logged out",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleDeleteProfile },
      ]
    );
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await deleteProfile({ userId: userInfo?._id }).unwrap();
      if (res?._id) {
        alert("Profile completely deleted, hate to see you go 😔");
        handleLogout();
      } else {
        alert("profile deletion unsuccessful, Try Again");
      }
    } catch (err) {
      alert("Network Error, Try again");
      console.log(err);
    }
  };

  const handleEraseProfileData = async () => {
    try {
      const res = await deleteProfileData({ userId: userInfo?._id }).unwrap();
      if (res?.message === "user profile cleared successfully") {
        alert("Profile data completely deleted, enjoy a fresh start 👍");
      } else {
        alert("profile data deletion unsuccessful, Try Again");
      }
    } catch (err) {
      alert("Network Error, Try again");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        title={"Profile"}
        rightHeader={rightHeader}
        handleNavigate={handleNavigate}
      />
      <ScrollView>
        <View>
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: avatar?.url }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <View style={styles.detailsSubContainer}>
                <Text style={styles.emailText}>{email}</Text>
                <TouchableOpacity
                  style={styles.editContainer}
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <Text style={styles.editText}>Edit</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <View style={globalStyles.historyHeader}>
              <Text style={[globalStyles.headerText, { fontSize: 16 }]}>
                Recent Properties Rented From You
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("BookHistory")}
              >
                <Text style={globalStyles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <BookedList
              data={bookingHistory?.length > 3 ? bookingHistory?.splice(0, 2): bookingHistory}
              navigation={navigation}
              routeName={route?.name}
            />
          </View>
          <View style={styles.historyContainer}>
            <View style={globalStyles.historyHeader}>
              <Text style={[globalStyles.headerText, { fontSize: 16 }]}>
                Recent Properties You Rented
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyBookedList")}
              >
                <Text style={globalStyles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <MyBookedListComponent
              data={ownBookingHistory?.length > 3 ? ownBookingHistory?.splice(0, 2): ownBookingHistory}
              navigation={navigation}
              routeName={route?.name}
            />
          </View>
          <View style={styles.accountInfoContainer}>
            <Text style={styles.accountHeaderText}>My Account</Text>
            <View style={styles.accountOptionsContainer}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate("MyProperties")}
              >
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="other-houses"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>My Properties</Text>
                </View>
                <View style={styles.optionCTA}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate("ReviewList")}
              >
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="reviews"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>Reviews</Text>
                </View>
                <View style={styles.optionCTA}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate("Security")}
              >
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="security"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>Security</Text>
                </View>
                <View style={styles.optionCTA}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() =>
                  navigation.navigate("Saved", { routeName: route?.name })
                }
              >
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="bookmark"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>Saved</Text>
                </View>
                <View style={styles.optionCTA}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.option}>
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="location-on"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>Location</Text>
                </View>
                <View style={styles.optionCTA}>
                  <Switch
                    trackColor={{ false: "#767577", true: colors.secondary }}
                    thumbColor={isLocationEnabled ? "#f4f4f4" : "#f4f4f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocationSwitch}
                    value={isLocationEnabled}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[styles.option, { marginLeft: 4 }]}
                onPress={handleLogout}
              >
                <View style={styles.optionDesc}>
                  <MaterialIcons
                    name="logout"
                    size={20}
                    color={colors.secondary}
                  />
                  <Text style={styles.optionDescText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.accountInfoContainer}>
            <View style={styles.deleteContainer}>
              {deletingProfileData ? (
                <View style={{ marginVertical: 15 }}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : (
                <CustomButton
                  buttonLabel={"Delete Profile Data"}
                  customContainerStyle={styles.customButtonContainerStyle}
                  customStyle={[
                    styles.customButtonStyle,
                    { backgroundColor: colors.lightgray },
                  ]}
                  customLabelStyle={styles.customButtonLabelStyle}
                  onPress={handleEraseProfileDataPrompt}
                />
              )}
              {deletingProfile ? (
                <View style={{ marginVertical: 15 }}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : (
                <CustomButton
                  buttonLabel={"Delete Profile"}
                  customContainerStyle={styles.customButtonContainerStyle}
                  customStyle={[
                    styles.customButtonStyle,
                    { backgroundColor: colors.gray },
                  ]}
                  customLabelStyle={styles.customButtonLabelStyle}
                  onPress={handleDeleteProfilePrompt}
                />
              )}
            </View>
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imageContainer: {
    height: 72,
    width: 72,
    overflow: "hidden",
    borderRadius: 50,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    width: "78%",
  },
  nameText: {
    fontSize: 20,
    fontFamily: "RalewayBold",
  },
  detailsSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emailText: {
    color: colors.gray,
    fontSize: 14,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: colors.gray,
    fontSize: 14,
  },
  historyContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  historyFlatList: {},
  historyFlatListSubContainer: {
    width: width - 60,
    alignSelf: "center",
  },
  emptyHistoryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHistoryText: {
    color: colors.gray,
    fontSize: 14,
  },
  accountInfoContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  accountHeaderText: {
    fontSize: 18,
    color: colors.secondary,
  },
  accountOptionsContainer: {
    marginVertical: 10,
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  optionDesc: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  optionCTA: {},
  optionDescText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
  },
  deleteContainer: {
    justifyContent: "space-between",
    height: 60,
  },
  customButtonContainerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  customButtonStyle: {
    padding: 5,
    borderRadius: 5,
  },
  customButtonLabelStyle: {
    fontSize: 14,
    fontWeight: "100",
  },
});
