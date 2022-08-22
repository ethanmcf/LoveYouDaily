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
  Keyboard,
  Alert,
} from "react-native";
import { button, colors, shadow } from "../../common/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import EditableTitle from "./EditableTitle";
import EditTextPopUp from "./EditTextPopUp";
import dbManager from "../../management/database-manager";

import { translateToValue } from "../../common/values";

function NoteItemUpdater({ setIsSelected, data, number, refreshData }) {
  const translateValue = useRef(new Animated.Value(0)).current;
  const [showPopUp, setShowPopUp] = useState(false)
  const [title, setTitle] = useState(data.title.trim())
  const [content, setContent] = useState(data.content);
  const [charsLeft, setCharsLeft] = useState(320)
  const popUp = () => {
    if(showPopUp == true){
        return <EditTextPopUp saveFunc={handleSave} placeholder={title} title="Edit Title" setShowPopUp={setShowPopUp}/>
    }
  }

  const handleTextChange = (text) => {
    const length = text.length
    if(length <= 320){
      setCharsLeft(320-length)
      setContent(text)
    }
  }

  const handleSave = (title, content = data.content) => {
    dbManager.updateContent("notesContent", data.title, title, content).then((titleExists) => {
      if(titleExists == true){
        Alert.alert("Error", "Each custom title must be unique, only contain letters and be less than 21 characters!", [{text:"OK"}])
      }else{
        setTitle(title)
        refreshData()
      }
    })
  }

  const handleTemplate = () => {
    dbManager.getTemplate("notesContent", number).then((template) => {
      setContent(template.content)
      setTitle(template.title)
    })
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
    handleTextChange(content)
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
      justifyContent:"flex-start",
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
        <EditableTitle title={title} setShowPopUp={setShowPopUp}/>
        <View style={styles.boxInput}>
          <TextInput
            numberOfLines={20}
            multiline={true}
            maxLength={320}
            placeholder="Enter message ..."
            textAlignVertical="top"
            value={content}
            onChangeText={(text)=>{handleTextChange(text)}}
            style={{opacity: 0.75}}
          />
          <Text style={styles.charsLeft}>{charsLeft} characters left</Text>
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
              onPress={()=> {handleSave(title, content)}}
            >
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, button, shadow, {backgroundColor: colors.secondary}]} onPress={()=> {handleTemplate()}}>
              <Text style={{ fontSize: 12, opacity: 0.8 }}>Template</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={()=> {setContent("")}}>
            <MaterialIcons name="clear" size={23} color={colors.red} />
          </TouchableOpacity>

        {popUp()}
      </Animated.View>
      
    </View>
    </TouchableNativeFeedback>
  );
}

export default NoteItemUpdater;
