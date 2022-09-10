import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { colors } from "../../common/styles";

const fillerDescription = "Click to complete this item"


function ListItem({number, title, completed, description}) {
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
    numberFont:{
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "bold",
        color: colors.secondary,
        opacity: 0.7,
        position:"absolute",
        left: 13,
        top: 19
    },
    titleFont:{
        position:"absolute",
        left: 60,
        top: 13,
        color: "black",
        opacity: 0.8
    },
    descriptionFont:{
        position:"absolute",
        left: 60,
        top: 30,
        color: "grey",
        fontSize: 10,
        width: "60%",
        overflow: "hidden",
    },
    lineBreak: {
        height: "80%",
        width: 1,
        backgroundColor: "grey",
        opacity: 0.3,
        left: 40,
        top: 6,
        position:"absolute",
    },
    editIcon:{
        position:"absolute",
        right:10,
    },

  });

  return (
  <View style={styles.container}>
    <Text style={styles.numberFont}>{number}.</Text>
    <View style={styles.lineBreak}/>
    <Text style={styles.titleFont}>{title}</Text>
    <Text style={styles.descriptionFont} numberOfLines={1}>{(description == null || description == "")? fillerDescription : description}</Text>
    <MaterialIcons name={completed ? "check" : "edit"} size={25} color={colors.main} style={styles.editIcon}/>
  </View>
  );
}

export default ListItem;
