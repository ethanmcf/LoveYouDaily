import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../common/styles";
import InfoBox from "../InfoBox";

function CustomInput({
  iconName,
  holderText,
  error,
  setError,
  isPassword,
  setInput,
  errorInfo,
}) {
  //Animated values
  const borderAnimate = useRef(new Animated.Value(1)).current;
  const iconScaleValue = useRef(new Animated.Value(1)).current;

  //State
  const [showError, setShowError] = useState(false);
  const [borderColor, setBorderColor] = useState(colors.main);
  const [icon, setIcon] = useState(iconName);

  //Mounts/unmounts error message if ther is an error
  const theInfoBox = () => {
    if (showError) {
      return (
        <View style={styles.infoBox}>
          <InfoBox
            info={errorInfo}
            styled={{ colorFont: "white", isBold: true, mainColor: colors.red }}
          />
        </View>
      );
    }
    return null;
  };

  //Handles updating input style/infobox when an error is passed from sign in
  useEffect(() => {
    if (error) {
      setBorderColor(colors.red);
      setIcon("alert-circle");
      setShowError(true);
      
      //Animates error icon
      Animated.timing(iconScaleValue, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(iconScaleValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });

    } else {
      setBorderColor(colors.main);
      setIcon(iconName);
    }
  }, [error]);

  //Returns top distance of infobox depending on length of text
  getInfoBoxTopValue = () => {
    if (String(errorInfo).length > 56) {
      return -40;
    }
    return -27;
  };

  //Handles when user clicks on input
  handleClicked = () => {
    //Stop showing error
    setShowError(false);

    //Animate border for user interaction
    borderAnimate.setValue(0);
    Animated.timing(borderAnimate, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();
  };

  //Styles
  const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 40,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      width: 300,
      height: 40,
    },
    icon: {
      color: borderColor,
      marginRight: 3,
    },
    border: {
      transform: [
        {
          scaleX: borderAnimate,
        },
      ],
      width: 300,
      height: 3,
      backgroundColor: borderColor,
      position: "absolute",
      bottom: 0,
    },
    iconCont: {
      transform: [{ scale: iconScaleValue }],
    },
    infoBox: {
      position: "absolute",
      top: getInfoBoxTopValue(),
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.iconCont}>
        <TouchableOpacity
          disabled={!error}
          onPress={() => setShowError(!showError)}
        >
          <Ionicons style={styles.icon} name={icon} size={25} />
        </TouchableOpacity>
      </Animated.View>
      <TextInput
        onFocus={handleClicked}
        onChangeText={(text) => {
          [setError(false), setInput(text), setShowError(false)];
        }}
        style={styles.input}
        placeholder={holderText}
        secureTextEntry={isPassword}
      />
      <Animated.View style={styles.border} />
      {theInfoBox()}
    </View>
  );
}

export default CustomInput;
