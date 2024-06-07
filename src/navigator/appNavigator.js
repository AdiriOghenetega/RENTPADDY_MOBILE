import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/profileScreen/profile";
import Home from "../screens/homeScreen/home";
import Search from "../screens/propertyScreen/search";
import Saved from "../screens/propertyScreen/saved";
import Chat from "../screens/chatScreen/chat";
import MyTabBar from "./TabBar";
import colors from "../configs/colors";
import Notification from "../screens/notificationScreen/notification";
import PropertyDetails from "../screens/propertyScreen/propertyDetails";
import Settings from "../screens/profileScreen/settings";
import EditProfile from "../screens/profileScreen/editProfile";
import BookHistory from "../screens/profileScreen/bookHistory";
import Security from "../screens/profileScreen/security";
import Support from "../screens/profileScreen/support";
import HelpCenter from "../screens/profileScreen/helpCenter";
import TermsAndConditions from "../screens/profileScreen/termsAndConditions";
import AboutUs from "../screens/profileScreen/aboutUs";
import Reviews from "../screens/propertyScreen/reviews";
import Faq from "../screens/profileScreen/faq";
import FeaturedUnits from "../screens/propertyScreen/featuredUnits";
import MyProperties from "../screens/profileScreen/myProperties";
import MyBookedList from "../screens/profileScreen/myBookedList";
import BookedPropertyDetails from "../screens/propertyScreen/bookedPropertyDetails";
import ReviewList from "../screens/profileScreen/reviewList";


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Message"
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
        name="EditProfile"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={EditProfile}
      />
      <Tab.Screen
        name="Security"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={Security}
      />
      <Tab.Screen
        name="BookHistory"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={BookHistory}
      />
      <Tab.Screen
        name="MyBookedList"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={MyBookedList}
      />
      <Tab.Screen
        name="Saved"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={Saved}
      />
      <Tab.Screen
        name="FeaturedUnits"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={FeaturedUnits}
      />
      <Tab.Screen
        name="Notification"
        options={{
          headerShown: false,
        }}
        component={Notification}
      />
      <Tab.Screen
        name="Settings"
        options={{
          headerShown: false,
        }}
        component={Settings}
      />
      <Tab.Screen
        name="Support"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={Support}
      />
      <Tab.Screen
        name="HelpCenter"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={HelpCenter}
      />
      <Tab.Screen
        name="TermsAndConditions"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={TermsAndConditions}
      />
      <Tab.Screen
        name="AboutUs"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={AboutUs}
      />
      <Tab.Screen
        name="Reviews"
        options={{
          headerShown: false,
        }}
        component={Reviews}
      />
      <Tab.Screen
        name="ReviewList"
        options={{
          headerShown: false,
        }}
        component={ReviewList}
      />
      <Tab.Screen
        name="Faq"
        options={{
          headerShown: false,
        }}
        component={Faq}
      />
      <Tab.Screen
        name="PropertyDetails"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={PropertyDetails}
      />
      <Tab.Screen
        name="BookedPropertyDetails"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={BookedPropertyDetails}
      />
      <Tab.Screen
        name="MyProperties"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={MyProperties}
      />
      
    </Tab.Navigator>
  );
}
