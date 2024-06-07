import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import colors from "../../configs/colors";
import CustomHeader from "../../customComponents/customHeader";
import MyPropertyCard from "../../components/propertyComponents/myPropertyCard";
import { mockProperties } from "../../data/mockData";
import CustomButton from "../../customComponents/CustomButton";
import UploadPropertyForm from "../../components/propertyComponents/uploadPropertyForm";
import { useGetOwnPropertiesQuery } from "../../features/properties/propertiesApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function MyProperties({ navigation, route }) {
  const userInfo = useSelector(selectCurrentUser);

  const { data: ownProperties, isLoading } = useGetOwnPropertiesQuery(
    userInfo?._id
  );

  const [isEdit, setIsEdit] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = () => {
    navigation.navigate("Profile");
  };

  const handleEditTrue = (propertyId) => {
    setIsEdit(true);
    setEditPropertyId(propertyId);
    handleToogleModal();
  };

  const handleEditFalse = () => {
    setIsEdit(false);
    setEditPropertyId("");
  };

  const handleToogleModal = () => {
    setShowModal((prev) => !prev);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showModal} animationType="fade">
        <UploadPropertyForm
          handleToogleModal={handleToogleModal}
          isEdit={isEdit}
          editPropertyId={editPropertyId}
          handleEditFalse={handleEditFalse}
        />
      </Modal>
      <CustomHeader
        isNavigate={true}
        title={"My Properties"}
        handleNavigate={handleNavigate}
        handleNotificationNavigate={() =>
          navigation.navigate("Notification", { routeName: route?.name })
        }
      />
      {mockProperties?.length > 0 ? (
        <View style={styles.subContainer}>
          <View style={styles.propertyFlatListContainer}>
            <FlatList
              data={ownProperties}
              renderItem={({ item }) => (
                <MyPropertyCard
                  {...item}
                  handleEditTrue={handleEditTrue}
                />
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <CustomButton
            buttonLabel={"Add Property"}
            onPress={handleToogleModal}
            customStyle={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <View style={styles.empytProperties}>
          <Text style={styles.emptyText}>
            You currently don't have any properties.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryOffWhite,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  propertyFlatListContainer: {
    flex: 1,
  },
  empytProperties: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray,
  },
});
