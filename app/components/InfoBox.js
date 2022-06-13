import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, shadow } from "../common/styles";
function InfoBox({ info, styled }) {
  //Styles
  const styles = StyleSheet.create({
    container: {
      padding: 5,
      borderRadius: 6,
      backgroundColor: styled.mainColor,
      maxWidth: 300,
      flexDirection: "row",
    },

    text: {
      fontSize: 10,
      fontStyle: "italic",
      flexShrink: 1,
      opacity: 0.8,
      fontWeight: styled.isBold ? "bold" : "normal",
      color: styled.colorFont,
    },

    triangle: {
      width: 0,
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: styled.mainColor,
      position: "absolute",
      bottom: -13,
      left: 2,
      borderRadius: 10,
    },
  });
  
  return (
    <View style={[styles.container, shadow]}>
      <Text numberOfLines={3} style={styles.text}>
        {info}
      </Text>
      <View style={styles.triangle} />
    </View>
  );
}

export default InfoBox;
