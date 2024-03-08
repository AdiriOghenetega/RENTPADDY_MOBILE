import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import CustomHeader from "../../customComponents/customHeader";
import React, { useState } from "react";
import { Octicons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors";
import { globalStyles } from "../../styles/globalStyles";
import { mockProperties } from "../../data/mockData";
import PropertyCardSaved from "../../components/propertyComponents/propertyCardSaved";

export default function Saved({ navigation, route }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Saved"}
        isNavigate={true}
        handleNavigate={handleGoBack}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          data={mockProperties}
          renderItem={({ item }) => (
            <PropertyCardSaved
              {...item}
              navigation={navigation}
              routeName={route?.name}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
  flatListContainer: {
    flex: 1,
    marginBottom: 15,
  },
});
