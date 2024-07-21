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
  ScrollView
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { mockUserData } from "../../data/mockData";
import BookedList from "../../components/propertyComponents/bookedList";
import MyBookedListComponent from "../../components/propertyComponents/myBookedList";
import colors from "../../configs/colors";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useGetuserProfileQuery } from "../../features/user/userApiSlice";

const { width, height } = Dimensions.get("window");

export default function Profile({ navigation, route }) {
  
  const dispatch = useDispatch();

  const routeName = route?.params?.routeName

  const userInfo = useSelector(selectCurrentUser)
  const {data:user,isLoading} = useGetuserProfileQuery({userId:userInfo._id})
  
  const [isLocationEnabled, setIsLocationEnabled] = useState(false); 
  
if(isLoading){
  return 
}

  const {name,email,avatar} = user
  const {  bookingHistory } = mockUserData;


  const toggleLocationSwitch = () => {
    setIsLocationEnabled(!isLocationEnabled); // Update state on toggle
  };

  const rightHeader = {
    exists: true,
    component: (
      <TouchableOpacity 
      style={[globalStyles.gridContainer,globalStyles.shadowContainer]}
      onPress={()=>navigation.navigate("Settings")}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    ),
  };

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

const handleLogout = ()=>{
  dispatch(logOut());
  navigation.replace("LoginScreen")
}

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
              <TouchableOpacity style={styles.editContainer} onPress={()=>navigation.navigate("EditProfile")}>
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
            <Text style={[globalStyles.headerText,{fontSize:16}]}>Recent Properties You Rented</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("BookHistory")}>
              <Text style={globalStyles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <BookedList data={bookingHistory.splice(0, 2)} navigation={navigation} routeName={route?.name} />
          
        </View>
        <View style={styles.historyContainer}>
          <View style={globalStyles.historyHeader}>
            <Text style={[globalStyles.headerText,{fontSize:16}]}>Recent Properties Rented From You</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("MyBookedList")}>
              <Text style={globalStyles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <MyBookedListComponent data={bookingHistory.splice(0, 2)} navigation={navigation} routeName={route?.name} />
          
        </View>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountHeaderText}>My Account</Text>
          <View style={styles.accountOptionsContainer}>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("MyProperties")}>
              <View style={styles.optionDesc}>
                <MaterialIcons name="other-houses" size={24} color={colors.secondary} />
                <Text style={styles.optionDescText}>My Properties</Text>
              </View>
              <View style={styles.optionCTA} >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("ReviewList")}>
              <View style={styles.optionDesc}>
                <MaterialIcons name="reviews" size={24} color={colors.secondary} />
                <Text style={styles.optionDescText}>Reviews</Text>
              </View>
              <View style={styles.optionCTA} >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("Security")}>
              <View style={styles.optionDesc}>
                <MaterialIcons name="security" size={24} color={colors.secondary} />
                <Text style={styles.optionDescText}>Security</Text>
              </View>
              <View style={styles.optionCTA} >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("Saved",{routeName:route?.name})}>
              <View style={styles.optionDesc}>
              <MaterialIcons name="bookmark" size={24} color={colors.secondary} />
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
                <MaterialIcons name="location-on" size={24} color={colors.secondary} />
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
            <TouchableOpacity style={[styles.option,{marginLeft:4}]} onPress={handleLogout}>
              <View style={styles.optionDesc}>
                <MaterialIcons name="logout" size={20} color={colors.secondary} />
                <Text style={styles.optionDescText}>Logout</Text>
              </View>
            </TouchableOpacity>
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
  backgroundColor:colors.secondaryOffWhite
  },
  userInfoContainer:{
   flexDirection:"row",
   alignItems:"center",
   justifyContent:"space-between",
   paddingHorizontal:10,
  },
  imageContainer:{
    height:72,
    width:72,
    overflow:"hidden",
    borderRadius:50
  },
  image:{
    height:"100%",
    width:"100%"
  },
  detailsContainer:{
   width:"78%",
  },
  nameText:{
  fontSize:20,
  fontFamily : "RalewayBold"
  },
  detailsSubContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    
  },
  emailText:{
    color:colors.gray,
    fontSize:14
  },
  editContainer:{
flexDirection:"row",
alignItems:"center"
  },
  editText:{
color:colors.gray,
fontSize:14
  },
  historyContainer:{
  backgroundColor:colors.white,
  padding:20,
  marginVertical:20,
  borderRadius:10
  },
  historyFlatList:{

  },
  historyFlatListSubContainer: {
    width: width - 60,
    alignSelf: "center",
  },
  emptyHistoryContainer:{
  justifyContent:"center",
  alignItems:"center"
  },
  emptyHistoryText:{
    color:colors.gray,
    fontSize:14
  },
  accountInfoContainer:{
    backgroundColor:colors.white,
    padding:20,
    marginVertical:20,
    borderRadius:10
  },
  accountHeaderText:{
    fontSize:18,
    color:colors.secondary,
  },
  accountOptionsContainer:{
    marginVertical:10,
    gap:10
  },
  option:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:5,
  },
  optionDesc:{
   flexDirection:"row",
   alignItems:"center",
   gap:5
  },
  optionCTA:{
  
  },
  optionDescText:{
    fontSize:14,
    fontWeight:"600",
    color:colors.secondary
  }
});
