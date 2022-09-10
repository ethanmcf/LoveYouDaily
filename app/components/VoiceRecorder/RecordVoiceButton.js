import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import React from 'react'
import { colors } from "../../common/styles";

function PlayButton({isRecording, setIsRecording}) {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const innerCircleAmin = useRef(new Animated.Value(1)).current;

    useEffect(()=>{
      if(isRecording){
        beforeRecordingAnim().start()
      }else{
        beforeRecordingAnim().stop()
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start()
      }
    }, [isRecording])

    const beforeRecordingAnim = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
    };


    const styles = StyleSheet.create({
      container: {
        justifyContent: "center",
        alignItems: "center",
        transform: [{scale: 1.2}]
      },
      largeCircle: {
        borderRadius: 40,
        backgroundColor: colors.main,
        width: 55,
        height: 55,
        opacity: 0.5,
        position: "absolute",
        transform: [{ scale: pulseAnim }],
      },
      innerCircle: {
        borderRadius: 40,
        width: 47,
        height: 47,
        backgroundColor: colors.secondary,
        transform: [{ scale: innerCircleAmin }],
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      },
      
    });
    return (
      <TouchableOpacity
        onPress={() => setIsRecording(!isRecording)}
        style={styles.container}
      >
        <Animated.View style={styles.largeCircle} />
  
        <Animated.View style={styles.innerCircle}>
          <Ionicons name="mic" size={22} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  }

export default PlayButton;