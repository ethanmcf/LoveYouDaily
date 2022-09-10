import {useState} from "react";
import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { titleFont, colors } from "../../common/styles";
import React from 'react'
function EditableTitle({ title, setShowPopUp }) {


  const styles = StyleSheet.create({
    titleContainer: {
      position: "absolute",
      left: 70,
      top: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });


  return (
    <TouchableNativeFeedback onPress={() => [setShowPopUp(true)]}>
      <View style={[styles.titleContainer]}>
        <Text style={[titleFont, {fontSize: 22}]}>{title}</Text>
        <MaterialIcons
          name="edit"
          size={18}
          color={colors.secondary}
          style={{ top: 2, left: 10, opacity: 0.2 }}
        />
      </View>

    </TouchableNativeFeedback>
  );
}

export default EditableTitle;
