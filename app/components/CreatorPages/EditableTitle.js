import {useState} from "react";
import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { titleFont, colors } from "../../common/styles";
import EditTitlePopUp from "./EditTitlePopUp";
function EditableTitle({ index, type, title, setShowPopUp }) {


  const styles = StyleSheet.create({
    titleContainer: {
      position: "absolute",
      left: 80,
      top: 15,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });


  return (
    <TouchableNativeFeedback onPress={() => [setShowPopUp(true)]}>
      <View style={[styles.titleContainer]}>
        <Text style={titleFont}>{title}</Text>
        <MaterialIcons
          name="edit"
          size={18}
          color={colors.secondary}
          style={{ top: 4, left: 10, opacity: 0.2 }}
        />
      </View>

    </TouchableNativeFeedback>
  );
}

export default EditableTitle;
