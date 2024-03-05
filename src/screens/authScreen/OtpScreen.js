import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Device from "expo-device";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const OtpScreen = ({ navigation, route }) => {
  const { email } = route?.params;

  const [otp, setOtp] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerScrollContainer}>
          <View style={styles.main}>
            <View>
              <MaterialIcons name="security" size={34} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textHeader}>Enter Code</Text>
              <Text style={styles.textBody}>Enter the OTP sent to {email}</Text>
            </View>

            <View style={styles.textInputContainer}>
              {/* Input fields */}
              <GlassmorphicInput
                placeholder="Enter the code"
                style={styles.textInput}
                onChangeText={(text) => setOtp(text)}
                value={otp}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              buttonLabel="Verify"
              onPress={() =>
                navigation.navigate("ResetPassword", { email, otp })
              }
            />
            <CustomButton
              buttonLabel="Back"
              onPress={() => navigation.navigate("ForgotPassword", { email })}
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

export default OtpScreen;
