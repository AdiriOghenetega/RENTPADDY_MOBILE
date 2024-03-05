import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../configs/colors";
import { Entypo } from "@expo/vector-icons";

const GlassmorphicInput = ({
  placeholder,
  value,
  onChangeText,
  isPassword,
  isMultiline,
  customStyle,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const hide = <Entypo name="eye" size={18} color="black" />;
  const show = <Entypo name="eye-with-line" size={18} color="black" />;

  const renderShowHideButton = () => {
    if (isPassword) {
      return (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.hideText}>{showPassword ? hide : show}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[styles.textInput, customStyle]}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        multiline={isMultiline}
        keyboardType={keyboardType}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={{ marginLeft: -50 }}
      >
        {renderShowHideButton()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 128, 255, 0.3)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
    fontSize: 14,
    fontFamily: "RalewayMedium",
    color: colors.black,
    width: "100%",
  },

  hideText: {
    color: colors.blueFaded,
    marginHorizontal: 10,
  },
});

export default GlassmorphicInput;
