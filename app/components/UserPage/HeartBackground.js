import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../common/styles";

function HeartBackground(props) {
  const width = 4;
  const size = 150;
  const color = colors.main;
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },

    notesGift: {
      position: "absolute",
      top: 100,
      left: 60,
      transform: [{ scale: 0.8 }],
    },

    listenGift: {
      position: "absolute",
      top: 420,
      left: 240,
      transform: [{ scale: 0.8 }],
    },

    lookGift: {
      position: "absolute",
      top: 200,
      left: 210,
      transform: [{ scale: 0.8 }],
    },

    leftCrest: {
      width: size,
      height: size,
      borderRadius: size,
      borderColor: color,
      borderTopWidth: width,
      borderLeftWidth: width,
      transform: [{ scaleX: 1 }, { scaleY: 1.2 }, { rotate: "30deg" }],
      left: 60,
      position: "absolute",
    },
    rightCrest: {
      width: size,
      height: size,
      borderRadius: size,
      borderColor: color,
      borderTopWidth: width,
      borderRightWidth: width,
      transform: [{ scaleX: 1 }, { scaleY: 1.2 }, { rotate: "-30deg" }],
      right: 60,
      position: "absolute",
    },
    topLineContainer: {
      right: 160,
      top: 110,
      position: "absolute",
      transform: [{ rotateZ: "38deg" }],
    },
    topLine: {
      width: 85,
      height: 45,
      borderColor: color,
      borderRightWidth: width,
      borderTopRightRadius: 20,
      transform: [{ scaleX: 1 }, { scaleY: 4 }, { rotateZ: "0deg" }],
      position: "absolute",
    },
    bottomLineContainer: {
      right: 201,
      top: 294,
      position: "absolute",
      transform: [{ rotateZ: "38deg" }],
    },
    bottomLine: {
      width: 85,
      height: 45,
      borderColor: color,
      borderLeftWidth: width,
      borderBottomLeftRadius: 20,
      transform: [{ scaleX: 1 }, { scaleY: 4 }, { rotateZ: "0deg" }],
      position: "absolute",
    },
    tail: {
      width: size,
      height: size,
      borderRadius: size,
      borderColor: color,
      borderTopWidth: width,
      borderLeftWidth: width,
      transform: [{ scaleX: 1 }, { scaleY: 1.2 }, { rotate: "-76deg" }],
      right: 109,
      top: 332,
      position: "absolute",
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ width: 395, flexDirection: "row" }}>
        <View style={styles.leftCrest} />
        <View style={styles.rightCrest} />

        <View style={styles.topLineContainer}>
          <View style={styles.topLine} />
        </View>

        <View style={styles.bottomLineContainer}>
          <View style={styles.bottomLine} />
        </View>

        <View style={styles.tail} />

      </View>
    </View>
  );
}

export default HeartBackground;
