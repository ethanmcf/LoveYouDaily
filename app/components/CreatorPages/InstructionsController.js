import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import InstructionItem from "../InfoItems/InstructionItem";
import { colors } from "../../common/styles";
import BaseInfoItem from "../InfoItems/BaseInfoItem";
import Ionicons from "react-native-vector-icons/Ionicons"

function InstructionController({setIsSelected}) {
    const iconNames = ["image", "reader", "volume-low"]
    const instructions = ["Look info", "Write info", "Listen info"]
    const [index, setIndex] = useState(0)
    const styles = StyleSheet.create({
        nextButton: {
            bottom: 5,
            right: 10,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
          },
        indexContainer: {
            top:50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            position: "absolute",
            alignSelf:"center",
            width: "37%",
        },
        indexCircle: {
            width: 7,
            height: 7, 
            borderRadius: 25,
            backgroundColor: "grey"
        }
      });
      return (
        <BaseInfoItem
          title="Instructions"
          height={300}
          setIsSelected={setIsSelected}
        >
            <InstructionItem iconName={iconNames[index]} info={instructions[index]}/>
            <View style={styles.indexContainer}>
                {/* <Ionicons name="image" size={20} color={colors.main} style={{opacity: index == 0 ? 1 : 0.5, transform: [{scale: index == 0 ? 1.3 : 1}]}}/>
                <Ionicons name="reader" size={20} color={colors.main} style={{opacity: index == 1 ? 1 : 0.5, transform: [{scale: index == 1 ? 1.3 : 1}]}}/>
                <Ionicons name="volume-low" size={20} color={colors.main} style={{opacity: index == 2 ? 1 : 0.5, transform: [{scale: index == 2 ? 1.3 : 1}]}}/> */}
                <View style={[styles.indexCircle, {opacity: index == 0 ? 1 : 0.3}]}/>
                <View style={[styles.indexCircle,{opacity: index == 1 ? 1 : 0.3}]}/>
                <View style={[styles.indexCircle,{opacity: index == 2 ? 1 : 0.3}]}/>
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => setIndex((index + 1) % 3)}
            >
                
                <Text style={{ fontWeight: "bold", fontSize:16, right: 5, color: colors.main }}>
                Next
                </Text>
                <Ionicons name="arrow-forward" size={25} color={colors.main} />
            </TouchableOpacity>
        </BaseInfoItem>
      );
}

export default InstructionController;