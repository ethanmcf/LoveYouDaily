import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  Animated,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../common/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainLogo from "./Logo/MainLogo";
import dbManager from "../management/database-manager";
import { AppContext } from "../management/globals";

function SideMenu({ setShow }) {
  const { signing, successful } = useContext(AppContext);
  const [isSigned, setIsSigned] = signing;
  const slideViewAnimationValue = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animated.timing(slideViewAnimationValue, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }).start();
  });
  const closeAnimation = () => {
    Animated.timing(slideViewAnimationValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShow(false);
    });
  };
  const handleDelete = () => {
    Alert.alert(
      "Whoa, there!",
      "Once you delete your account, all data will be removed and there's no getting it back. Make sure you want to do this.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => [
            dbManager.removeCurrentCreatorAccount().then((error) => {
              Alert.alert(
                error == null ? "Good bye!" : "Error",
                error == null
                  ? "Sorry to see you leaving!"
                  : "There was an error deleting your account, please try again later."
              );
            }),
            setIsSigned(false),
            dbManager.logOutCurrentUser(),
          ],
        },
      ]
    );
  };
  const handleSignOut = () => {
    dbManager.logOutCurrentUser();
    setIsSigned(false);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "white",
      right: 0,
      transform: [{ translateX: slideViewAnimationValue }],
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingLeft: 10,
    },
    buttonContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
      height: "90%",
      alignItems: "flex-start",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    logo: {
      right: 15,
      transform: [{ scale: 0.6 }],
      alignSelf: "center",
    },
  });
  return (
    <Animated.View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
          <Text style={{ color: colors.darkRed, paddingRight: 10 }}>
            Delete Account
          </Text>
          <Ionicons name="trash-outline" color={colors.darkRed} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
          <Text style={{ color: "grey", paddingRight: 10 }}>Signout</Text>
          <Ionicons
            name="log-out-outline"
            color="grey"
            size={20}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => closeAnimation()}
        >
          <Text style={{ paddingRight: 3 }}>Close</Text>
          <Ionicons name="arrow-forward" color="rgb(70,70,70)" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 2,
          height: "90%",
          backgroundColor: colors.grey,
          position: "absolute",
          left: "45%",
          bottom: "8%",
          opacity: 0.35,
        }}
      />
      <View style={styles.logo}>
        <MainLogo />
      </View>
    </Animated.View>
  );
}

export default SideMenu;
