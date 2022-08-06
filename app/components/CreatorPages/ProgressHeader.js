import { useEffect } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
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
      alignItems: "flex-start",
      justifyContent: "center",
      paddingLeft: 30,

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
    },
    progressText: {
      fontSize: 25,
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.7,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title} progress</Text>
      <Text style={styles.progressText}>{tasksLeft}% to complete</Text>
      <ProgressPercentBar
        data={data}
      />
    </View>
  );
}

export default ProgressHeader;
