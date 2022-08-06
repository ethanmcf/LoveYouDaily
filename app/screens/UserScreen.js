import { useState, useRef } from "react";
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

import BaseGift from "../components/Gifts/BaseGift";
import GiftSection from "../components/UserPage/GiftSection";

function UserScreen({ navigation }) {
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
    signOutText: {
      color: "grey",
    },
    specialButton:{
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      width:"47%",
      backgroundColor: "white",
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.2,

      borderRadius: 15,
      shadowRadius: 5,
      elevation: 2,
    },
    buttonContainer: {
      marginLeft: 30,
      marginRight: 30,
      justifyContent:"space-between",
      alignItems:"center",
      height: 40,
      bottom: 30,
      flexDirection: "row",
    },
    signOutText: {
      opacity: 0.7,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <GiftSection navigation={navigation} />

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.signOutButton, styles.specialButton]}
        onPress={() => navigation.navigate("Sign In")}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.signOutButton, styles.specialButton]}
      >
        <Text style={styles.signOutText}>Instructions</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserScreen;
