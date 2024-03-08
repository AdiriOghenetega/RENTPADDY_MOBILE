import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../configs/colors";

const { height, width } = Dimensions.get("window");

export default function MyTabBar({ state, descriptors, navigation }) {
  const myBars = state?.routes.filter(
    (route) =>
      route.name.toLowerCase() === "home" ||
      route.name.toLowerCase() === "search" ||
      route.name.toLowerCase() === "message" ||
      route.name.toLowerCase() === "profile"
  );

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display === "none") {
    return null;
  }

  return (
    <View style={styles.parentContainer}>
      {myBars.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.tabContainer}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isFocused ? colors.tertiary : "transparent",
                },
              ]}
            >
              <View>
                {(route.name === "Home" && (
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    color={isFocused ? colors.secondary : colors.gray}
                    size={22}
                  />
                )) ||
                  (route.name === "Search" && (
                    <MaterialCommunityIcons
                      name={
                        isFocused ? "feature-search" : "feature-search-outline"
                      }
                      color={isFocused ? colors.secondary : colors.gray}
                      size={22}
                    />
                  )) ||
                  (route.name === "Message" && (
                    <Ionicons
                      name={
                        isFocused
                          ? "chatbox-ellipses-sharp"
                          : "chatbox-ellipses-outline"
                      }
                      color={isFocused ? colors.secondary : colors.gray}
                      size={22}
                    />
                  )) ||
                  (route.name === "Profile" && (
                    <MaterialCommunityIcons
                      name={isFocused ? "account" : "account-outline"}
                      color={isFocused ? colors.secondary : colors.gray}
                      size={22}
                    />
                  ))}
              </View>
              {isFocused && (
                <Text
                  style={{
                    color: isFocused ? colors.secondary : colors.gray,
                    fontSize: 13,
                  }}
                >
                  {label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row",
    width: width * 0.95,
    alignSelf: "center",
  },
  tabContainer: {
    flex: 1,
    height: 90,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 23,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
