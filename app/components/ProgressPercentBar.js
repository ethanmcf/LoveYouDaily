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

function ProgressPercentBar({data}) {
  const moveProgressBarValue = useRef(new Animated.Value(0)).current;

  const progressBarWidth = Dimensions.get("window").width * 0.833;
  const progressPercent = () => {
    let total = 0;
    let completed = 0;
    for(i=0; i < data.length; i++){
        if (data[i].completed){
          completed++;
        }
        total++;
    }
    return completed/total;
  };
  const translateValue = progressBarWidth * progressPercent();

  const barHeight = 12;
  const markerHeight = 6;

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
      marginTop: 10,
      width: "90.2%",
      overflow: "hidden",
      borderRadius: 40,
      height: barHeight,
    },
    progressBarContainer: {
      height: barHeight,
      backgroundColor: "rgba(255, 182, 193, 0.5)",
      borderRadius: 25,
      position:"absolute",
      width: "100%",
    },
    progressBar: {
      height: barHeight,
      borderRadius: 10,
      width: "100%",
      left: "-100%",
      position:"absolute",
      backgroundColor: colors.secondary,
      transform: [{ translateX: moveProgressBarValue }],
    },
    circleProgressMarker: {
      backgroundColor: "white",
      width: markerHeight,
      height: markerHeight,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      opacity: 0.5,
      top: 3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarContainer]}>
        <Animated.View style={styles.progressBar} />
      </View>
      <FlatList
        contentContainerStyle={{
          width: "90%",
          justifyContent: "space-around",
          left:20,
        }}
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => {
            if (item.completed) {
              return <View style={styles.circleProgressMarker} />;
            } else {
              return (
                <View
                  style={[
                    styles.circleProgressMarker,
                    { backgroundColor: colors.secondary, opacity: 1 },
                  ]}
                />
              );
            }
        }}
        horizontal={true}
      />
    </View>
  );
}

export default ProgressPercentBar;
