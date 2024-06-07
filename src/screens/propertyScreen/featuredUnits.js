import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../customComponents/customHeader";
import {
  useGetFeaturedPropertiesQuery,
  useGetTopPropertiesQuery,
} from "../../features/properties/propertiesApiSlice";
import PropertyCardSaved from "../../components/propertyComponents/propertyCardSaved";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function FeaturedUnits({ navigation, route }) {
  const userInfo = useSelector(selectCurrentUser);

  const { data: featuredProperties, isLoading } =
    useGetFeaturedPropertiesQuery();
  const { data: topRatedProperties, isLoading: ratedIsLoading } =
    useGetTopPropertiesQuery();

  const type = route?.params?.type;

  const [listType, setListType] = useState("");

  useEffect(() => {
    if (type) {
      setListType(type);
    }
  }, [type]);

  const handleNavigate = () => {
    navigation.navigate("Home");
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

  const data =
    listType === "Featured" ? featuredProperties : topRatedProperties;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={listType + " Units"}
        isNavigate={true}
        rightHeader={rightHeader}
        handleNavigate={handleNavigate}
      />
      <View style={styles.flatListContainer}>
        {data ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PropertyCardSaved
                {...item}
                navigation={navigation}
                routeName={route?.name}
                saved={false}
              />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={globalStyles.noPropertiesContainer}>
            <Text style={globalStyles.noPropertiesText}>
              No {type} properties found
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
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
  flatListContainer: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
