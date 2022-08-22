import {useEffect, useRef} from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, shadow } from "../../common/styles";
import DayBubble from "./DayBubble";

function UserHeader(props) {
  const data = [
    { day: 1, current: false },
    { day: 2, current: false },
    { day: 3, current: false },
    { day: 4, current: false },
    { day: 5, current: true },
    { day: 6, current: false },
    { day: 7, current: false },
    { day: 8, current: false },
    { day: 9, current: false },
    { day: 10, current: false },
    { day: 11, current: false },
    { day: 12, current: false },
    { day: 13, current: false },
    { day: 14, current: false },
    { day: 15, current: false },
  ];

  const dayListRef = useRef()
  
  const currentDayIndex = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].current == true) {
        return i;
      }
    }
    return 0;
  };
  useEffect(()=>{
    dayListRef.current.scrollToOffset({ animated: true, offset: currentDayIndex() * 26})
  })
  
  const styles = StyleSheet.create({
    container: {
      height: 140,
      width: "100%",
      top: -2,
      backgroundColor: "white",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingLeft: 30,

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
    dayText: {
        position:"absolute",
      color: colors.grey,
      fontWeight:"bold",
      top: 101,
      left: 30
    },
    dayList: {
        height: 32,
        left: 70,
        position: "absolute",
        top: 99,
        width: Dimensions.get("window").width - 75
    }

  });
  return (
    <View style={[styles.container]}>
      <Text style={styles.label}>Happy anniversary,</Text>
      
      <Text style={styles.progressText}>Danielle Sacks</Text>
      <Text style={styles.dayText}>Day:</Text>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
        }}
        ref={dayListRef}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <DayBubble
              dayNumber={item.day}
              current={item.current}
              completed={index < currentDayIndex() ? true : false}
            />
          );
        }}
        horizontal={true}
        style={styles.dayList}
      />
      
      <TouchableOpacity style={{position:"absolute", right: 8, top: 53, justifyContent:"center", alignItems:"center"}}>
        <Ionicons name="settings" size={25} color={colors.secondary} style={{opacity: 0.9}}/>
      </TouchableOpacity>
    </View>
  );
}

export default UserHeader;
