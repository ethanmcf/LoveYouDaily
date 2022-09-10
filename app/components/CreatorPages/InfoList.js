import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import InfoItem from "./InfoItem";
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from "../../common/styles";

function InfoList({ setIsSelected }) {
  const [selected, setSelected] = useState(false);
  const [indexToAnimate, setIndexToAnimate] = useState(null);
  const itemOpacityAnim = useRef(new Animated.Value(1)).current;
  const itemTranslateAnim = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 115,
      overflow: "hidden",
    },
    icon: {
      position: "absolute",
      right: 10,
      opacity: 0.8,
    },
  });

  const itemData = [
    {
      title: "Instructions",
      message: "Click to view instructions",
      icon: (
        <Ionicons
          name="information-circle-outline"
          size={25}
          color={colors.secondary}
          style={styles.icon}
        />
      ),
    },
    {
      title: "Partner Info",
      secondTitle: " - Part 1",
      message: "Click to choose the occasion",
      icon: (
        <AntDesign
          name="form"
          size={23}
          color={colors.secondary}
          style={styles.icon}
        />
      ),
    },
    {
      title: "Partner Info",
      secondTitle: " - Part 2",
      message: "Click to set your partner's name",
      icon: (
        <AntDesign
          name="form"
          size={23}
          color={colors.secondary}
          style={styles.icon}
        />
      ),
    },
    {
      title: "Purchase",
      message: "Click to finalize completion",
      icon: (
        <Ionicons
          name="card-outline"
          size={25}
          color={colors.secondary}
          style={styles.icon}
        />
      ),
    },
    {
      title: "Shareable Code",
      message: "Click for code to give to your partner",
      icon: (
        <MaterialIcons
          name="content-copy"
          size={23}
          color={colors.secondary}
          style={styles.icon}
        />
      ),
    },
  ];

  let animatedValues = [];
  itemData.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  const animate = () => {
    let animations = [];
    itemData.forEach((_, i) => {
      animations[i] = Animated.timing(animatedValues[i], {
        toValue: -400,
        duration: 500,
        useNativeDriver: true,
      });
    });

    Animated.sequence([
      Animated.stagger(75, animations),

      Animated.parallel([
        Animated.timing(itemTranslateAnim, {
          toValue: 200,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(itemOpacityAnim, {
          toValue: 0.05,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIndexToAnimate(null);
      setIsSelected(indexToAnimate);
    });
  };

  useEffect(() => {
    //Only animate if index is not 2 or 4 or null
    if(indexToAnimate==2 || indexToAnimate==4){
        setIndexToAnimate(null)
        setIsSelected(indexToAnimate)
    }else if (indexToAnimate != null) {
      animate();
    }
  }, [indexToAnimate]);

  return (
    <View style={styles.container}>
      <FlatList
        data={itemData}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              key={index}
              style={{
                opacity: index == indexToAnimate ? itemOpacityAnim : 1,
                transform: [
                  {
                    translateX: index == indexToAnimate ? itemTranslateAnim : 0,
                  },
                  {
                    translateX:
                      index != indexToAnimate ? animatedValues[index] : 0,
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => [
                  //Disable press unless index selected is 2 or 4
                  setSelected((index != 4 && index != 2)),
                  setIndexToAnimate(index),
                ]}
                disabled={selected}
              >
                <InfoItem
                  title={item.title}
                  icon={item.icon}
                  message={item.message}
                  secondTitle={item.secondTitle}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

export default InfoList;
