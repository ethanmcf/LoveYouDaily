import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { colors } from "../../common/styles";

function PlayButton({ recordState, setState, icon }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const innerCircleAmin = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // console.log("changed", recordState)
    if (recordState == "record") {
      beforeRecordingAnim().start();
    } else {
      beforeRecordingAnim().stop();
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [recordState]);

  const beforeRecordingAnim = () => {
    return Animated.sequence([
      Animated.delay(3000),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);
  };

  const handleStateChange = () => {
    if (recordState == null) {
      setState("record");
    } else if (recordState == "play") {
      setState("pause");
    } else {
      setState("play");
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      transform: [{ scale: 1.5 }],
    },
    largeCircle: {
      borderRadius: 40,
      backgroundColor: colors.main,
      width: 55,
      height: 55,
      opacity: 0.5,
      transform: [{ scale: pulseAnim }],
    },
    innerCircle: {
      borderRadius: 40,
      width: 47,
      height: 47,
      backgroundColor: colors.secondary,
      transform: [{ scale: innerCircleAmin }],
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
  });
  return (
    <TouchableOpacity
      onPress={() => handleStateChange()}
      style={styles.container}
    >
      <Animated.View style={styles.largeCircle} />

      <Animated.View style={styles.innerCircle}>
        <Ionicons name={icon} size={22} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default PlayButton;
