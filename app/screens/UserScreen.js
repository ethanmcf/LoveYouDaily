import { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import { AndroidSafeAreaStyle, colors } from "../common/styles";
import SmallLogo from "../components/Logo/SmallLogo";
import { Ionicons } from "@expo/vector-icons";
import {firebase as auth} from "@react-native-firebase/auth"
import BaseGift from "../components/Gifts/BaseGift";
import GiftSection from "../components/UserPage/GiftSection";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { AppContext } from "../management/globals";
import React from 'react'
function UserScreen({ navigation }) {
  // const [isSigned, setIsSigned] = useContext(AppContext)

  const styles = StyleSheet.create({
    background: {
      position: "absolute",
      top: -100,
      left: 0,
      width: "100%",
      height: "150%",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      opacity: 0.4,
      transform: [
        {
          scale: 0.6,
        },
      ],
    },
    settings: {
      left: 20,
    },
    header: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    signOut: {
      position: "absolute",
      bottom: 30,
      alignSelf: "center",
    },
  
    specialButton:{

      alignItems: "center",
      justifyContent: "center",
      height: 40,
      paddingLeft: 40,
      paddingRight: 25,
      backgroundColor: "white",
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.2,
      flexDirection: "row",

      borderRadius: 15,
      shadowRadius: 5,
      elevation: 2,
    },
    buttonContainer: {
      marginLeft: 30,
      marginRight: 30,
      justifyContent:"center",
      alignItems:"center",
      height: 40,
      bottom: 30,
      flexDirection: "row",
    },
    signOutText: {
      opacity: 0.7,
      marginLeft: 5 
    },
  });

  return (
    <View style={{ flex: 1, justifyContent:'center' }}>
      {/* <GiftSection navigation={navigation} /> */}
      <Text>Ethan</Text>
    </View>
  );
}

export default UserScreen;
