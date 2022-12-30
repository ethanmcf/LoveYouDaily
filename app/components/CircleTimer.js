import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { G, Circle, Polyline, Path } from "react-native-svg";
import React from "react";
import { colors } from "../common/styles";
//Circle
radius = 130;
strokeWidth = 17;
percentage = 85;
color = colors.secondary;
max = 100;
strokeOpacity = 1;

function CircleTimer({ seconds, recordState, audioLength}) {

  const duration = seconds * 1000;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedCircle2 = Animated.createAnimatedComponent(Circle);
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const savedProgress = (audioLength)/seconds * circleCircumference
  const [currentProgress, setCurrentProgress] = useState(savedProgress);
  const circleRef1 = useRef();
  const circleRef2 = useRef();

  const animate = (toValue) => {
    return Animated.timing(animatedValue, {
      delay: 3100,
      toValue: toValue,
      duration: duration - 100,
      useNativeDriver: true,
    });
  };
  const animate2 = (toValue) => {
    return Animated.timing(animatedValue2, {
      delay: 800,
      toValue: toValue,
      duration: audioLength * 1000 - 100,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    if (recordState == "record") {
      animate(percentage).start();
      animatedValue.addListener((v) => {
        if (circleRef1?.current) {
          const maxPercentage = (100 * v.value) / max;
          const strokeDashoffset =
            circleCircumference - (circleCircumference * maxPercentage) / 100;
          setCurrentProgress((maxPercentage / 100) * circleCircumference);
          circleRef1.current.setNativeProps({
            strokeDashoffset,
          });
        }
      });
    } else if (recordState == "pause") {
      animate2(percentage).start();
      animatedValue2.addListener((v) => {
        if (circleRef2?.current) {
          const maxPercentage = (100 * v.value) / max;
          const strokeDashoffset =
            circleCircumference -
            (currentProgress * maxPercentage) / percentage;
          circleRef2.current.setNativeProps({
            strokeDashoffset,
          });
        }
      });
    }else if(recordState == null){
      animate(0).reset();
    }else{
      animate(0).stop()
      animate2(0).reset()
    }
  }, [recordState]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
      transform: [
        {
          rotate: "25deg",
        },
      ],
    },
    outline: {
      position: "absolute",
      alignSelf: "center",
      width: radius * 2 - strokeWidth,
      height: radius * 2 - strokeWidth,
      borderRadius: radius,
      backgroundColor: colors.main,
    },
    background: {
      position: "absolute",
      alignSelf: "center",
      width: radius * 2 - strokeWidth - strokeWidth - strokeWidth / 1.7,
      height: radius * 2 - strokeWidth - strokeWidth - strokeWidth / 1.7,
      borderRadius: radius,
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        style={styles.tik}
      >
        <G rotation="90" origin={`${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            strokeWidth={strokeWidth}
            stroke={colors.main}
            strokeOpacity={strokeOpacity}
            r={radius}
            strokeDashoffset={122}
            strokeDasharray={circleCircumference}
            fill="transparent"
            strokeLinecap="round"
          />
          <Circle
            cx="50%"
            cy="50%"
            strokeWidth={strokeWidth}
            stroke={color}
            strokeOpacity={recordState == "record" || recordState == null ? 0 : strokeOpacity}
            r={radius}
            strokeDashoffset={circleCircumference - currentProgress}
            strokeDasharray={circleCircumference}
            fill="transparent"
            strokeLinecap="round"
          />
          <AnimatedCircle
            ref={circleRef1}
            cx="50%"
            cy="50%"
            strokeWidth={strokeWidth}
            stroke={color}
            strokeOpacity={strokeOpacity}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
          <AnimatedCircle2
            ref={circleRef2}
            cx="50%"
            cy="50%"
            strokeWidth={strokeWidth}
            stroke={colors.main}
            strokeOpacity={recordState == "pause" ? 0.5 : 0}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
}

export default CircleTimer;
