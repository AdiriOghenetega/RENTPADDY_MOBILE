import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import CustomHeader from "../../customComponents/customHeader";
import React, { useState } from "react";
import colors from "../../configs/colors";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import PropertyCardSaved from "../../components/propertyComponents/propertyCardSaved";
import { useGetSavedPropertiesQuery } from "../../features/properties/propertiesApiSlice";

export default function Saved({ navigation, route }) {

  const userInfo = useSelector(selectCurrentUser);

  const routeName = route?.params?.routeName

  const { data: savedProperties, isLoading } = useGetSavedPropertiesQuery()
  
  const [liked, setLiked] = useState(false);

  const rightHeader = {
    exists:true,
    component:<View style={styles.imageContainer}>
  <Image source={{uri:userInfo?.avatar?.url}} style={styles.image} />
    </View>
  }

  const handleGoBack = () => {
    navigation.navigate(routeName || "Home");
  };

  if (!savedProperties || isLoading) {
    return <ActivityIndicator color={colors.primary} size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Saved"}
        isNavigate={true}
        handleNavigate={handleGoBack}
        rightHeader={rightHeader}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          data={savedProperties}
          renderItem={({ item }) => (
            <PropertyCardSaved
              {...item}
              navigation={navigation}
              routeName={route?.name}
              saved={true}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
  },
  flatListContainer: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow:"hidden",
    backgroundColor: colors.tertiary
  },
  image:{
    width: "100%",
    height: "100%",
  },
});
