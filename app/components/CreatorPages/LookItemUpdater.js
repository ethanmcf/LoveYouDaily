import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { button, shadow, colors } from "../../common/styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import EditableTitle from "./EditableTitle";
import EditTitlePopUp from "./EditTitlePopUp";

function LookItemUpdater({ setIsSelected, number }) {
  const translateValue = useRef(new Animated.Value(0)).current;
  const imageRatio = 1.33;

  const imageDimensions = () => {
    const windowWidth = Dimensions.get("window").width * 0.95;
    const windowHeight = Dimensions.get("window").height * 0.95;
    const ratio = (windowHeight - 140 - 2 - 145 + 15) / (windowWidth + 55);
    const height = 200 * imageRatio * ratio;
    const width = 140 * imageRatio * ratio;

    return { height: height, width: width };
  };
  const [showPopUp, setShowPopUp] = useState(false)
  const popUp = () => {
    if(showPopUp == true){
        return <EditTitlePopUp title={"Title"} setShowPopUp={setShowPopUp}/>
    }
  }
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
      justifyContent: "center",
    },

    saveButton: {
      width: 100,
      height: 25,
      position:"absolute",
      bottom: 25,
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

    uploadImageContainer: {
      width: imageDimensions().width,
      height: imageDimensions().height,
      borderWidth: 2,
      borderRadius: 12,
      borderColor: colors.main,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
    },

    clearButton:{
      right: 25,
      position:"absolute",
      bottom: 25,
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
        <EditableTitle index={number} type="Look" title="Looking" setShowPopUp={setShowPopUp}/>

        <Animated.View style={styles.uploadImageContainer}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Ionicons name="cloud-upload" size={45} color={colors.main} />
            <Text style={{ fontSize: 10, color: colors.grey }}>
              Upload image here
            </Text>
          </TouchableOpacity>
        </Animated.View>



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
          <TouchableOpacity style={styles.clearButton}>
            <MaterialIcons name="clear" size={23} color={colors.red} />
          </TouchableOpacity>

              {popUp()}
      </Animated.View>
    </View>
  );
}

export default LookItemUpdater;
