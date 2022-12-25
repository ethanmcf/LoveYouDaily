import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../common/styles";
import ProgressTaskBar from "../ProgressTaskBar";
import Ionicons from "react-native-vector-icons/Ionicons"
import SideMenu from "../SideMenu";
import dbManager from "../../management/database-manager";

function HomeHeader() {
  const [sideMenuShown, setSideMenuShown] = useState(false)
  const [name, setName] = useState("");
  const userName = () => {
    dbManager.getCreatorName().then(function (name) {
      setName(` ${name}`);
    });
  };
  useEffect(() => {
    userName();
  });

  const tasksLeft = 4;
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
      top: -5,
      fontSize: 10,
      color: colors.grey,
      paddingLeft: 30,
      fontWeight: "bold",
    },
    progressText: {
      top: -5,
      fontSize: 25,
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.7,
      paddingLeft: 30,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Welcome{name},</Text>
      <Text style={styles.progressText}>{tasksLeft} to complete</Text>
      <View style={{ paddingLeft: 30, top: -15 }}>
        <ProgressTaskBar />
      </View>
      <View
        style={{
          width: 2,
          height: "90%",
          backgroundColor: colors.grey,
          position: "absolute",
          right: 50,
          bottom: "8%",
          opacity: 0.35,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 14,
          bottom: "43%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={()=> {setSideMenuShown(true)}}
      >
        <Ionicons
          name="settings-sharp"
          size={23}
          color={colors.secondary}
          style={{ opacity: 0.7 }}
        />
        
      </TouchableOpacity>
      {sideMenuShown == true ? <SideMenu setShow={setSideMenuShown}/> : null}
    </SafeAreaView>
  );
}

export default HomeHeader;
