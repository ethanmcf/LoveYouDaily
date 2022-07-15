import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../common/styles";

function DefaultLid({ ribbonColor, baseColor }) {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
    },
    lid: {
      borderRadius: 5,
      width: 76,
      height: 20,
      backgroundColor: baseColor,
      position: "absolute",
      top: -2,
      borderBottomColor: colors.shadow,
      borderBottomWidth:3,
      alignItems:"center"
    },
    ribbon:{
      top: -22,
      borderRadius: 30,
      left: 0,
      width: 40,
      height: 40,
      justifyContent:'center',
      alignItems:"center"
    },
    ribbonTwelevePointBurtst: {
      width: 30,
      height: 30,
      backgroundColor: ribbonColor,
      position: "absolute",
      borderRadius: 2,
    },
    stripe: {
      width: 16,
      height: 20,
      backgroundColor: ribbonColor,


    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.ribbon}>
          <View style={[styles.ribbonTwelevePointBurtst]} />
          <View
            style={[
              styles.ribbonTwelevePointBurtst,
              { transform: [{ rotate: "30deg" }] },
            ]}
          />
          <View
            style={[
              styles.ribbonTwelevePointBurtst,
              { transform: [{ rotate: "60deg" }] },
            ]}
          />
        </View>
      <View style={styles.lid}>
      <View style={styles.stripe} />
      </View>
      
      
    </View>
  );
}

export default DefaultLid;
