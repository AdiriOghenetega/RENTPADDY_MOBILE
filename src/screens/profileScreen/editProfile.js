import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import CustomButton from "../../customComponents/CustomButton";
import CustomHeader from "../../customComponents/customHeader";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { useUpdateuserMutation,useGetuserProfileQuery } from "../../features/user/userApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {useSelector} from "react-redux"
import { mockUserData } from "../../data/mockData";

export default function EditProfile({ navigation,route }) {

  const userInfo = useSelector(selectCurrentUser)
 const {data:userProfile,isLoading} = useGetuserProfileQuery({userId:userInfo._id})

  const [updateProfile,{isLoading:updating}] = useUpdateuserMutation();

  const [editData, setEditData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    avatar: "",
    coverPhoto: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
     if(userProfile){
      setEditData(prev=>{
        return {
          name:userProfile?.name,
          username:userProfile?.username,
          email:userProfile?.email,
          mobile:userProfile?.mobile,
        }
      })
     }
  },[userProfile])

  const pickImage = async (id) => {
    try {
      // No permissions request is necessary for launching the image library

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });

        if (!result.canceled) {
          setEditData((prev) => {
            return {
              ...prev,
              [id]: result.assets[0].uri,
            };
          });
        }
      }
    } catch (error) {
      console.log(error, "unable to upload image");
      toast("Unable to upload image,try again");
    }
  };

  const handleUpdateProfile = async () => {

    const {name,username,mobile,email,avatar,coverPhoto} = editData

    const formdata = new FormData()

    formdata.append("name",name)
    formdata.append("username",username)
    formdata.append("mobile",mobile)
    formdata.append("email",email)

    if(avatar){
      let fileInfo = await FileSystem.getInfoAsync(avatar)
        if(!fileInfo.exists){
          alert("Something went wrong while uploading image")
          return
        }
        let fileUri = fileInfo.uri
        let fileName = fileUri.split("/").pop();
        let fileType = fileName?.split(".").pop();
        const mimeType = `image/${fileType}`;
        formdata.append("avatar",{
          name: fileName,
          uri: fileUri ,
          type: mimeType,
        })
    }

    if(coverPhoto){
      let fileInfo = await FileSystem.getInfoAsync(coverPhoto)
        if(!fileInfo.exists){
          alert("Something went wrong while uploading image")
          return
        }
        let fileUri = fileInfo.uri
        let fileName = fileUri.split("/").pop();
        let fileType = fileName?.split(".").pop();
        const mimeType = `image/${fileType}`;
        formdata.append("avatar",{
          name: fileName,
          uri: fileUri ,
          type: mimeType,
        })
    }

    try{
        const res =  await updateProfile({userId:userInfo._id,body:formdata}).unwrap()
        console.log(res)
        if(res?._id){
          alert("Profile Updated Successfully")
        }else{
          alert("Profile couldn't be updated at this time, try again")
        }
    }catch(err){
      alert("Network Error,Try Again")
      console.log(err)
    }
  };

  const handleNavigate = () => {
    navigation.navigate("Profile");
  };

  let profilePic;
  if (!editData?.avatar && !userProfile?.avatar) {
    profilePic = {
      uri: "https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww",
    };
  } else if (editData?.avatar) {
    profilePic = { uri: editData?.avatar };
  } else{
    profilePic = { uri: userProfile?.avatar?.url }
  }

  let coverPic;
  if (!editData?.coverPhoto && !userProfile?.coverPhoto) {
    coverPic = {
      uri: "https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww",
    };
  } else if (editData?.coverPhoto) {
    coverPic = { uri: editData?.coverPhoto };
  }else{
    coverPic = { uri:userProfile?.coverPhoto?.url }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title={"Edit Profile"}
          isNavigate={true}
          handleNavigate={handleNavigate}
          handleNotificationNavigate={()=>navigation.navigate("Notification",{routeName:route?.name})}
        />
        <ImageBackground source={coverPic} style={styles.profilePicParent}>
          <View style={styles.profilePicContainer}>
            <Image
              source={profilePic}
              alt="profilePic"
              style={styles.profilePic}
            />
            <TouchableOpacity
              style={styles.editPic}
              onPress={() => pickImage("avatar")}
            >
              <MaterialIcons name="edit" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editPic2}
            onPress={() => pickImage("coverPhoto")}
          >
            <MaterialIcons name="edit" size={24} color={colors.white} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <GlassmorphicInput
              placeholder="Username"
              onChangeText={(text) => {
                setEditData((prev) => {
                  return {
                    ...prev,
                    username: text,
                  };
                });
              }}
              value={editData.username}
            />
          </View>
          <View style={styles.textInputContainer}>
            <GlassmorphicInput
              placeholder="Name"
              onChangeText={(text) => {
                setEditData((prev) => {
                  return {
                    ...prev,
                    name: text,
                  };
                });
              }}
              value={editData.name}
            />
          </View>
          <View style={styles.textInputContainer}>
            <GlassmorphicInput
              placeholder="Mobile"
              onChangeText={(text) => {
                setEditData((prev) => {
                  return {
                    ...prev,
                    mobile: text,
                  };
                });
              }}
              value={editData.mobile}
            />
          </View>
          <View style={styles.textInputContainer}>
            <GlassmorphicInput
              placeholder="Email"
              onChangeText={(text) => {
                setEditData((prev) => {
                  return {
                    ...prev,
                    email: text,
                  };
                });
              }}
              value={editData.email}
            />
          </View>
        </View>
        {updating ? (
          <ActivityIndicator />
        ) : (
          <CustomButton buttonLabel={"Update"} onPress={handleUpdateProfile} />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
    paddingHorizontal: 15,
  },
  profilePicContainer: {
    height: 84,
    width: 84,
    borderRadius: 50,
  },
  profilePicParent: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  profilePic: {
    height: 84,
    width: 84,
    borderRadius: 50,
  },
  editPic: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 10,
    right: 10,
  },
  editPic2: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textInputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  formContainer: {
    height: 250,
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
