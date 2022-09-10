import { useRef, useEffect, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { colors, shadow } from "../common/styles";
import React from 'react'
function ProgressSlider({ seconds, maxSeconds, isRecording }) {
  const moveProgressBarValue = useRef(new Animated.Value(0)).current;
  const barHeight = 9;

  useEffect(() => {
    if (isRecording) {
      animate().start();
    } else {
      animate().stop();
    }
  }, [isRecording]);

  const animate = () => {
    const barWidth = (Dimensions.get("window").width -57) * 0.8;
    
    return Animated.timing(moveProgressBarValue, {
        toValue: barWidth,
        duration: (maxSeconds * 1000) + 400,
        useNativeDriver: true,
      })
  };

  const styles = StyleSheet.create({
    container: {
      width: "80%",
      top: 30,
    },
    progressContainer: {
      marginTop: 10,
      width: "100%",
      overflow: "hidden",
      borderRadius: 40,
      height: barHeight,
    },
    progressBarContainer: {
      height: barHeight,
      backgroundColor: "rgba(255, 182, 193, 0.5)",
      borderRadius: 25,
      position: "absolute",
      width: "100%",
      left: -1,
    },
    progressBar: {
      height: barHeight,
      borderRadius: 10,
      width: "100%",
      left: "-100%",
      position: "absolute",
      backgroundColor: colors.secondary,
      transform: [{ translateX: moveProgressBarValue }],
    },
    font: {
      fontSize: 10,
      color: colors.shadow,
      position: "absolute",
      top: 20,
      right: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarContainer]}>
          <Animated.View style={styles.progressBar} />
        </View>
      </View>
      <Animated.Text style={styles.font}>{seconds} sec</Animated.Text>
    </View>
  );
}

export default ProgressSlider;
