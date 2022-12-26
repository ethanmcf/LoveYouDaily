import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { button, shadow, colors } from "../../common/styles";
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ImageCropPicker from "react-native-image-crop-picker";
import EditableTitle from "./EditableTitle";
import EditTextPopUp from "./EditTextPopUp";
import { translateToValue } from "../../common/values";
import dbManager from "../../management/database-manager";
import { AppContext } from "../../management/globals";

function LookItemUpdater({ setIsSelected, data, number, refreshData }) {
  const [currentImage, setCurrentImage] = useState(data.content);
  const [imageName, setImageName] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(data.title.trim());
  const [showPopUp, setShowPopUp] = useState(false);

  const { signing, successful, loading } = useContext(AppContext);
  const [success, setSucces] = successful;
  const [isLoading, setIsLoading] = loading

  const translateValue = useRef(new Animated.Value(0)).current;
  

  const imageDimensions = () => {
    const imageRatio = 1.33;
    const windowWidth = Dimensions.get("window").width * 0.95;
    const windowHeight = Dimensions.get("window").height * 0.95;
    const ratio = (windowHeight - 140 - 2 - 145 + 15) / (windowWidth + 55);
    const height = 200 * imageRatio * ratio;
    const width = 140 * imageRatio * ratio;
    return { height: height, width: width };
  };
  const popUp = () => {
    if (showPopUp == true) {
      return (
        <EditTextPopUp
          saveFunc={setCurrentTitle}
          placeholder={currentTitle}
          title="Edit Title"
          setShowPopUp={setShowPopUp}
          buttonName="Confirm"
        />
      );
    }
  };
  const uploadImageComp = () => {
    return (
      <Animated.View style={styles.uploadImageContainer}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            choosePhotoFromLibrary();
          }}
        >
          <Ionicons name="cloud-upload" size={45} color={colors.main} />
          <Text style={{ fontSize: 10, color: colors.grey }}>
            Upload image here
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const imageComp = () => {
    return (
      <Image
        source={{ uri: currentImage }}
        style={[
          {
            width: imageDimensions().width,
            height: imageDimensions().height,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: colors.main,
          },
        ]}
      />
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
  const handleDeleteImage = () => {
    rootDirectory = data.bucket
    dbManager
      .updateLookImage(rootDirectory, null, null)
      .then((successDelete) => {
        if(successDelete == true){
          setCurrentImage(null);
          setImageName(null);
          refreshData();
        }else{
          Alert.alert(
            "Error",
            "There was an issue removing your image, please try again later."
          );
        }
      })
  }
  const handleSave = () => {
    //Making sure title has proper length
    if (currentTitle.length > 21) {
      Alert.alert("Title Issue", "Each title must be less than 21 characters!");
    } else if (currentTitle.length == 0) {
      Alert.alert(
        "Title Issue",
        "Each title must contain at least one character!"
      );
    // Title is proper so db can be updated
    } else {
      rootDirectory = data.bucket
      dbManager.updateTitle("lookContent", rootDirectory, currentTitle)
      if(imageName != null){ //Checks if user has selected a new image (if not don't update image)
        dbManager
          .updateLookImage(rootDirectory, imageName, currentImage)
          .then((successfulUpload) => {
            //Error uploading image to db
            if (successfulUpload == false) {
              Alert.alert(
                "Error",
                "There was an issue uploading your image, please try again later."
              );
              setCurrentImage(null);
              setImageName(null);
              return //cut function off
            }
          })
      }
      setSucces(true);
      setTimeout(() => {
        refreshData();
      }, 2000);
    }
  };

  const handleTemplate = () => {
    
  }
  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        const filename = image.filename ? image.filename : image.path.substring(image.path.lastIndexOf('/') + 1)
        setImageName(filename);
        setCurrentImage(image.path);
      })
      .catch((error) => {});
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
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 25,
      left: 25,
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
      height: 28,
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
      position: "relative",
      alignSelf: "center",
      top: -7,
    },

    clearButton: {
      right: 25,
      position: "absolute",
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
        <EditableTitle title={currentTitle} setShowPopUp={setShowPopUp} />

        {currentImage == null ? uploadImageComp() : imageComp()}

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

export default LookItemUpdater;
