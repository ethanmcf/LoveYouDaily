import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../common/styles";
import { useState } from "react";

export default function Counter({
  recordState,
  maxSeconds,
}) {
  const [counter, setCounter] = useState(0);
  const [countDownTimer, setCountDownTimer] = useState(3)
  const [counterText, setCounterText] = useState("Start");

  useEffect(() => {
    
    // Count seconds
    if (recordState == "record") {
      if(countDownTimer >= 1){
        setCounterText(`${countDownTimer} ...`)
        const countDown = setInterval(() => setCountDownTimer(countDownTimer - 1), 1000);
        return () => clearInterval(countDown);
      }
      zero = Math.floor((maxSeconds - counter) / 10) > 0 ? "" : "0";
      setCounterText(`00:${zero}${maxSeconds - counter}`);
      const timer = setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
      //Pause state
    } else if (recordState == "pause") {
      zero = Math.floor(counter / 10) > 0 ? "" : "0";
      setCounterText(`00:${zero}${counter}`);
      const timer = setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCounter(0);
    }


  });

  return (
    <View>
      <Text style={styles.secondsText}>
        {recordState == "play"
          ? "Play"
          : recordState == null
          ? "Start"
          : counterText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  secondsText: {
    color: colors.darkGrey,
    top: 25,
    opacity: 0.85,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
