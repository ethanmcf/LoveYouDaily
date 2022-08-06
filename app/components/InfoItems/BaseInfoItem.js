import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../common/styles";

import { Ionicons } from "@expo/vector-icons";
function BaseInfoItem({title, height, setIsSelected, children}) {

  const translateValue = useRef(new Animated.Value(0)).current;
  const translateToValue = () => {
    const windowHeight = Dimensions.get("window").width;
    return windowHeight;
  };

  const reverseAnimation = () => {
    Animated.timing(translateValue, {
      toValue: translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setIsSelected(null);
    });
  };

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: -translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start();
  });

  const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        top: "-10%",
    },
    container: {
      height: height,
      width: "70%",
      backgroundColor: "white",
      left: "100%",
      alignSelf: "center",
      transform: [{ translateX: translateValue }],
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      top: 10,
      fontSize: 20,
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.8,
      position: "absolute",
    },
    underline: {
      width: "88%",
      height: 1,
      backgroundColor: colors.main,
      top: 40,
      position: "absolute",
    },

    backButton: {
      bottom: 5,
      left: 10,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
    },
  });

  return (
    <View style={styles.mainContainer}>
    <Animated.View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />

      {children}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => reverseAnimation()}
      >
        <Ionicons name="arrow-back" size={25} color={colors.main} />
        <Text style={{ fontWeight: "bold", fontSize:16, left: 5, color: colors.main }}>
          Back
        </Text>
      </TouchableOpacity>
    </Animated.View>
    </View>
  );
}

export default BaseInfoItem;
