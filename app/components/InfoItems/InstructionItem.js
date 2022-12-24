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

function InstructionItem({iconName, info}) {
  const styles = StyleSheet.create({
    dash: {
      width: 23,
      height: 3,
      backgroundColor: colors.main,
      borderRadius: 3,
      marginLeft: 9,
    },
    itemContainer: {
      marginTop: 70,
      width: "90%",
      justifyContent: "flex-start",
      position: "absolute"
    },
    instructions:{
        opacity:0.7,
        color: "black",
        marginLeft: 0,
        fontSize: 12,
    }
  });
  return (
    <View style={[styles.itemContainer, {top: -10}]}>
    <Ionicons
      name={iconName}
      size={40}
      color={colors.secondary}
      style={{ opacity: 0.7 }}
    />
    <View style={styles.dash} />
    <Text style={styles.instructions}>{info}</Text>
  </View>
  );
}

export default InstructionItem;
