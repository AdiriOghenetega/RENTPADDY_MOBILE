import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import colors from '../../configs/colors'
import CustomHeader from '../../customComponents/customHeader'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useGetUserPropertyReviewsQuery } from '../../features/properties/propertiesApiSlice'
import ReviewCard from '../../components/propertyComponents/reviewCard'

export default function ReviewList({navigation}) {

    const userInfo = useSelector(selectCurrentUser)

    const {data: reviews, isLoading} = useGetUserPropertyReviewsQuery(userInfo?._id);

    if(!reviews || isLoading) return <ActivityIndicator size={"small"} color={colors.primary} />

    const handleNavigate = () => {
        navigation.navigate("Profile");
      };
    
      const rightHeader = {
        exists: true,
        component: (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: userInfo?.avatar?.url,
              }}
              style={styles.image}
            />
          </View>
        ),
      };


  return (
    <SafeAreaView style={styles.container}>
       <CustomHeader
        title={"Reviews"}
        isNavigate={true}
        handleNavigate={handleNavigate}
        rightHeader={rightHeader}
      />
      <View style={styles.listContainer}>
      <FlatList
          data={reviews}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let isOwn = userInfo?._id === item.user._id;
            return (<ReviewCard {...item} isOwn={isOwn} />)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    paddingHorizontal: 15,
  backgroundColor:colors.secondaryOffWhite
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: colors.tertiary,
      },
      image: {
        width: "100%",
        height: "100%",
      },
      listContainer:{
        flex: 1,
        paddingHorizontal: 15,
      }
})