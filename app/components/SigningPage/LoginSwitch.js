import React from 'react'
import { useState, useEffect, useRef } from "react";
import { colors } from "../../common/styles";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";



function LoginSwitch({setSection}) {
  const switchTranslation = useRef(new Animated.Value(0)).current;
  const activeSale = useRef(new Animated.Value(1)).current;

  handleClick = (value, switchTo) => {
    setSection(switchTo);
    Animated.timing(switchTranslation, {
      toValue: value,
      useNativeDriver: true,
      duration: 250,
    }).start();

  };

  handleHold = () => {
    Animated.timing(activeSale, {
      toValue: 0.95,
      useNativeDriver: true,
      duration: 90,
    }).start();
  };

  handleRelease = () => {
    Animated.timing(activeSale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 90,
    }).start();
  };

  const styles = StyleSheet.create({
    container: {
      width: 150,
      height: 30,
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: colors.main,
      marginBottom:25,
    },
    options: {
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: 30,
    },
    optionText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 10,
    },
    secondOption: {
      left: "50%",
    },
    activeView: {
      backgroundColor: colors.background,
      borderRadius: 8,
      width: 73,
      height: 26,
      alignSelf: "center",
      marginLeft: 2,
      marginRight: 2,
      transform: [{ translateX: switchTranslation }, { scale: activeSale }],
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.activeView} />

      <TouchableOpacity
        onPress={() => {
          handleClick(0, "user");
        }}
        onPressIn={handleHold}
        onPressOut={handleRelease}
        style={styles.options}
      >
        <Text style={styles.optionText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleClick(73, "creator");
        }}
        onPressIn={handleHold}
        onPressOut={handleRelease}
        style={[styles.secondOption, styles.options]}
      >
        <Text style={styles.optionText}>Creator</Text>
      </TouchableOpacity>
    </View>
  );
}
export default LoginSwitch;
