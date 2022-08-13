import { useEffect, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth"
import { AppContext } from "../../management/globals"; 
import { colors } from "../../common/styles";
import ProgressTaskBar from "../ProgressTaskBar";
function HomeHeader({}) {
  const tasksLeft = 4;
  const [isSigned, setIsSigned] = useContext(AppContext)
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

      paddingLeft: 30,
      fontWeight: "bold",
    },
    progressText: {
      fontSize: 25,

      paddingLeft: 30,
      fontWeight: "bold",
      color: colors.secondary,
      opacity: 0.7,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Home</Text>
      <Text style={styles.progressText}>{tasksLeft} to complete</Text>
      <View style={{paddingLeft: 30, top: -10}}>
      <TouchableOpacity style={{position:"absolute", right: 40, top: -10}} onPress={()=>[auth().signOut(), setIsSigned(!isSigned)]}>  
        <MaterialIcons name="logout" size={18} color={colors.grey}/>
      </TouchableOpacity>
      <ProgressTaskBar />
      </View>
    </SafeAreaView>
  );
}

export default HomeHeader;
