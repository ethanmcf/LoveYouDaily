import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../common/styles";

function InfoItem({ title, icon, message, secondTitle }) {
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
      alignSelf: "center",
      justifyContent: "center",
    },
    titleFont: {

      fontWeight: "bold",

      color: colors.secondary,
      opacity: 0.8,
    },
    descriptionFont: {
      position: "absolute",
      left: 20,
      top: 30,
      color: "grey",
      fontSize: 10,
      width: "80%",
      overflow: "hidden",
    },
    icon: {
      position: "absolute",
      right: 10,
      opacity: 0.8,
    },
    secondPartTitleText: {
      fontSize:13,
      fontWeight: "bold",

      color: "dimgrey",
      opacity: 0.4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", position:"absolute", top: 13, left: 20 }}>
      <Text style={styles.titleFont}>{title}</Text>
      <Text style={styles.secondPartTitleText}> {secondTitle}</Text>
      </View>
      <Text style={styles.descriptionFont} numberOfLines={1}>
        {message}
      </Text>
      {icon}
    </View>
  );
}

export default InfoItem;
