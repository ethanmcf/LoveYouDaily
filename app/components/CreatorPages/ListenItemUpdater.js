import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { button, colors, shadow, titleFont } from "../../common/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RecordVoiceButton from "../VoiceRecorder/RecordVoiceButton";
import VoiceVisualization from "../VoiceRecorder/VoiceVisualization";
import CircleTimer from "../CircleTimer";
import EditableTitle from "./EditableTitle";
import EditTextPopUp from "./EditTextPopUp";
import { translateToValue } from "../../common/values";
import dbManager from "../../management/database-manager";
import React from "react";
import Counter from "../Counter";
import audioManager from "../../management/audio-manager";
import { AppContext } from "../../management/globals";

function ListenItemUpdater({ setIsSelected, data, number, refreshData }) {
  const maxSeconds = 5;
  const translateValue = useRef(new Animated.Value(0)).current;
  const visualizeOpacityValue = useRef(new Animated.Value(0)).current;
  const playButtonValue = useRef(new Animated.Value(0)).current;
  const [recordState, setRecordState] = useState(
    data.content[0] != null ? "play" : null
  ); //null, record, play, pause
  const [audioLength, setAudioLength] = useState(
    data.content[1] != null ? data.content[1].customMetadata.length : 0
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(data.title.trim());
  const [filePath, setFilePath] = useState(data.content[0]);

  const { signing, successful, loading } = useContext(AppContext);
  const [success, setSucces] = successful;


  const popUp = () => {
    if (showPopUp == true) {
      return (
        <EditTextPopUp
          placeholder={currentTitle}
          saveFunc={setCurrentTitle}
          title="Edit Title"
          setShowPopUp={setShowPopUp}
          buttonName="Confirm"
        />
      );
    }
  };
  const reverseAnimation = () => {
    Animated.timing(translateValue, {
      toValue: -translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setIsSelected(null);
    });
  };

  const visualizationAnim = (show) => {
    if (show) {
      Animated.parallel([
        Animated.timing(visualizeOpacityValue, {
          toValue: 1,
          duration: 750,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.timing(playButtonValue, {
          toValue: -30,
          duration: 750,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(visualizeOpacityValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(playButtonValue, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start();
  });

  useEffect(() => {
    //Visualization Animation
    if (recordState == "pause") {
      visualizationAnim(true);
    } else {
      visualizationAnim(false);
    }
    //Record functionality
    if (recordState == "record") {
      setTimeout(() => {
        audioManager
        .onStartRecord("test", setRecordState, maxSeconds, setAudioLength)
        .then((path) => {
          setFilePath(path);
        });
      }, 3500)
    } else if (recordState == "play") {
      if (audioLength == 0) {
        audioManager.onStopRecord(setAudioLength);
      } else {
        audioManager.onStopPlay();
      }
    } else if (recordState == "pause") {
      audioManager.onStartPlay(filePath, setRecordState);
    }
  }, [recordState]);

  const handleDelete = () => {
    setFilePath(null);
    setRecordState(null);
    audioManager.onStopPlay();
    setAudioLength(0);
  };

  const handleSave = () => {
    if (currentTitle.length > 21) {
      Alert.alert("Title Issue", "Each title must be less than 21 characters!");
    } else if (currentTitle.length == 0) {
      Alert.alert(
        "Title Issue",
        "Each title must contain at least one character!"
      );
      // Title is proper so db can be updated
    } else {
      directory = data.bucket;
      dbManager.updateTitle("listenContent", directory, currentTitle);
      dbManager
        .updateListenContent(directory, "testing", filePath, audioLength)
        .then((success) => {
          if (success == false) {
            Alert.alert(
              "Error",
              "There was an issue uploading your image, please try again later."
            );
            handleDelete();
            return; //cut function off
          }
        });
      setSucces(true);
      setTimeout(() => {
        refreshData();
      }, 2000);
    }
  };

  const handleTemplate = () => {
    dbManager.getTemplate("listenContent", number).then((template) => {
      setCurrentTitle(template.title);
      Alert.alert("Audio Message", template.content);
    });
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
      transform: [{ translateY: playButtonValue }],
      justifyContent: "center",
      alignItems: "center",
    },
    visualizerContainer: {
      opacity: visualizeOpacityValue,
      position: "absolute",
      bottom: -64,
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

        <EditableTitle
          index={number}
          title={currentTitle}
          setShowPopUp={setShowPopUp}
        />

        <Animated.View style={styles.recordContainer}>
          <CircleTimer
            seconds={maxSeconds}
            recordState={recordState}
            audioLength={audioLength}
          />
          <View>
            <RecordVoiceButton
              recordState={recordState}
              setState={setRecordState}
              icon={
                recordState == "play"
                  ? "play"
                  : recordState == "pause"
                  ? "pause"
                  : "mic"
              }
            />
            <Counter maxSeconds={maxSeconds} recordState={recordState} />
          </View>

          <Animated.View style={styles.visualizerContainer}>
            <VoiceVisualization />
          </Animated.View>
        </Animated.View>

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
            handleDelete();
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
