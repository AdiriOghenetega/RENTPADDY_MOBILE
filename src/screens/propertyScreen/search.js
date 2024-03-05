import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import CustomHeader from "../../customComponents/customHeader";
import CustomSearchInput from "../../customComponents/customSearchInput";
import colors from "../../configs/colors";
import { mockProperties } from "../../data/mockData";
import PropertyCardSearch from "../../components/propertyComponents/propertyCardSearch";
import Filter from "../../components/propertyComponents/filter";
import { getMaxPrice } from "../../utils/maxPrice";

export default function Search({ navigation }) {
  const modalizeRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredProperties, setFilteredProperties] = useState([]);
  const maxPriceRange = getMaxPrice(mockProperties);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  const handleNotificationNavigate = () => {
    navigation.navigate("Notification");
  };

  const onChangeText = (value) => {
    setSearchTerm(value);
  };

  const handleSearch = () => {
    const searchedProperties = mockProperties.filter((property) => {
      return (
        property.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        property.description
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        property.state?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        property.country?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        property.address?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });

    if (searchedProperties) {
      setFilteredProperties(searchedProperties);
    } else {
      setFilteredProperties(mockProperties);
    }
  };

  const handleFilterSearchTerm = (filter) => {
    const filteredProperties = mockProperties.filter((property) => {
      if (
        filter.selectedPropertyType &&
        property.type !== filter.selectedPropertyType
      )
        return false;
      if (
        filter.maxPricedRange &&
        parseFloat(property.price) > parseFloat(filter.maxPricedRange)
      )
        return false;
      return true;
    });

    filter.selectedPropertyType && setSearchTerm(filter?.selectedPropertyType);
    setFilteredProperties(filteredProperties);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Search"}
        handleNavigate={handleNavigate}
        handleNotificationNavigate={handleNotificationNavigate}
        isNavigate={true}
      />
      <CustomSearchInput
        placeholder={"Search"}
        onChangeText={onChangeText}
        handleSearch={handleSearch}
        handleFilter={onOpen}
        value={searchTerm}
      />
      {FilteredProperties?.length > 0 ? (
        <View>
          <View style={styles.searchPropertiesHeader}>
            <Text style={styles.searchTitle}>
              Results for "{searchTerm === "" ? "All" : searchTerm}"
            </Text>
            <View>
              <Text style={styles.resultsFoundText}>
                {FilteredProperties?.length} Results Found
              </Text>
            </View>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={FilteredProperties}
              renderItem={({ item }) => (
                <PropertyCardSearch
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
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              No properties found for your search parameters
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <Portal>
        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
          <Filter
            onClose={onClose}
            handleFilterSearchTerm={handleFilterSearchTerm}
            maxPriceRange={maxPriceRange}
          />
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondaryOffWhite,
  },
  searchPropertiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  searchTitle: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "RalewaySemiBold",
  },
  resultsFoundText: {
    color: colors.gray,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
  },
});
