import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { button, colors } from "../../common/styles";
import BaseInfoItem from "./BaseInfoItem";
import Ionicons from "react-native-vector-icons/Ionicons"
import React from 'react'

function StartItem({ setIsSelected }) {
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    dash: {
      width: 13,
      height: 3,
      backgroundColor: colors.main,
      borderRadius: 3,
      marginLeft: 12,
    },
    itemContainer: {
      width: "90%",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 27,
    },
    instructions:{
        opacity:0.7,
        color: "black",
        marginLeft: 10,
        fontSize: 12,
    }
  });
  return (
    <BaseInfoItem
      title="Instructions"
      height={300}
      setIsSelected={setIsSelected}
    >
      <View style={[styles.itemContainer, {top: -10}]}>
        <Ionicons
          name="image"
          size={40}
          color={colors.secondary}
          style={{ opacity: 0.7 }}
        />
        <View style={styles.dash} />
        <Text style={styles.instructions}>Testing</Text>
      </View>

      <View style={[styles.itemContainer, {top: -5}]}>
        <Ionicons
          name="reader"
          size={35}
          color={colors.secondary}
          style={{ opacity: 0.7, marginLeft: 2 }}
        />
        <View style={[styles.dash, {marginLeft:15}]} />
        <Text style={styles.instructions}>Testing</Text>
      </View>

      <View style={[styles.itemContainer, {top: -2}]}>
        <Ionicons
          name="volume-low"
          size={40}
          color={colors.secondary}
          style={{ opacity: 0.7 }}
        />
        <View style={[styles.dash]} />
        <Text style={styles.instructions}>Testing</Text>
      </View>
    </BaseInfoItem>
  );
}

export default StartItem;
