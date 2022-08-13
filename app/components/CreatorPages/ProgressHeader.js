import { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Animated } from "react-native";
import { colors } from "../../common/styles";
import ProgressPercentBar from "../ProgressPercentBar";
function ProgressHeader({ title, data }) {
  const tasksLeft = 20;
  const styles = StyleSheet.create({
    container: {
      height: 140,
      width: "100%",
      top: 0,
      backgroundColor: "white",
      justifyContent: "flex-start",

      paddingTop: 25,
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.3,
      elevation: 2,
    },
    label: {
      fontSize: 10,
      color: colors.grey,
      fontWeight: "bold",
      paddingLeft: 30,
    },
    progressText: {
      fontSize: 25,
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.7,
      paddingLeft: 30,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{title} progress</Text>
      <Text style={styles.progressText}>{tasksLeft}% to complete</Text>
      <View style={{paddingLeft: 30}}>
      <ProgressPercentBar
        data={data}
      />
      </View>
    </SafeAreaView>
  );
}

export default ProgressHeader;
