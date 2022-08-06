import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../common/styles";

function InfoItem({title, completed}) {
  const styles = StyleSheet.create({
    container: {
      height: 60,
      borderRadius: 10,
      width: "90%",
      backgroundColor: "white",
      shadowColor: "grey",
      marginTop: 10,
      shadowOffset: { height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
      alignSelf:"center",
      justifyContent:"center",
    },
    titleFont:{
        position:"absolute",
        left: 20,
        top: 13,
        fontWeight:"bold",

        color: colors.secondary,
        opacity: 0.8
    },
    descriptionFont:{
        position:"absolute",
        left: 20,
        top: 30,
        color: "grey",
        fontSize: 10,
        width: "60%",
        overflow: "hidden",
    },
    icon:{
        position:"absolute",
        right:10,
        opacity: 0.8
    }

  });

  return (
  <View style={styles.container}>
    <Text style={styles.titleFont}>{title}</Text>
    <Text style={styles.descriptionFont} numberOfLines={1}>Click for information and more information</Text>
    <Ionicons name={completed ? "checkmark" :"information-circle-outline"} size={25} color={colors.secondary} style={styles.icon}/>
  </View>
  );
}

export default InfoItem;
