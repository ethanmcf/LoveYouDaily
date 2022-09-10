import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useContext } from "react";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import { AppContext } from "../management/globals";
import { colors } from "../common/styles";
import React from 'react'
const SignoutButton = ({style}) => {
  const [isSigned, setIsSigned] = useContext(AppContext);
  return (
    <TouchableOpacity
      style={[{ position: "absolute", right: 30, top: -24 }, style]}
      onPress={() => [auth().signOut(), setIsSigned(!isSigned)]}
    >
      <MaterialIcons name="logout" size={20} color={colors.grey} />
    </TouchableOpacity>
  );
};

export default SignoutButton;

const styles = StyleSheet.create({});
