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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RecordVoiceButton from "../VoiceRecorder/RecordVoiceButton";
import VoiceVisualization from "../VoiceRecorder/VoiceVisualization";
import ProgressSlider from "../ProgressSlider";
import EditableTitle from "./EditableTitle";
import EditTextPopUp from "./EditTextPopUp";
import { translateToValue } from "../../common/values";

function ListenItemUpdater({ setIsSelected, data, number, refreshData }) {
  const maxSeconds = 10;
  const translateValue = useRef(new Animated.Value(0)).current;
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  const [showPopUp, setShowPopUp] = useState(false)
  const popUp = () => {
    if(showPopUp == true){
        return <EditTextPopUp placeholder="title" title="Edit Title" setShowPopUp={setShowPopUp}/>
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
    saveButton: {
      position: "absolute",
      bottom: 25,
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
      height: 50,
      justifyContent: "space-around",
      alignItems: "center",
      top: -10,
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

        <EditableTitle index={number} type="listen" title="Listen"  setShowPopUp={setShowPopUp}/>

        <View style={styles.recordContainer}>
          <RecordVoiceButton
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
          <ProgressSlider
            seconds={seconds}
            maxSeconds={maxSeconds}
            isRecording={isRecording}
          />
        </View>

        <TouchableOpacity style={[styles.saveButton, button, shadow]}>
          <Text style={{ fontSize: 12, opacity: 0.8 }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton}>
          <MaterialIcons name="clear" size={23} color={colors.red} />
        </TouchableOpacity>

        {popUp()}

      </Animated.View>
    </View>
  );
}

export default ListenItemUpdater;
