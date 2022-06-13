import { View, StyleSheet, Animated, Text } from "react-native";
import { useRef, useEffect } from "react";
import { colors } from "../../common/styles";

const position = 70;
const toValue = 0;
const duration = 1000;
let animatedValue = []
const message = "DAILY"

function DailyText(props) {

  //Animation Values
  const dValue = useRef(new Animated.Value(position)).current;
  const aValue = useRef(new Animated.Value(position)).current;
  const iValue = useRef(new Animated.Value(position)).current;
  const lValue = useRef(new Animated.Value(position)).current;
  const yValue = useRef(new Animated.Value(position)).current;

  const dFadeValue = useRef(new Animated.Value(0)).current;
  const aFadeValue = useRef(new Animated.Value(0)).current;
  const iFadeValue = useRef(new Animated.Value(0)).current;
  const lFadeValue = useRef(new Animated.Value(0)).current;
  const yFadeValue = useRef(new Animated.Value(0)).current;

//Styles
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,

    },
    animateD: {
      opacity: dFadeValue,
      transform: [{ translateY: dValue }],
    },
    animateA: {
      opacity: aFadeValue,
      transform: [{ translateY: aValue }],
    },
    animateI: {
      opacity: iFadeValue,
      transform: [{ translateY: iValue }],
    },
    animateL: {
      opacity: lFadeValue,
      transform: [{ translateY: lValue }],
    },
    animateY: {
      opacity: yFadeValue,
      transform: [{ translateY: yValue }],
    },
  });

//Animation on load
  useEffect(() => {
    Animated.stagger(300, [
        //D Letter Animation
      Animated.parallel([
        Animated.timing(dValue, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(dFadeValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),

      //A Letter Animation
      Animated.parallel([
        Animated.timing(aValue, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(aFadeValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),

      //I Letter Animation
      Animated.parallel([
        Animated.timing(iValue, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(iFadeValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
      ]),
      
        //L Letter Animation
      Animated.parallel([
        Animated.timing(lValue, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(lFadeValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
      ]),

      //Y Letter Animation
      Animated.parallel([
        Animated.timing(yValue, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(yFadeValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
      ])
      
    ]).start();
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.animateD, styles.text]}>D</Animated.Text>
      <Animated.Text style={[styles.animateA, styles.text]}>A</Animated.Text>
      <Animated.Text style={[styles.animateI, styles.text]}>I</Animated.Text>
      <Animated.Text style={[styles.animateL, styles.text]}>L</Animated.Text>
      <Animated.Text style={[styles.animateY, styles.text]}>Y</Animated.Text>
    </View>
  );
}

export default DailyText;
