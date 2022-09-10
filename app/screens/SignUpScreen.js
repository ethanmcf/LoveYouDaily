import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import UserSection from "../components/SigningPage/UserSection";
import CreaterSection from "../components/SigningPage/CreaterSection";
import LoginSwitch from "../components/SigningPage/LoginSwitch";
import { colors } from "../common/styles";

import MainLogo from "../components/Logo/MainLogo";
import { AppContext} from "../management/globals";

function SignUpScreen({ navigation }) {
  const [selectedSection, setSelectedSection] = useState("user");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [successSignIn, setSuccessSignIn] = useState(null);
  
  const { signing, successful } = useContext(AppContext)
  const [isSigned, setIsSigned] = signing;
  const [success, setSuccess] = successful;

  //Starts check animation is there is a successful sign up update
  useEffect(() => {
    if (isSuccessful) {
      setSuccess(true);
        setTimeout(() => {
          setIsSigned(!isSigned);
        }, 2000);
    }
  }, [isSuccessful]);

  //Sets section for sign up
  const section = () => {
    if (selectedSection == "user") {
      return (
        <UserSection
        setSuccessfulSignUp={setIsSuccessful}
        />
      );
    }

    return (
      <CreaterSection
        setSuccessfulSignUp={setIsSuccessful}
      />
    );
  };

  //Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    create: {
      bottom: 0,
    },
    logo: {
      position: "absolute",
      top: 100,
      width: 150,
      height: 150,
    },
    signInButton: {
      position: "absolute",
      bottom: 30,
    },
    pageInfo: {
      color: "grey",
      fontSize: 10,
      top: -15,
    },
    logo: {
      top: -40,
    },
  });

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <MainLogo />
        </View>

        <LoginSwitch setSection={setSelectedSection} />

        {section()}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.signInButton]}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
        {successSignIn}
      </View>
    </TouchableNativeFeedback>
  );
}
export default SignUpScreen;
