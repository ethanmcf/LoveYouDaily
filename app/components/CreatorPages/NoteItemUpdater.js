import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  TouchableNativeFeedback,
  Keyboard
} from "react-native";
import { button, colors, shadow } from "../../common/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import EditableTitle from "./EditableTitle";
import EditTitlePopUp from "./EditTitlePopUp";

function NoteItemUpdater({ setIsSelected, number }) {
  const translateValue = useRef(new Animated.Value(0)).current;
  const translateToValue = () => {
    const windowHeight = Dimensions.get("window").height;
    const headerHeight = 140;
    const topDistance = 15;
    const marginBottom = 145;
    const centerAlign = 2;
    return (
      windowHeight - headerHeight - marginBottom + topDistance - centerAlign
    );
  };
  const [showPopUp, setShowPopUp] = useState(false)
  const popUp = () => {
    if(showPopUp == true){
        return <EditTitlePopUp title={"Title"} setShowPopUp={setShowPopUp}/>
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
    backArrow: {
      position: "absolute",
      left: 10,
      top: 20,
    },
    boxInput: {
      flex: 1,
      width: "75%",
      top: 65,
      marginBottom: 150,
      borderRadius: 10,
      borderColor: "pink",
      borderWidth: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 3,
      paddingBottom: 3,
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
    titleFont: {
      fontSize: 26,
      fontWeight: "bold",
      opacity: 0.8,
      color: colors.secondary,
      top: 17,
    },
    charsLeft:{
        position:"absolute",
        bottom: -15,
        right: 0,
        fontSize: 9,
        color: colors.grey
    },
    clearButton:{
      right: 25,
      position:"absolute",
      bottom: 25,
    },
  });

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <Animated.View style={[styles.background]}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => [reverseAnimation()]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.main} />
        </TouchableOpacity>
        <Text style={styles.numberFont}>{number}.</Text>
        <EditableTitle index={number} type="notes" title="Love notes" setShowPopUp={setShowPopUp}/>
        <View style={styles.boxInput}>
          <TextInput
            numberOfLines={20}
            multiline={true}
            maxLength={320}
            placeholder="Enter message ..."
          />
          <Text style={styles.charsLeft}>320 characters left</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                button,
                shadow,
                {marginRight: 10 },
              ]}
            >
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, button, shadow, {backgroundColor: colors.secondary}]}>
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Template</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton}>
            <MaterialIcons name="clear" size={23} color={colors.red} />
          </TouchableOpacity>

        {popUp()}
      </Animated.View>
      
    </View>
    </TouchableNativeFeedback>
  );
}

export default NoteItemUpdater;
