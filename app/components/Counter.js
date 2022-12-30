import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { colors } from "../common/styles";

export default function Counter({ recordState, maxSeconds, needDelay }) {
  const [counter, setCounter] = useState(0);
  const [countDownTimer, setCountDownTimer] = useState(3);
  const [counterText, setCounterText] = useState("Start");
  const [hasRun, setHasRun] = useState(false)
  const scaleValueAnim = useRef(new Animated.Value(1)).current;
  const opacityValueAnim = useRef(new Animated.Value(0.85)).current;

  const countDownAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleValueAnim, {
        toValue: 1.6,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValueAnim, {
        toValue: 0,
        delay: 350,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start(() => {
      scaleValueAnim.setValue(1);
      opacityValueAnim.setValue(0.85);
    });
  };

  useEffect(() => {
    // Count seconds
    if (recordState == "record") {
      if (countDownTimer >= 1) {
        setCounterText(`${countDownTimer}`);
        countDownAnimation();
        const countDown = setInterval(
          () => setCountDownTimer(countDownTimer - 1),
          1000
        );
        return () => clearInterval(countDown);
      }
      zero = Math.floor((maxSeconds - counter) / 10) > 0 ? "" : "0";
      setCounterText(`00:${zero}${maxSeconds - counter}`);
      const timer = setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
      //Pause state
    } else if (recordState == "pause") {
      if(needDelay && hasRun == false){
        setCounterText("Play")
        setCounter(0)
        setTimeout(() => {
          setHasRun(true)
        }, 1000)
        return
        
      }else{
        zero = Math.floor(counter / 10) > 0 ? "" : "0";
        setCounterText(`00:${zero}${counter}`);
      }
      const timer = setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCounter(0);
      setHasRun(false)
      setCountDownTimer(3);
    }
  });

  const styles = StyleSheet.create({
    secondsText: {
      color: colors.darkGrey,
      top: 25,
      opacity: opacityValueAnim,
      fontWeight: "bold",
      alignSelf: "center",
      transform: [
        {
          scale: scaleValueAnim,
        },
      ],
    },
  });

  return (
    <View>
      <Animated.Text style={styles.secondsText}>
        {recordState == "play"
          ? "Play"
          : recordState == null
          ? "Start"
          : counterText}
      </Animated.Text>
    </View>
  );
}
