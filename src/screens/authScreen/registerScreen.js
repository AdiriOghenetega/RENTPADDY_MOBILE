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
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import CustomHr from "../../customComponents/CustomHr";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import * as FileSystem from 'expo-file-system';

const { height, width } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {

  const [register,{ isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    mobile: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFormChange = (name, text) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: text,
      };
    });
  };

  
  const handleRegister = async () => {
    
    const formdata = new FormData();

    let fileInfo = await FileSystem.getInfoAsync(formData.avatar)
    if(!fileInfo.exists){
      alert("Something went wrong while uploading image")
      return
    }
    let fileUri = fileInfo.uri
    let fileName = fileUri.split("/").pop();
    let fileType = fileName?.split(".").pop();
    const mimeType = `image/${fileType}`;

    formdata.append("name", formData.name);
    formdata.append("username", formData.username);
    formdata.append("password", formData.password);
    formdata.append("email", formData.email);
    formdata.append("mobile", formData.mobile);
    formdata.append("avatar", {
      name: fileName,
      uri: fileUri,
      type: mimeType,
    })

    try {
      const userData = await register(formdata).unwrap()
      if(userData?._id){
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmpassword: "",
          email: "",
          mobile: "",
          avatar: "",
        })
           navigation.navigate("LoginScreen")
      }else{
        alert(userData?.message || "Registration failed. Please try again.")
      }
  } catch (err) {
    alert("Network Error. Please try again.");
     console.log(err);
  }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      
      setFormData((prev) => {
        return {
          ...prev,
          avatar: result.assets[0].uri,
        };
      });
    } else {
      alert("You did not select any image.");
    }
  };

  

  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: `https://images.unsplash.com/photo-1643665592005-843f3f6b4ece?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJlbnRhbCUyMHByb3BlcnR5fGVufDB8MXwwfHx8MA%3D%3D`,
        }}
        style={styles.backgroundImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={styles.formContainer}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarDisplay}>
                    {formData?.avatar && (
                      <Image
                        source={{
                          uri: formData?.avatar,
                        }}
                        style={styles.avatarImage}
                      />
                    )}
                    {!formData?.avatar && (
                      <FontAwesome
                        name="user"
                        size={54}
                        color={colors.secondary}
                        styler={styles.avatarIcon}
                      />
                    )}
                  </View>
                   
                    <TouchableOpacity
                      style={styles.avatarUploadTextContainer}
                      onPress={pickImageAsync}
                    >
                      <Text style={styles.avatarUploadText}>upload</Text>
                    </TouchableOpacity>
                  
                </View>
                <View style={styles.loginBox}>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Name"
                      onChangeText={(text) => {
                        handleFormChange("name", text);
                      }}
                      value={formData.name}
                    />
                  </View>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Username"
                      onChangeText={(text) => {
                        handleFormChange("username", text);
                      }}
                      value={formData.username}
                    />
                  </View>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Email Address"
                      onChangeText={(text) => {
                        handleFormChange("email", text?.toLowerCase());
                      }}
                      value={formData.email}
                    />
                  </View>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Phone Number"
                      onChangeText={(text) => {
                        handleFormChange("mobile", text);
                      }}
                      value={formData.mobile}
                    />
                  </View>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Password"
                      isPassword={true}
                      onChangeText={(text) => {
                        handleFormChange("password", text);
                      }}
                      value={formData.password}
                    />
                  </View>
                  <View style={styles.textInputContainer}>
                    <GlassmorphicInput
                      placeholder="Confirm Password"
                      isPassword={true}
                      onChangeText={(text) => {
                        handleFormChange("confirmpassword", text);
                      }}
                      value={formData.confirmpassword}
                    />
                  </View>
                </View>

                <View style={styles.loginButtonBox}>
                  {isLoading ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <CustomButton
                      buttonLabel="Register"
                      onPress={handleRegister}
                    />
                  )}
                </View>

                <CustomHr middleText="or" />

                <View style={styles.otherCTA}>
                  <Text style={styles.subCTA}>Already have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                  >
                    <Text style={styles.mainCTA}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  formContainer:{
  marginTop:80,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: width * 0.8,
    alignSelf: "center",
    borderColor: colors.lightgray,
    borderWidth: 3,
    overflow: "hidden",
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarUploadTextContainer: {
    position: "absolute",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 10,
    alignSelf: "flex-end",
  },
  avatarUploadText: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: "RalewayRegular",
    fontWeight: "bold",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
  },
  avatarIcon: {
    position: "absolute",
    backgroundColor: colors.secondary,
  },
  welcomeNote: {
    fontSize: 30,
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
    marginBottom: 100,
  },

  subCTA: {
    fontFamily: "RalewayMedium",
  },
  mainCTA: {
    fontFamily: "RalewayBold",
    color: colors.primary,
  },
  textInputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
