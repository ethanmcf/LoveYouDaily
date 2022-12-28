import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../common/styles";
import { useState } from "react";

export default function Counter({
  recordState,
  maxSeconds,
  setRecordState,
  setAudioLength,
  audioLength,
}) {
  const [counter, setCounter] = useState(0);
  const [counterText, setCounterText] = useState("Start");

  useEffect(() => {
    // Count seconds
    if (recordState == "record" || recordState == "pause") {
      if (recordState == "record") {
        if (counter < maxSeconds) {
          zero = Math.floor((maxSeconds - counter) / 10) > 0 ? "" : "0";
          setCounterText(`00:${zero}${maxSeconds - counter}`);
          const timer = setInterval(() => setCounter(counter + 1), 1000);
          return () => clearInterval(timer);
        } else {
          setRecordState("play");
        }
      } else {
        if (counter < audioLength) {
          zero = Math.floor(counter / 10) > 0 ? "" : "0";
          setCounterText(`00:${zero}${counter}`);
          const timer = setInterval(() => setCounter(counter + 1), 1000);
          return () => clearInterval(timer);
        } else {
          setRecordState("play");
        }
      }
      //If state changes to not record or pause
    } else {
      setCounter(0);
    }
  });

  useEffect(() => {
    if (recordState == "play" && counter != 0) {
      setAudioLength(counter);
    }
  }, [recordState]);

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
