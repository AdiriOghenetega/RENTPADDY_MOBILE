import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import CustomHr from "../../customComponents/CustomHr";

const { height, width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // API call to login
    navigation.navigate("Home")
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: `https://images.unsplash.com/photo-1679939153967-7591b553eed3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHJlbnRhbCUyMHByb3BlcnR5fGVufDB8MXwwfHx8MA%3D%3D`,
        }}
        style={styles.backgroundImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.welcomeNote}>welcome to</Text>
              <Text style={[styles.welcomeNote, { marginTop: 0 }]}>
                rentpaddy 🙋‍♂️
              </Text>
            </View>
            <View>
              <Text style={styles.signInPrompt}>Sign In</Text>
              <View style={styles.loginBox}>
                <View style={styles.textInputContainer}>
                  <GlassmorphicInput
                    placeholder="Email Address"
                    onChangeText={(text) =>
                      setFormData((prev) => {
                        return {
                          ...prev,
                          email: text?.toLowerCase(),
                        };
                      })
                    }
                    value={formData.email}
                  />
                </View>

                <View style={styles.textInputContainer}>
                  <GlassmorphicInput
                    placeholder="Password"
                    isPassword={true}
                    onChangeText={(text) =>
                      setFormData((prev) => {
                        return {
                          ...prev,
                          password: text,
                        };
                      })
                    }
                    value={formData.password}
                  />
                </View>

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() =>
                    navigation.navigate("ForgotPassword")
                  }
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.loginButtonBox}>
                {loading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <CustomButton buttonLabel="Login" onPress={handleLogin} />
                )}
              </View>

              <CustomHr middleText="or" />

              <View style={styles.otherCTA}>
                <Text style={styles.subCTA}>New to RentPaddy? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.mainCTA}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zindex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    width: width,
    height: height,
    position: "absolute",
  },
  logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  logoContainer: {
    overflow: "hidden",
    height: 116,
    width: 116,
    backgroundColor: colors.primary,
  },
  welcomeNote: {
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "capitalize",
    alignItems: "center",
    fontFamily: "RalewaySemiBold",
    color: colors.secondary,
    marginTop: 20,
  },
  title: {
    margin: 50,
    alignSelf: "flex-start",
  },
  signInPrompt: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "RalewayRegular",
    marginTop: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  loginBox: {
    width: width * 0.9,
    alignSelf: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontFamily: "RalewayMedium",
    fontSize: 14,
  },
  otherCTA: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  subCTA: {
    fontFamily: "RalewayMedium",
  },
  mainCTA: {
    fontFamily: "RalewayBold",
    color: colors.primary,
  },
});
