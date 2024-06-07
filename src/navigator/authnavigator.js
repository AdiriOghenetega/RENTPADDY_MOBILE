import React, { useEffect, useRef,useState } from "react";
import { Platform, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./appNavigator";
import Onboard from "../screens/onboardScreen";
import LoginScreen from "../screens/authScreen/loginScreen";
import RegisterScreen from "../screens/authScreen/registerScreen";
import ForgotPassword from "../screens/authScreen/ForgotPassword";
import OtpScreen from "../screens/authScreen/OtpScreen";
import ResetPassword from "../screens/authScreen/ResetPassword";
import {useSelector,useDispatch} from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { pushTokenRedux,updateIdentifierRedux } from "../features/notification/notificationSlice";
import { secureGetItemAsync } from "../utils/expoSecure";
import { setCredentials } from "../features/auth/authSlice";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AuthNavigator = () => {
  const notificationListener = useRef();
  const responseListener = useRef();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectCurrentUser);
    console.log(userInfo);
    const [secureStore,setSecureStore] = useState(null)


      //push notification
  useEffect(() => {
    try {
      registerForPushNotificationsAsync().then((token) => {
        console.log(token);
        dispatch(pushTokenRedux(token));
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification)
          dispatch(updateIdentifierRedux(notification.request.identifier));
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
         
        });
    } catch (error) {
      console.log(error);
    }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    useEffect(()=>{
      (async()=>{
        const user = await secureGetItemAsync("user")
      
      if(user && !userInfo?._id){
        setSecureStore(user)
      }
      })()
    },[userInfo])

    useEffect(() => {
      if(secureStore && !userInfo?._id){
        dispatch(setCredentials(secureStore));
      }
    }, [secureStore]);

    //request push notification token
  async function registerForPushNotificationsAsync() {
    let token;

    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants?.expoConfig?.extra?.eas?.projectId,
          })
        ).data;
        // console.log(token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      return token;
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
      <Stack.Navigator
        initialRouteName={userInfo?._id ? "MyTabs" : "Onboard"}
      >
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  
  export default AuthNavigator;