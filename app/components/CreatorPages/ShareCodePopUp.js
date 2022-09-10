import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TextInput,
} from "react-native";
import React from 'react'
import { useState, useRef, useEffect, createRef } from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { colors } from "../../common/styles";
import Clipboard from "@react-native-clipboard/clipboard";

const ShareCodePopUp = ({ setShowPopUp, code, style }) => {
  const translateUpValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const inputRef = createRef();

  const translateToValue = () => {
    const screen = Dimensions.get("window").height - 140 - 14 - 140;
    return -(screen * 0.95);
  };

  const copyToClipboard = () => {
    Clipboard.setString(code);
  };

  useEffect(() => {
    Animated.timing(translateUpValue, {
      toValue: translateToValue(),
      duration: 200,
      useNativeDriver: true,
    }).start();
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
    focusContainer: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 4,
      top: translateToValue(),
      position: "absolute",
    },
    container: {
      borderRadius: 10,
      width: 210,
      height: 170,
      top: 10,
      top: "100%",
      backgroundColor: colors.main,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      opacity: opacityValue,
      transform: [{ translateY: translateUpValue }],
    },
    font: {
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
    },
    codeContainer: {
      width: "100%",
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    codeText: {
      width: "60%",
      height: 30,
      backgroundColor: "rgba(250,250,250,0.9)",
      color: "grey",
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 7,
      left: -10,
    },
    okButton: {
      borderRadius: 40,
      width: "70%",
      height: 30,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    copyFont: {
      fontSize: 10,
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.focusContainer} />

      <Text style={[styles.font, { top: -20, fontSize: 14 }]}>
        - Code for partner's login -
      </Text>

      <View style={styles.codeContainer}>
        <View style={styles.codeText}>
          <TextInput
            style={{ opacity: 0.8 }}
            value={code}
            focusable={true}
            selectTextOnFocus={true}
            selectionColor={colors.secondary}
            ref={inputRef}
          />
        </View>
        <TouchableOpacity
          style={{ right: -10, top: 2 }}
          onPress={() => {
            [copyToClipboard(), inputRef.current.focus()];
          }}
        >
          <MaterialIcons name="content-copy" size={23} color="white" />
          <Text style={styles.copyFont}>copy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[{ height: 20, bottom: -23 }, styles.okButton]}
        onPress={() => reverseAnimation()}
      >
        <Text style={[styles.font, { color: colors.main }]}>OK</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ShareCodePopUp;
