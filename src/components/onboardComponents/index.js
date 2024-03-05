import React from "react";
import {
  StatusBar,
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Button,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../customComponents/CustomButton";
import colors from "../../configs/colors";
import { data } from "../../data/onboard";

const { width, height } = Dimensions.get("window");

const Onboard = ({ handleDone }) => {
  const renderDoneButton = () => (
    <CustomButton
      buttonLabel={"Get Started"}
      customStyle={styles.nextButton}
      customLabelStyle={styles.nextLabel}
      onPress={handleDone}
    />
  );

  const renderNextButton = () => (
    <CustomButton
      buttonLabel={"Next"}
      customStyle={styles.nextButton}
      customLabelStyle={styles.nextLabel}
      onPress={renderNextButton}
    />
  );

  const keyExtractor = (item) => item.title;

  const renderItem = ({ item }) => (
    <View style={styles.slides}>
      <View style={styles.introTextBox}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.imageBox}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        renderDoneButton={renderDoneButton}
        showNextButton={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        onDone={handleDone}
        bottomButton={true}
        showSkipButton={true}
        onSkip={handleDone}
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    width: width,
  },
  slides: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  imageBox: {
    width: width,
    height: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  introTextBox: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontFamily: "RalewayBold",
    color: colors.primary,
  },
  text: {
    color: colors.gray,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "RalewayMedium",
  },
  textContainer: {},
  nextButton: {
    backgroundColor: colors.white,
  },
  nextLabel: {
    color: colors.black,
  },
  dotStyle: {
    backgroundColor: colors.secondary,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    width: "7%",
  },
  arrow: {
    // marginRight: 55
  },
};

export default Onboard;
