import { useRef, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { colors, shadow } from "../common/styles";
import React from 'react'
import  Entypo from "react-native-vector-icons/Entypo"
function ProgressTaskBar({ labelList, dataList, progressPercent2 }) {
  const data = [
    { completed: true, label: "Start" },
    { completed: true, label: "Complete" },
    { completed: false, label: "Purchase" },
    { completed: false, label: "Share" },
  ];

  const moveProgressBarValue = useRef(new Animated.Value(0)).current;

  const progressBarWidth = Dimensions.get("window").width * 0.8 * .9;
  const progressPercent = () => {
    let total = 0;
    let numCompleted = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i].completed) {
        numCompleted++;
      }
      total++;
    }
    const incrementPercent = 100 / (total - 1);
    const completedPercent = numCompleted * incrementPercent;
    const barPercent = (completedPercent ) / 100;

    if(numCompleted == 0){
      incrementPercent * 1;
    }
    if(numCompleted == total || numCompleted == total - 1){
      return 1;
    }

    return barPercent;
  };
  const translateValue = progressBarWidth * progressPercent();

  const fadePink = "rgba(255, 220, 233, 1)";
  const darkerFadePinke = "rgba(255, 183, 197, 1)";
  const barHeight = 2;
  const completedMarkerHeight = 14;
  const incompleteMarkerHeight = 6;

  const CompleteCircle = ({ label }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.circleProgressMarker]}>
          <Entypo name={"check"} color="white" size={8} />
        </View>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };
  const IncompleteStartCircle = ({ label }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.circleProgressMarker]}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          />
        </View>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };
  const SmallCircle = ({ label }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={[
            styles.circleProgressMarker,
            {
              width: incompleteMarkerHeight,
              height: incompleteMarkerHeight,
              top: 0,
              backgroundColor: darkerFadePinke,
            },
          ]}
        />
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };

  useEffect(() => {
    Animated.spring(moveProgressBarValue, {
      toValue: translateValue,
      friction: 3,
      tension: 1,
      useNativeDriver: true,
    }).start();
  }, [translateValue]);
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      width: "82%",
      overflow: "hidden",
    },

    progressBarContainer: {
      height: barHeight,
      backgroundColor: fadePink,
      width: "90%",
      position: "absolute",
      overflow: "hidden",
      left: 15,
      top: 6,
    },
    progressBar: {
      height: barHeight,
      borderRadius: 10,
      width: "100%",
      left: "-105%",
      position: "absolute",
      backgroundColor: colors.secondary,
      transform: [{ translateX: moveProgressBarValue }],
    },
    circleProgressMarker: {
      backgroundColor: colors.secondary,
      width: completedMarkerHeight,
      height: completedMarkerHeight,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
    },

    labelText: {
      fontSize: 11,
      color: colors.darkGrey,
      top: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarContainer]}>
        <Animated.View style={styles.progressBar} />
      </View>

      <FlatList
        contentContainerStyle={{
          width: "100%",
          justifyContent: "space-between",
        }}
        scrollEnabled={false}
        data={data}
        renderItem={({ item, index }) => {
          if (item.completed == false) {
            if (index == 0) {
              return <IncompleteStartCircle label={item.label} />;
            } else {
              if (data[index - 1].completed == true) {
                return <IncompleteStartCircle label={item.label} />;
              }
            }
          }

          if (item.completed) {
            return <CompleteCircle label={item.label} />;
          }
          return <SmallCircle label={item.label} />;
        }}
        style={{ top: 0, left: -0.5 }}
        horizontal={true}
      />
    </View>
  );
}

export default ProgressTaskBar;
