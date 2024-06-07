import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../customComponents/customHeader";
import { Entypo } from "@expo/vector-icons";
import colors from "../../configs/colors";
import PropertyCardFeatured from "../../components/propertyComponents/propertyCardFeatured";
import PropertyCardTop from "../../components/propertyComponents/propertyCardTop";
import {
  useGetFeaturedPropertiesQuery,
  useGetTopPropertiesQuery,
} from "../../features/properties/propertiesApiSlice";
import { globalStyles } from "../../styles/globalStyles";

const { width, height } = Dimensions.get("window");

export default function Home({ navigation, route }) {
  const {
    data: featuredProperties,
  } = useGetFeaturedPropertiesQuery();

  const {
    data: topRatedProperties,
  } = useGetTopPropertiesQuery();

  const leftHeader = {
    exists: true,
    component: (
      <TouchableOpacity
        style={styles.gridContainer}
        onPress={() => navigation.navigate("Saved", { routeName: route?.name })}
      >
        <Entypo name="grid" size={34} color={colors.secondary} />
      </TouchableOpacity>
    ),
  };

  const handleNotificationNavigate = () => {
    navigation.navigate("Notification", { routeName: route?.name });
  };


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftHeader={leftHeader}
        isNavigate={false}
        handleNotificationNavigate={handleNotificationNavigate}
      />

      <View style={styles.propertiesContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.featuredProperties}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.featuredPropertiesHeader}>
                <Text style={styles.featuredTitle}>Featured Units</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FeaturedUnits", { type: "Featured" })
                  }
                >
                  <Text style={styles.seeAllText}>see all</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.featuredFlatlistContainer}>
              {featuredProperties?.length > 0 ? (
                <FlatList
                  data={featuredProperties}
                  keyExtractor={(item) => item?._id}
                  renderItem={({ item }) => (
                    <PropertyCardFeatured
                      {...item}
                      img={item.images[0]}
                      navigation={navigation}
                      routeName={route?.name}
                    />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View style={globalStyles.noPropertiesContainer}>
                  <Text style={globalStyles.noPropertiesText}>
                    No featured properties found
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.featuredProperties}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.featuredPropertiesHeader}>
                <Text style={styles.featuredTitle}>Top Units</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FeaturedUnits", { type: "Top" })
                  }
                >
                  <Text style={styles.seeAllText}>see all</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.featuredFlatlistContainer}>
              {topRatedProperties?.length > 0 ? (
                <FlatList
                  data={topRatedProperties}
                  renderItem={({ item }) => (
                    <PropertyCardTop
                      {...item}
                      img={item.images[0]}
                      navigation={navigation}
                      routeName={route?.name}
                    />
                  )}
                  keyExtractor={(item) => item?._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View style={globalStyles.noPropertiesContainer}>
                  <Text style={globalStyles.noPropertiesText}>
                    No top rated properties found
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  propertiesContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  gridContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredProperties: {},
  featuredPropertiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  featuredTitle: {
    fontSize: 18,
    color: colors.secondary,
    fontFamily: "RalewaySemiBold",
  },
  featuredFlatlistContainer: {
    width: width - 30,
  },
  seeAllText: {
    textTransform: "capitalize",
    color: colors.gray,
  },
 
});
