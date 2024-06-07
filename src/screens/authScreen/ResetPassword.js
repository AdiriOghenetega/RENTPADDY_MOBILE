import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Device from "expo-device";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useResetPasswordMutation } from "../../features/auth/authApiSlice";

const { height, width } = Dimensions.get("window");

const ResetPassword = ({ navigation, route }) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const { otp, email } = route?.params;

  const handleOtpSend = async () => {
    const { password, confirmPassword } = data;

    if (!otp) {
      alert("Error , Please enter OTP");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Please enter password and confirm password");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        resetCode: otp,
        newPassword: password,
      }).unwrap();

      if (response?.message === "Password changed successfully") {
        navigation.navigate("LoginScreen");
      } else {
        alert(response?.message || "Something went wrong, please try again");
      }
    } catch (err) {
      alert("Network Error, please try again");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerScrollContainer}>
          <View style={styles.main}>
            <View>
              <MaterialIcons name="security" size={34} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textHeader}>Forgot Password</Text>
              <Text style={styles.textBody}>Choose new password</Text>
            </View>

            <View style={styles.textInputContainer}>
              {/* Input fields */}
              <GlassmorphicInput
                placeholder="Enter new password"
                style={styles.textInput}
                onChangeText={(text) =>
                  setData((prev) => {
                    return {
                      ...prev,
                      password: text,
                    };
                  })
                }
                value={data.password}
              />

              <GlassmorphicInput
                placeholder="Confirm New Password"
                style={styles.textInput}
                onChangeText={(text) =>
                  setData((prev) => {
                    return {
                      ...prev,
                      confirmPassword: text,
                    };
                  })
                }
                value={data.confirmPassword}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <CustomButton buttonLabel="Verify" onPress={handleOtpSend} />
            )}
            <CustomButton
              buttonLabel="Back"
              onPress={() => navigation.navigate("OtpScreen", { email })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Device.modelName == "android" ? 20 : null,
    alignItems: "center",
    justifyContent: "center",
  },
  innerScrollContainer: {
    height: height - 100,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 53,
    height: 75,
  },

  textHeader: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "RalewayBold",
    color: colors.primary,
  },

  textBody: {
    textAlign: "center",
    color: colors.gray,
  },

  textContainer: {
    padding: 20,
  },

  textInputContainer: {
    width: "100%",
  },

  textInput: {
    width: "100%",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
export default ResetPassword;
