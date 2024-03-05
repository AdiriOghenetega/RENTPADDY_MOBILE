import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/authScreen/loginScreen";
import RegisterScreen from "../screens/authScreen/registerScreen";
import ForgotPassword from "../screens/authScreen/ForgotPassword";
import OtpScreen from "../screens/authScreen/OtpScreen";
import ResetPassword from "../screens/authScreen/ResetPassword";
import Profile from "../screens/profileScreen/profile";
import Home from "../screens/homeScreen/home";
import Search from "../screens/propertyScreen/search";
import Saved from "../screens/propertyScreen/saved";
import Chat from "../screens/chatScreen/chat";
import MyTabBar from "./TabBar";
import colors from "../configs/colors";
import Notification from "../screens/notificationScreen/notification";
import PropertyDetails from "../screens/propertyScreen/propertyDetails";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
        }}
        component={Search}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerShown: false,
        }}
        component={Chat}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
      <Tab.Screen
        name="Saved"
        options={{
          headerShown: false,
        }}
        component={Saved}
      />
      <Tab.Screen
        name="Notification"
        options={{
          headerShown: false,
        }}
        component={Notification}
      />
      <Tab.Screen
        name="PropertyDetails"
        options={{
          headerShown: false,
        }}
        component={PropertyDetails}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
