import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Svg, { G, Circle, Polyline, Path } from "react-native-svg";

//Circle
radius = 35;
strokeWidth = 8;
percentage = -100;
color = "green";
max = 100;
duration = 450;
strokeOpacity = 0.5;

//Tik
tikWidth = 6;
tikPercent = 100;
tikMax = 100;

function Check(props) {
  const checkFadeValue = useRef(new Animated.Value(1)).current;
  const checkScaleValue = useRef(new Animated.Value(1)).current;
  const dimBackgroundValue = useRef(new Animated.Value(0)).current;
  const tikOpacValue = useRef(new Animated.Value(0)).current;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = useRef();

  const animate = (toValue) => {
    return ( 
    Animated.parallel([
      Animated.timing(dimBackgroundValue, {
        toValue: 0.8,
        duration: 800,
        delay: 0,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(
          () => 
            Animated.parallel([
              Animated.timing(tikOpacValue, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: toValue,
                duration: duration,
                useNativeDriver: true,
              })
            ]).start(), 350
        );
      }),
      Animated.timing(checkScaleValue, {
        toValue: 2,
        duration: 550,
        delay: 1600,
        useNativeDriver: true,
      }),
      Animated.timing(checkFadeValue, {
        toValue: 0,
        duration: 400,
        delay: 1600,
        useNativeDriver: true,
      }),
    ]).start()
    );
  };

  useEffect(() => {
    animate(percentage);
    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;
        circleRef.current.setNativeProps({
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
    },
    dimBackground: {
      width: 1000,
      height: 1000,
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
            stroke={color}
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
          <AnimatedCircle
            ref={circleRef}
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
        </G>
      </Svg>
    </Animated.View>
  );
}

export default Check;
