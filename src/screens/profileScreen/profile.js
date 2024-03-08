import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Switch,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../customComponents/customHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { mockUserData } from "../../data/mockData";
import PropertyCardBooking from "../../components/profileComponents/propertyCardBooking";
import colors from "../../configs/colors";

export default function Profile({ navigation }) {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false); 

  const toggleLocationSwitch = () => {
    setIsLocationEnabled(!isLocationEnabled); // Update state on toggle
  };

  const { name, email, bookingHistory, avatar } = mockUserData;

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
    navigation.goback();
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNavigate={true}
        title={"Profile"}
        rightHeader={rightHeader}
        handleNavigate={handleNavigate}
      />
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
          <View style={styles.historyHeader}>
            <Text style={styles.headerText}>History</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("BookHistory")}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {bookingHistory?.length > 0 ? <View style={styles.historyFlatList}>
            <FlatList
              data={bookingHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PropertyCardBooking {...item} />}
            />
          </View>:
          <View style={styles.emptyHistoryContainer}>
            <Text style={styles.emptyHistoryText}>
              There is no booking history, book now.
            </Text>
          </View>
          }
        </View>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountHeaderText}>My Account</Text>
          <View style={styles.accountOptionsContainer}>
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
            <View style={styles.option}>
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
            </View>
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
            <View style={[styles.option,{marginLeft:4}]}>
              <View style={styles.optionDesc}>
                <MaterialIcons name="logout" size={20} color={colors.secondary} />
                <Text style={styles.optionDescText}>Logout</Text>
              </View>
            </View>
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
  backgroundColor:colors.secondaryOffWhite
  },
  userInfoContainer:{
   flexDirection:"row",
   alignItems:"center",
   gap:20
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
   width:"85%"
  },
  nameText:{
  fontSize:20,
  fontFamily : "RalewayBold"
  },
  detailsSubContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
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
  historyHeader:{
   flexDirection:"row",
   alignItems:"center",
   justifyContent:"space-between"
  },
  headerText:{
  fontSize:20,
  color:colors.secondary,
  },
  viewAllText:{
    color:colors.gray,
    fontSize:14
  },
  historyFlatList:{

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
    fontSize:20,
    color:colors.secondary,
  },
  accountOptionsContainer:{
    marginVertical:10
  },
  option:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:5
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
