import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { G, Circle, Polyline, Path } from "react-native-svg";
import React from 'react'
//Circle
const radius = 35;
const strokeWidth = 8;
const percentage = -100;
const max = 100;
const duration = 1000;
const strokeOpacity = 0.5;

//Tik
const tikWidth = 6;

function Check(props) {
  const checkFadeValue = useRef(new Animated.Value(1)).current;
  const checkScaleValue = useRef(new Animated.Value(1.4)).current;
  const dimBackgroundValue = useRef(new Animated.Value(0)).current;
  const tikOpacValue = useRef(new Animated.Value(0)).current;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const AnimatedCheck = useRef(new Animated.createAnimatedComponent(Circle)).current;
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRefCheck = useRef();

  const animated = (toValue) => {
    return ( 
      Animated.sequence([
        Animated.timing(dimBackgroundValue, {
              toValue: 0.85,
              duration: 800,
              useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(tikOpacValue, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: toValue,
            duration: duration-100,
            useNativeDriver: true,
          })
        ]),
      ]).start()
    );
  };

  useEffect(() => {
    animated(percentage);
    animatedValue.addListener((v) => {
      if (circleRefCheck?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;
          circleRefCheck.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  });


  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      transform:[{scale: checkScaleValue}],
      opacity: checkFadeValue,
      position:"absolute",
      alignSelf:"center",
    },
    dimBackground: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: "white",
      opacity: dimBackgroundValue,
      alignSelf:"center",
    },
    tik: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      alignSelf:"center",
    },
    tikOpac:{
      opacity: tikOpacValue,
    }
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={styles.dimBackground} />
      <Animated.View style={[styles.tik, styles.tikOpac]}>
        <Svg height={radius} width={radius}>
          <Polyline
            points={`3 ${radius / 2} , ${radius / 2 - tikWidth + 1} ${
              radius - tikWidth
            }, ${radius / 2 - tikWidth + 2} ${radius - tikWidth},  ${
              radius - tikWidth + 2
            } 5`}
            fill="none"
            stroke={"green"}
            strokeWidth={tikWidth}
            strokeLinecap="round"
            strokeOpacity={strokeOpacity}
          />
        </Svg>
      </Animated.View>

      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        style={styles.tik}
      >
        <G rotation="90" origin={`${halfCircle}`}>
          <AnimatedCheck
            ref={circleRefCheck}
            cx="50%"
            cy="50%"
            strokeWidth={strokeWidth}
            stroke={"green"}
            strokeOpacity={strokeOpacity}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </Animated.View>
  );
}

export default Check;
