import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import CustomHeader from '../../customComponents/customHeader'

export default function AboutUs({navigation,route}) {

  const handleNavigate = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={"About Us"} isNavigate={true} handleNavigate={handleNavigate} handleNotificationNavigate={()=>navigation.navigate("Notification",{routeName:route?.name})} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})