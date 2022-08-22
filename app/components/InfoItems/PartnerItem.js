import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";

import BaseInfoItem from "./BaseInfoItem";
import { button, colors, shadow } from "../../common/styles";
import CustomInput from "../CustomInput";
import { dbManager } from "../../management/globals";

function PartnerItem({ setIsSelected }) {
  const data = [
    { name: "Anniversary", description: "Happy anniversary" },
    { name: "Valentines", description: "Happy valentines day" },
    { name: "Birthday", description: "Happy Birthday" },
    { name: "Love", description: "I love you" },
    { name: "Appreciation", description: "Thank you" },
    { name: "Apology", description: "I'm sorry" },
    { name: "Custom" },
  ];
  const [selectedReasonIndex, setSelectedReasonIndex] = useState(0);

  const [occasionInput, setOccasionInput] = useState("");
  const [occasionError, setOccasionError] = useState(false);

  const translateValue = useRef(new Animated.Value(0)).current;

  getSavedIndex = () => {
    dbManager.getOccasion().then((occasion) => {
      let occasionIndex = null;

      data.forEach((item, index) => {
        if (item.description == occasion) {
          occasionIndex = index;
        }
      });

      setSelectedReasonIndex(
        occasionIndex != null ? occasionIndex : data.length - 1
      );
    });
  };

  const translateToValue = () => {
    const windowHeight = Dimensions.get("window").width;
    return windowHeight;
  };

  handleOccasionUpdate = () => {
    let occasion;
    if (selectedReasonIndex == data.length - 1) {
      occasion = occasionInput;
    } else {
      occasion = data[selectedReasonIndex].description;
    }
    dbManager.setOccasion(occasion);
  };

  useEffect(() => {
    getSavedIndex();
    Animated.timing(translateValue, {
      toValue: -translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [null]);

  const styles = StyleSheet.create({
    selectionContainer: {
      height: 40,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.main,
      padding: 8,
      marginBottom: 10,
      marginRight: 10,
    },
    text: {
      fontWeight: "bold",
      fontSize: 12,
    },
    semiTitleText: {
      fontWeight: "bold",
      color: "dimgrey",
    },
    titleUnderline: {
      width: 100,
      height: 2,
      backgroundColor: colors.main,
      opacity: 0.6,
    },
    saveButton: {
      bottom: 9,
      right: 25,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
    },
  });

  return (
    <BaseInfoItem
      title="Select Occasion"
      height={350}
      setIsSelected={setIsSelected}
    >
      <View
        style={{
          height: 225,
          width: "100%",
          top: selectedReasonIndex == data.length - 1 ? -20 : 12,
        }}
      >
        <FlatList
          contentContainerStyle={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          data={data}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
                scrollEnabled={false}
              >
                <TouchableOpacity
                  style={[
                    styles.selectionContainer,
                    shadow,
                    {
                      backgroundColor:
                        index == selectedReasonIndex
                          ? colors.secondary
                          : "white",
                      borderColor:
                        index == selectedReasonIndex
                          ? colors.secondary
                          : colors.main,
                    },
                  ]}
                  onPress={() => {
                    setSelectedReasonIndex(index);
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          index == selectedReasonIndex ? "white" : "dimgrey",
                        fontWeight:
                          index == selectedReasonIndex ? "bold" : "normal",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            );
          }}
        />
        <CustomInput
          iconName="build"
          holderText="e.g. Merry Christmas"
          error={occasionError}
          setError={setOccasionError}
          isPassword={false}
          setInput={setOccasionInput}
          errorInfo="No spaces or special characters."
          extraWidth={10}
          style={{
            left: 6,
            bottom: -29,
            position: "absolute",
            opacity: selectedReasonIndex == data.length - 1 ? 1 : 0,
          }}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            left: 5,
            color: colors.main,
          }}
          onPress={() => {
            handleOccasionUpdate();
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </BaseInfoItem>
  );
}

export default PartnerItem;
