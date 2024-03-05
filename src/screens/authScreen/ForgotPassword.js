import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Device from "expo-device";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    if (!email) {
      Alert.alert("Error", "Please enter email");
      setLoading(false);
      return;
    }
    navigation.navigate("OtpScreen", { email });
    setLoading(false);
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
              <Text style={styles.textBody}>
                Don’t worry this happens 😁{"\n"}
                Enter your email to get a code to reset your password
              </Text>
            </View>

            <View style={styles.textInputContainer}>
              {/* Input fields */}
              <GlassmorphicInput
                placeholder="Enter your email"
                style={styles.textInput}
                onChangeText={(text) => setEmail(text?.toLowerCase())}
                value={email}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <CustomButton
                buttonLabel="Send Code"
                onPress={handleForgotPassword}
              />
            )}
            <CustomButton
              buttonLabel="Back"
              onPress={() => navigation.navigate("Login")}
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

export default ForgotPassword;
