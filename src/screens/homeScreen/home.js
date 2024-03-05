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
} from "react-native";
import React from "react";
import CustomHeader from "../../customComponents/customHeader";
import { Entypo } from "@expo/vector-icons";
import colors from "../../configs/colors";
import CustomSearchInput from "../../customComponents/customSearchInput";
import PropertyCardFeatured from "../../components/propertyComponents/propertyCardFeatured";
import PropertyCardTop from "../../components/propertyComponents/propertyCardTop";
import { mockProperties } from "../../data/mockData";

const { width, height } = Dimensions.get("window");

export default function Home({ navigation }) {
  const leftHeader = {
    exists: true,
    component: (
      <TouchableOpacity
        style={styles.gridContainer}
        onPress={() => navigation.navigate("Saved")}
      >
        <Entypo name="grid" size={34} color={colors.secondary} />
      </TouchableOpacity>
    ),
  };

  const handleNotificationNavigate = () => {
    navigation.navigate("Notification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftHeader={leftHeader}
        isNavigate={false}
        handleNotificationNavigate={handleNotificationNavigate}
      />

      <View style={styles.propertiesContainer}>
        <View style={styles.featuredProperties}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.featuredPropertiesHeader}>
              <Text style={styles.featuredTitle}>Featured Units</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>see all</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.featuredFlatlistContainer}>
            <FlatList
              data={mockProperties}
              renderItem={({ item }) => (
                <PropertyCardFeatured
                title={item.title}
                  img={item.images[0]}
                  images={item.images}
                  price={item.price}
                  city={item.city}
                  state={item.state}
                  country={item.country}
                  reviews={item.reviews}
                  rating={item.rating}
                  address={item.address}
                  description={item.description}
                  owner={item.owner}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item?.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={styles.featuredProperties}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.featuredPropertiesHeader}>
              <Text style={styles.featuredTitle}>Top Units</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>see all</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.featuredFlatlistContainer}>
            <FlatList
              data={mockProperties}
              renderItem={({ item }) => (
                <PropertyCardTop
                title={item.title}
                img={item.images[0]}
                images={item.images}
                price={item.price}
                city={item.city}
                state={item.state}
                country={item.country}
                reviews={item.reviews}
                rating={item.rating}
                address={item.address}
                description={item.description}
                owner={item.owner}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item?.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
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
    backgroundColor: colors.secondaryOffWhite,
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
  propertiesContainer: {
    justifyContent: "space-around",
    flex: 1,
  },
});
