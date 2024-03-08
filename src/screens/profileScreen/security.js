import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function Security({ navigation }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleNavigate = () => {
    navigation.navigate("Profile");
  };

  const handlePasswordChange = () => {
    console.log("password updated");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        title={"Security"}
        handleNavigate={handleNavigate}
      />
      <View style={styles.securityOptions}>
        <View style={styles.changePassword}>
          <TouchableOpacity
            onPress={() => setToggleForm((prev) => !prev)}
            style={styles.changePasswordTextContainer}
          >
            <Text style={styles.changePasswordText}>Change password</Text>
            {toggleForm ? (
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color={colors.gray}
              />
            ) : (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={colors.gray}
              />
            )}
          </TouchableOpacity>
          {toggleForm && (
            <View style={styles.changePasswordFormContainer}>
              <View style={styles.formContainer}>
                <View style={styles.textInputContainer}>
                  <GlassmorphicInput
                    placeholder="Old Password"
                    isPassword={true}
                    onChangeText={(text) => {
                      setSecurityData((prev) => {
                        return {
                          ...prev,
                          oldPassword: text,
                        };
                      });
                    }}
                    value={securityData.oldPassword}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <GlassmorphicInput
                    placeholder="New Password"
                    isPassword={true}
                    onChangeText={(text) => {
                      setSecurityData((prev) => {
                        return {
                          ...prev,
                          newPassword: text,
                        };
                      });
                    }}
                    value={securityData.newPassword}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <GlassmorphicInput
                    placeholder="Confirm Password"
                    isPassword={true}
                    onChangeText={(text) => {
                      setSecurityData((prev) => {
                        return {
                          ...prev,
                          confirmPassword: text,
                        };
                      });
                    }}
                    value={securityData.confirmPassword}
                  />
                </View>
              </View>
              <CustomButton
                buttonLabel={"Update"}
                onPress={handlePasswordChange}
              />
            </View>
          )}
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
  securityOptions: {},
  changePassword: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  changePasswordText: {
    fontSize: 16,
    color: colors.secondary,
  },
  changePasswordTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  changePasswordFormContainer: {
    marginVertical: 10,
  },
  formContainer: {},
  textInputContainer: {},
});
