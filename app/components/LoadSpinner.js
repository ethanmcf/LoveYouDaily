import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Text, Platform } from "react-native";
import { colors } from "../common/styles";
import React from "react";
//Circle
const DIMENSTIONS = 15
const COLOR = colors.secondary
const DURATION = 300


function LoadSpinner(props) {
  const circleOpacity1 = useRef(new Animated.Value(1)).current;
  const circleOpacity2 = useRef(new Animated.Value(1)).current;
  const circleOpacity3 = useRef(new Animated.Value(1)).current;

  const animateCircle = (circleAnimateValue, delay) => {
    return (
      Animated.sequence([
        Animated.timing(circleAnimateValue, {
          toValue: 0.3,
          delay: delay,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnimateValue, {
          toValue: 1,
          duration: DURATION,
          delay: 100,
          useNativeDriver: true,
        }),
      ])
    )
  }
  useEffect(()=>{
    Animated.loop(
      Animated.parallel([
        animateCircle(circleOpacity1, 0),
        animateCircle(circleOpacity2, 230),
        animateCircle(circleOpacity3, 430),
      ])
    ).start()

  })

  const styles = StyleSheet.create({
    container: {
      width: "22%",
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      position: "absolute",
      alignSelf:"center",
      top: -40,
    },
    loading: {
      opacity: 0.68,
      width: "100%",
      backgroundColor: "blue",
      left: -2,
      alignSelf: "center",
    },
    circle: {
      width: DIMENSTIONS,
      height: DIMENSTIONS,
      borderRadius: DIMENSTIONS/2,
      backgroundColor: COLOR
    }
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, {opacity: circleOpacity1}]}/>
      <Animated.View style={[styles.circle,{opacity: circleOpacity2}]}/>
      <Animated.View style={[styles.circle,{opacity: circleOpacity3}]}/>
    </View>
  );
}

export default LoadSpinner;
