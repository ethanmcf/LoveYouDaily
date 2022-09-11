import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Text } from "react-native";
import { colors } from "../common/styles";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
//Circle

function LoadSpinner(props) {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
    },
    loading: {
      opacity: 0.68,
      width: 146,
      alignSelf: "center",
      position: "absolute",
    },
  });

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require("../../assets/LoadSpinner.json")}
        autoPlay
        loop={true}
        style = {styles.loading}
      />
      <Text style={{fontSize: 9, opacity: 0.4, fontWeight: "bold", alignSelf:"center", top:  26}}>Gathering data ...</Text>
    </View>
  );
}

export default LoadSpinner;
