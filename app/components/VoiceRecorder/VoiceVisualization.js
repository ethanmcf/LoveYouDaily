import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import { colors } from "../../common/styles";
import React from "react";

function VoiceVisualization({}) {
  const barWidth = 5;
  const numIncrements = 7;
  let animationList = [];
  let animatedStartSequence = [];
  let animatedEndSequence = [];
  const [hasRun, setHasRun] = useState(0)

  const barData = () => {
    width = (Dimensions.get("window").width - 60) * 0.8;
    numBars = Math.floor(width / (barWidth + 2));
    let data = [];

    for (i = 0; i < numBars; i++) {
      animationList[i] = new Animated.Value(1);
      nextItem = { id: i };
      data[i] = nextItem;
    }
    return data;
  };
  const animateBar = (index, amplification) => {
    duration = 100;
    max_delay = 200;

    median = Math.floor(numIncrements / 2);
    incrementValue = (2 + amplification - 1) / median;

    toValue = 1;
    delay = max_delay;

    animatedStartSequence = [];
    animatedEndSequence = [];

    for (i = 0; i < numIncrements; i++) {
      randomDelayChange = Math.floor(Math.random() * 80);
      toValue =
        i <= median ? toValue + incrementValue : toValue - incrementValue;
      delay =
        i <= median ? delay - randomDelayChange : delay + randomDelayChange;

      animatedStartSequence[i] = Animated.timing(animationList[index + i], {
        toValue: toValue,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      });
      animatedEndSequence[i] = Animated.timing(animationList[index + i], {
        toValue: 1,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      });
    }

    Animated.sequence([
      Animated.parallel(animatedStartSequence),
      Animated.parallel(animatedEndSequence),
    ]).start(() => {
      index = Math.floor(
        Math.random() * (animationList.length - 1 - numIncrements)
      );
      amplification = Math.floor(Math.random() * 3 + 1.5);
      animateBar(index, amplification);
    });
  };

  useEffect(() => {
    index = Math.floor(
      Math.random() * (animationList.length - 1 - numIncrements)
    );
    amplification = Math.floor(Math.random() * 3 + 1.5);
    animateBar(index, amplification);
  });
  const styles = StyleSheet.create({
    container: {
      width: "80%",
      height: 50,
      borderColor: colors.pink,
      borderWidth: 0,
      alignItems: "center",
      flexDirection: "row",
      overflow: "visible",
    },
    bar: {
      width: barWidth,
      backgroundColor: colors.main,
      borderRadius: 1,
      marginRight: 1,
      marginLeft: 1,
    },
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={barData()}
        style={{ height: "100%", overflow: "visible" }}
        contentContainerStyle={{ alignItems: "center", overflow: "visible" }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        horizontal
        renderItem={({ index }) => {
          return (
            <Animated.View
              style={[
                styles.bar,
                { height: 15, transform: [{ scaleY: animationList[index] }] },
              ]}
              key={index}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default VoiceVisualization;
