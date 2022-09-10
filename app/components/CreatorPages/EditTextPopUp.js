import { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import { colors } from "../../common/styles";
import React from 'react'
function EditTextPopUp({ setShowPopUp, title, placeholder, noTextHolder, saveFunc, style }) {
  const translateUpValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const [input, setInput] = useState("");

  const translateToValue = () => {
    const screen = Dimensions.get("window").height - 140 - 14 - 140;
    return -(screen * 0.95);
  };
  useEffect(() => {
    Animated.timing(translateUpValue, {
      toValue: translateToValue(),
      duration: 200,
      useNativeDriver: true,
    }).start();
    setInput(placeholder)
  }, [null]);

  const reverseAnimation = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(translateUpValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPopUp(false);
    });
  };

  const styles = StyleSheet.create({
    focusContainer:{
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height*4,
      top: translateToValue(),
      position:"absolute",
    },
    container: {
      borderRadius: 10,
      width: 210,
      height: 210,
      top: 10,
      top: "100%",
      backgroundColor: colors.main,
      position: "absolute",
      justifyContent: "space-around",
      alignItems: "center",
      opacity: opacityValue,
      transform: [{ translateY: translateUpValue }],
    },
    font: { color: "white", fontWeight: "bold", fontSize: 14 },
    saveButton: {
      borderRadius: 40,
      width: "70%",
      height: 35,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "80%",
      height: 30,
      backgroundColor: "rgba(250,250,250,0.9)",
      paddingLeft: 12,
      borderRadius: 40,
      color: "grey",
      fontWeight: "bold",
    },
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.focusContainer}/>
      <Text style={styles.font}>{title}</Text>
      <TextInput
        style={styles.input}
        autoFocus={true}
        value={input}
        onChangeText={(text) => [setInput(text)]}
        placeholder={noTextHolder}
      />
      <TouchableOpacity style={styles.saveButton} onPress={()=> {[saveFunc(input.trim()), reverseAnimation()]}}>
        <Text style={[styles.font, { color: colors.main }]}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 20, top: -10 }}
        onPress={() => reverseAnimation()}
      >
        <Text style={styles.font}>Cancel</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default EditTextPopUp;
