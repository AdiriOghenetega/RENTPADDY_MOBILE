import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../customComponents/customHeader";
import CustomButton from "../../customComponents/CustomButton";
import GlassmorphicInput from "../../customComponents/GlassmorphicInput";
import colors from "../../configs/colors";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { globalStyles } from "../../styles/globalStyles";
import CustomHr from "../../customComponents/CustomHr";
import {
  useUploadPropertyMutation,
  useUpdatePropertyMutation,
  useGetPropertyQuery,
} from "../../features/properties/propertiesApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function UploadPropertyForm({
  handleToogleModal,
  isEdit,
  editPropertyId,
  handleEditFalse,
}) {
  const userInfo = useSelector(selectCurrentUser);

  const [uploadProperty, { isLoading: uploading }] =
    useUploadPropertyMutation();
  const [updateProperty, { isLoading: updating }] = useUpdatePropertyMutation();
  const { data: propertyToEdit } = useGetPropertyQuery(editPropertyId);


  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    frequency: "",
    paymentDuration: "",
    avaliability: false,
    images: [],
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const leaseFrequencyOptions = ["daily", "weekly", "monthly", "yearly"];

  useEffect(() => {
    if (isEdit && propertyToEdit) {
      const {
        title,
        description,
        price,
        address,
        city,
        state,
        country,
        geolocation:{latitude,longitude},
        type,
        bedrooms,
        bathrooms,
        frequency,
        paymentDuration,
        avaliability,
      } = propertyToEdit;

      setUploadData({
        title,
        description,
        price:price?.toString(),
        address,
        city,
        state,
        country,
        latitude,
        longitude,
        type,
        bedrooms:bedrooms?.toString(),
        bathrooms:bathrooms?.toString(),
        frequency,
        paymentDuration,
        avaliability,
        images:[],
      });
    }

  }, [propertyToEdit]);

  const pickImage = async (id) => {
    try {
      // No permissions request is necessary for launching the image library

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          aspect: [4, 3],
          quality: 0.5,
        });

        if (!result.canceled) {
          result?.assets?.map((asset) => {
            setUploadData((prev) => {
              return {
                ...prev,
                images: [...prev.images, asset.uri],
              };
            });
          });
        }
      }
    } catch (error) {
      console.log(error, "unable to upload image");
      toast("Unable to upload image,try again");
    }
  };

  const handleImageDelete = (image) => {
    setUploadData((prev) => {
      return {
        ...prev,
        images: prev.images.filter((img) => img !== image),
      };
    });
  };

  const handleNavigate = () => {
    handleEditFalse();
    handleToogleModal();
  };

  const handleUseCurrentLocation = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUploadData((prev) => {
      return {
        ...prev,
        longitude: location.coords.longitude.toString(),
        latitude: location.coords.latitude.toString(),
      };
    });
    setLocationLoading(false);
  };

  const handleUpload = async () => {
    const {
      title,
      description,
      price,
      address,
      city,
      state,
      country,
      latitude,
      longitude,
      type,
      bedrooms,
      bathrooms,
      frequency,
      paymentDuration,
      avaliability,
      images,
    } = uploadData;

    if (
      (!title ||
        !description ||
        !price ||
        !address ||
        !city ||
        !state ||
        !country ||
        !latitude ||
        !longitude ||
        !type ||
        !bedrooms ||
        !bathrooms ||
        !frequency ||
        !paymentDuration) &&
      !isEdit
    ) {
      alert("Please fill all required fields");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("address", address);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("country", country);
    formdata.append("latitude", latitude);
    formdata.append("longitude", longitude);
    formdata.append("type", type);
    formdata.append("bedrooms", bedrooms);
    formdata.append("bathrooms", bathrooms);
    formdata.append("frequency", frequency);
    formdata.append("paymentDuration", paymentDuration);
    formdata.append("avaliability", avaliability);
    isEdit && formdata.append("propertyId", editPropertyId);
    if (images?.length > 0) {
      for (let i = 0; i < images?.length; i++) {
        formdata.append("images", {
          name: new Date() + "_image" + i,
          uri: images[i],
          type: "image/jpg",
        });
      }
    }

    if (isEdit) {
      try {
        const res = await updateProperty({
          userId: userInfo?._id,
          formdata,
        }).unwrap();
       
        if(res?._id){
          handleToogleModal()
          handleEditFalse()
        }else{
          alert(res?.message || "Property update failed, try again")
        }
      } catch (err) {
        alert("Network Error, please try again");
        console.log(err);
      }
    } else {
      try {
        const res = await uploadProperty({
          userId: userInfo?._id,
          formdata,
        }).unwrap();
      
        if(res?._id){
          handleToogleModal()
          handleEditFalse()
        }else{
          alert(res?.message || "Property upload failed, try again")
        }
      } catch (err) {
        alert("Network Error, please try again");
        console.log(err, "err");
      }
    }
  };

  const rightHeader = {
    exists: true,
    component: <View style={styles.rightHeader}></View>,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title={"Upload Property"}
          handleNavigate={handleNavigate}
          isNavigate={true}
          rightHeader={rightHeader}
        />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <GlassmorphicInput
              placeholder={
                "Property Title e.g Spacious Flat in serviced estate etc."
              }
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    title: text,
                  };
                });
              }}
              value={uploadData.title}
            />
            <GlassmorphicInput
              placeholder={"Property Description"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    description: text,
                  };
                });
              }}
              value={uploadData.description}
              isMultiline={true}
              customStyle={styles.descInputStyle}
            />

            <GlassmorphicInput
              keyboardType="numeric"
              placeholder={"Price (NGN)"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    price: text,
                  };
                });
              }}
              value={uploadData.price}
            />

            <GlassmorphicInput
              placeholder={"Address"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    address: text,
                  };
                });
              }}
              value={uploadData.address}
            />

            <GlassmorphicInput
              placeholder={"City"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    city: text,
                  };
                });
              }}
              value={uploadData.city}
            />
            <GlassmorphicInput
              placeholder={"State"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    state: text,
                  };
                });
              }}
              value={uploadData.state}
            />
            <GlassmorphicInput
              placeholder={"Country"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    country: text,
                  };
                });
              }}
              value={uploadData.country}
            />
            <View style={styles.geolocationContainer}>
              <View style={styles.geoSubConatiner}>
                <Text style={styles.imageText}>Add Geolocation</Text>
                <Text style={[styles.geoX, { marginBottom: 0 }]}>
                  (optional but recommended)
                </Text>
              </View>
              <Text style={styles.geoX}>
                Adding geolocation of property will help prospective tenants
                locate it with ease
              </Text>
              <View>
                <GlassmorphicInput
                  placeholder={"Latitude"}
                  onChangeText={(text) => {
                    setUploadData((prev) => {
                      return {
                        ...prev,
                        latitude: text,
                      };
                    });
                  }}
                  value={uploadData.latitude}
                />
                <GlassmorphicInput
                  placeholder={"Longitude"}
                  onChangeText={(text) => {
                    setUploadData((prev) => {
                      return {
                        ...prev,
                        longitude: text,
                      };
                    });
                  }}
                  value={uploadData.longitude}
                />
              </View>
              <CustomHr middleText="or" />
              {locationLoading ? (
                <ActivityIndicator
                  size={"small"}
                  color={colors.primary}
                  style={{ marginVertical: 10 }}
                />
              ) : (
                <CustomButton
                  buttonLabel={"Use My Current Location"}
                  onPress={handleUseCurrentLocation}
                />
              )}
            </View>
            <GlassmorphicInput
              placeholder={"Property Type e.g Duplex, Flat etc"}
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    type: text,
                  };
                });
              }}
              value={uploadData?.type}
            />
            <GlassmorphicInput
              placeholder={"How many Bedrooms?"}
              keyboardType="numeric"
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    bedrooms: text,
                  };
                });
              }}
              value={uploadData?.bedrooms}
            />
            <GlassmorphicInput
              placeholder={"How many Bathrooms?"}
              keyboardType="numeric"
              onChangeText={(text) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    bathrooms: text,
                  };
                });
              }}
              value={uploadData?.bathrooms}
            />
            <SelectDropdown
              data={leaseFrequencyOptions}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropDownButton}>
                    {selectedItem ? (
                      <Text style={styles.defaultButtonText}>
                        {selectedItem}
                      </Text>
                    ) : (
                      <Text style={styles.defaultButtonText}>
                        Select Lease Frequency e.g Monthly, Quarterly etc
                      </Text>
                    )}
                    <MaterialIcons
                      name={isOpened ? "arrow-drop-up" : "arrow-drop-down"}
                      size={24}
                      color="black"
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropDownButtonText,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={styles.dropDownRowText}>{item}</Text>
                  </View>
                );
              }}
              onSelect={(selectedItem, index) => {
                setUploadData((prev) => {
                  return {
                    ...prev,
                    frequency: selectedItem,
                  };
                });
              }}
            />
            {uploadData?.frequency && (
              <GlassmorphicInput
                placeholder={
                  "How many" +
                  " " +
                  uploadData?.frequency +
                  " " +
                  "payments required at a time?"
                }
                keyboardType="numeric"
                onChangeText={(text) => {
                  setUploadData((prev) => {
                    return {
                      ...prev,
                      paymentDuration: text,
                    };
                  });
                }}
                value={uploadData?.paymentDuration}
              />
            )}

            <View style={styles.optionCTA}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>
                  Turn On/Off Property Availability
                </Text>
                <Text style={styles.optionText2}>
                  (is property currently open to rent?)
                </Text>
              </View>
              <View style={styles.switchTransform}>
                <Switch
                  trackColor={{
                    false: "#767577",
                    true: colors.secondaryOffWhite,
                  }}
                  thumbColor={
                    uploadData?.avaliability ? colors.primary : "#f4f4f4"
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    setUploadData((prev) => {
                      return {
                        ...prev,
                        avaliability: !prev.avaliability,
                      };
                    });
                  }}
                  value={uploadData?.avaliability}
                />
              </View>
            </View>

            <View style={styles.imageContainer}>
              <Text style={styles.imageText}>Add Images</Text>
              <View style={styles.imageRow}>
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={() => pickImage()}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={44}
                    color={colors.white}
                  />
                  <Text style={styles.imageText2}>Add Image</Text>
                </TouchableOpacity>
                <View style={styles.imagesWrapper}>
                  <ScrollView horizontal={true}>
                    {uploadData?.images?.length > 0 &&
                      uploadData?.images?.map((image, index) => {
                        return (
                          <View style={styles.imageSubContainer} key={index}>
                            <Image
                              style={styles.image}
                              source={{ uri: image }}
                            />
                            <Feather
                              name="x-circle"
                              size={24}
                              color={colors.white}
                              style={styles.imageDelete}
                              onPress={() => handleImageDelete(image)}
                            />
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            </View>
            {uploading || updating ? (
              <View style={{ marginVertical: 15 }}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : (
              <CustomButton
                buttonLabel={isEdit ? "Edit" : "Upload"}
                onPress={handleUpload}
                customStyle={styles.uploadButton}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: colors.secondaryOffWhite,
  },
  descInputStyle: {
    height: 150,
  },
  imageContainer: {},
  imageText: {
    fontSize: 17,
    fontWeight: "bold",
    margin: 10,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
  },
  imagesWrapper: {
    flex: 1,
    flexDirection: "row",
    overflow: "scroll",
  },
  imageBox: {
    width: 113,
    height: 138,
    backgroundColor: colors.lightgray,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 2,
    position: "relative",
  },
  imageText2: {
    color: colors.white,
  },
  imageSubContainer: {
    width: 113,
    height: 138,
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageDelete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  uploadButton: {
    marginVertical: 15,
  },
  dateText: {
    alignSelf: "center",
    marginVertical: 2,
  },
  emptyCategory: {
    marginBottom: 10,
  },
  label: {},
  geoX: {
    fontSize: 12,
    color: colors.gray,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  geoSubConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  alt: {
    fontSize: 16,
    color: colors.gray,
    alignSelf: "center",
    marginBottom: 10,
  },
  geolocationContainer: {
    marginBottom: 20,
  },
  dropDownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lightgray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  defaultButtonText: {
    fontSize: 14,
    color: colors.primary,
  },
  dropDownButtonText: {
    padding: 10,
  },
  dropDownRowText: {
    color: colors.gray,
    fontSize: 14,
  },
  rightHeader: {
    width: 50,
    height: 50,
  },
  optionCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 2,
    padding: 5,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  optionText2: {
    fontSize: 10,
    color: colors.gray,
  },
  switchTransform: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
