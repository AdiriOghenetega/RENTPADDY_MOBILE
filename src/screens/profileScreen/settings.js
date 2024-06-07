import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import { Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import CustomHeader from "../../customComponents/customHeader";
import { mockUserData } from "../../data/mockData";
import { globalStyles } from "../../styles/globalStyles";

export default function Settings({ navigation,route }) {
  const [isDarkmodeEnabled, setIsDarkmodeEnabled] = useState(false);
  const { name, email, bookingHistory, avatar } = mockUserData;

  const toggleModeSwitch = () => {
    setIsDarkmodeEnabled((prev) => !prev);
  };

  const rightHeader = {
    exists: true,
    component: (
      <TouchableOpacity 
      style={[styles.imageContainer, globalStyles.gridContainer]} 
      onPress={()=>navigation.navigate("Notification",{routeName:route?.name})}>
        <Image source={{ uri: avatar?.url }} style={styles.image} />
        <View style={styles.notificationIconContainer}>
          <MaterialIcons name="notifications" size={14} color="black" />
        </View>
      </TouchableOpacity>
    ),
  };

  const handleNavigate = () => {
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        handleNavigate={handleNavigate}
        title={"Settings"}
        rightHeader={rightHeader}
      />
      <View>
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesHeaderText}>Preferences</Text>
          <View style={styles.preferencesOptionsContainer}>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionDesc}>
                <Ionicons name="globe-sharp" size={24} color={colors.primary} />
                <Text style={styles.optionDescText}>Country</Text>
              </View>
              <View style={styles.optionCTA}>
                <Text style={styles.selectedOptionText}>Nigeria</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionDesc}>
                <FontAwesome6 name="language" size={24} color="green" />
                <Text style={styles.optionDescText}>Language</Text>
              </View>
              <View style={styles.optionCTA}>
                <Text style={styles.selectedOptionText}>English</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                /> 
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesHeaderText}>Application Settings</Text>
          <View style={styles.preferencesOptionsContainer}>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("Support")}>
              <View style={styles.optionDesc}>
                <MaterialIcons
                  name="support-agent"
                  size={24}
                  color={colors.secondary}
                />
                <Text style={styles.optionDescText}>Support</Text>
              </View>
              <View style={styles.optionCTA}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("TermsAndConditions")}>
              <View style={styles.optionDesc}>
                <MaterialIcons
                  name="library-books"
                  size={24}
                  color={colors.secondary}
                />
                <Text style={styles.optionDescText}>Terms & conditions</Text>
              </View>
              <View style={styles.optionCTA}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("AboutUs")}>
              <View style={styles.optionDesc}>
                <MaterialIcons
                  name="supervised-user-circle"
                  size={24}
                  color={colors.secondary}
                />
                <Text style={styles.optionDescText}>About us</Text>
              </View>
              <View style={styles.optionCTA}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  imageContainer: {},
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  notificationIconContainer: {
    position: "absolute",
    top: -10,
    left: -10,
    height: 25,
    width: 25,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  preferencesContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  preferencesOptionsContainer: {
    marginVertical: 10,
    gap:10
  },
  preferencesHeaderText: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "600",
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
  optionCTA: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedOptionText: {
    fontSize: 14,
    color: colors.gray,
  },
  optionDescText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary,
  },
});
