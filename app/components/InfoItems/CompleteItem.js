
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
} from "react-native";


import BaseInfoItem from "./BaseInfoItem";
import { button, colors, shadow } from "../../common/styles";
import CustomInput from "../CustomInput";
import { Ionicons } from "@expo/vector-icons";
function CompleteItem({ setIsSelected }) {
  const data = [
    { name: "Happy anniversary!" },
    { name: "Happy valentines day!" },
    { name: "Happy Birthday!" },
    { name: "I love you!" },
    { name: "Happy anniversary!" },
    { name: "Happy valentines day!" },
    { name: "Happy Birthday!" },
    { name: "I love you!" },
  ];
  const [selectedReasonIndex, setSelectedReasonIndex] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState(false);
  const translateValue = useRef(new Animated.Value(0)).current;

  const translateToValue = () => {
    const windowHeight = Dimensions.get("window").width;
    return windowHeight;
  };

  const reverseAnimation = () => {
    Animated.timing(translateValue, {
      toValue: translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setIsSelected(null);
    });
  };

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: -translateToValue(),
      duration: 350,
      useNativeDriver: true,
    }).start();
  });

  const styles = StyleSheet.create({
    selectionContainer: {
      height: 35,
      width: 160,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.main,
      padding: 8,
      marginBottom: 9,
    },
    text: {
      fontWeight: "bold",
      fontSize: 12,
    },
    occasionText:{
      fontWeight:"bold",
      color:"dimgrey",
      left:-100,
      top:10
    }
  });

  return (
    <BaseInfoItem title="Complete " height={350} setIsSelected={setIsSelected}>
      {/* <View style={{ top: 0 }}>
        <CustomInput
          iconName="person"
          holderText="Partner's name"
          error={error}
          setError={setError}
          isPassword={false}
          setInput={setNameInput}
          errorInfo="No spaces or special characters."
          extraWidth={-10}
        />
      </View> */}
      <Text style={styles.occasionText}>Occasion:</Text>
      <View
        style={{
          top: 10,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          contentContainerStyle={{
            padding: 10,
          }}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.selectionContainer,
                  shadow,
                  {
                    backgroundColor:
                      index == selectedReasonIndex ? colors.secondary : "white",
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
                      color: index == selectedReasonIndex ? "white" : "dimgrey",
                      fontWeight:
                        index == selectedReasonIndex ? "bold" : "normal",
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </BaseInfoItem>
  );
}

export default CompleteItem;
