import { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Animated } from "react-native";
import { colors } from "../../common/styles";
import ProgressPercentBar from "../ProgressPercentBar";
import SignoutButton from "../SignoutButton";

function ProgressHeader({ title, data }) {
  const [percentToComplete, setPercentToComplete] = useState("100")
  const styles = StyleSheet.create({
    container: {
      height: 140,
      width: "100%",
      top: 0,
      backgroundColor: "white",
      justifyContent: "flex-end",

      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.3,
      elevation: 2,
    },
    label: {
      top: -25,
      fontSize: 10,
      color: colors.grey,
      paddingLeft: 30,
      fontWeight: "bold",
    },
    progressText: {
      top: -25,
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
      <Text style={styles.progressText}>{percentToComplete}% to complete</Text>

      <View style={{ paddingLeft: 30, top: -25 }}>
        <ProgressPercentBar data={data} setPercent={setPercentToComplete}/>
      </View>
    </SafeAreaView>
  );
}

export default ProgressHeader;
