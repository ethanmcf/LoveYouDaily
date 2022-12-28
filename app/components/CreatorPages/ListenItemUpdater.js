import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { button, colors, shadow, titleFont } from "../../common/styles";
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import RecordVoiceButton from "../VoiceRecorder/RecordVoiceButton";
import VoiceVisualization from "../VoiceRecorder/VoiceVisualization";
import ProgressSlider from "../ProgressSlider";
import EditableTitle from "./EditableTitle";
import EditTextPopUp from "./EditTextPopUp";
import { translateToValue } from "../../common/values";
import React from 'react'
function ListenItemUpdater({ setIsSelected, data, number, refreshData }) {
  const maxSeconds = 13;
  const translateValue = useRef(new Animated.Value(0)).current;
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  const [showPopUp, setShowPopUp] = useState(false)

  const popUp = () => {
    if(showPopUp == true){
        return <EditTextPopUp 
          placeholder="title" 
          title="Edit Title" 
          setShowPopUp={setShowPopUp} 
          buttonName="Confirm"
        />
    }
  }
  const reverseAnimation = () => {
    Animated.timing(translateValue, {
      toValue: -translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setIsSelected(null);
    });
  };

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start();
  });
  useEffect(() => {
    secondInterval();
  });

  secondInterval = () => {
    let myInterval = setInterval(() => {
      clearInterval(myInterval);
      if (isRecording) {
        if (seconds < maxSeconds) {
          setSeconds(seconds + 1);
        } else {
          setIsRecording(false);
        }
      }
    }, 1000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      top: 15,
      backgroundColor: "transparent",
      overflow: "hidden",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 145,
      borderRadius: 15,
    },
    background: {
      width: "95%",
      height: "95%",
      backgroundColor: "white",
      top: "-100%",
      alignSelf: "center",
      transform: [{ translateY: translateValue }],
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 25,
      left: 25,
    },
    saveButton: {
      width: 100,
      height: 28,
    },
    startButton: {
      top: 50,
    },
    backArrow: {
      position: "absolute",
      left: 10,
      top: 20,
    },
    numberFont: {
      fontSize: 27,
      fontStyle: "italic",
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.7,
      position: "absolute",
      left: 41,
      top: 15,
    },
    clearButton: {
      right: 25,
      position: "absolute",
      bottom: 25,
    },
    recordContainer: {
      width: "100%",
      height: 259,
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      position: "absolute",
      left: 80,
      top: 15,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background]}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => [reverseAnimation()]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.main} />
        </TouchableOpacity>

        <Text style={styles.numberFont}>{number}.</Text>

        <EditableTitle index={number} title="Listen"  setShowPopUp={setShowPopUp}/>

        <View style={styles.recordContainer}>
        <ProgressSlider
            seconds={seconds}
            maxSeconds={maxSeconds}
            isRecording={isRecording}
          />
          <View>
            <RecordVoiceButton
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
            <Text style={{opacity: 0.76, top:25}}>{maxSeconds - seconds} sec left</Text>
          </View>
          {isRecording ? <VoiceVisualization isRecording={isRecording}/> : null}
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.saveButton, button, shadow, { marginRight: 10 }]}
              onPress={() => {
                handleSave();
              }}
            >
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                button,
                shadow,
                { backgroundColor: colors.secondary },
              ]}
              onPress={() => {
                handleTemplate();
              }}
            >
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Template</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            handleDeleteImage()
          }}
        >
          <MaterialIcons name="clear" size={23} color={colors.red} />
        </TouchableOpacity>

        {popUp()}

      </Animated.View>
    </View>
  );
}

export default ListenItemUpdater;
