import { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import InfoList from "../../components/CreatorPages/InfoList";
import StartItem from "../../components/InfoItems/StartItem";
import CompleteItem from "../../components/InfoItems/CompleteItem";
import { MaterialIcons } from "@expo/vector-icons";

import auth from "@react-native-firebase/auth"
import { AppContext } from "../../management/globals"; 
import { colors } from "../../common/styles";

function HomeScreen(props) {
  const [itemSelected, setItemSelected] = useState(null);

  const [isSigned, setIsSigned] = useContext(AppContext)


  const data = [
    { title: "Start", completed: true },
    { title: "Complete", completed: true },
    { title: "Purchase", completed: false },
    { title: "Share", completed: false },
  ];

  const renderItems = () => {
    if (itemSelected == 0) {
      return <StartItem title="Start" height={200} setIsSelected={setItemSelected}/>;
    } else if (itemSelected == 1) {
      return <CompleteItem setIsSelected={setItemSelected}/>
    } else if (itemSelected == 2) {
      return <InfoContainer message="cool" setIsSelected={setItemSelected} />;
    } else if (itemSelected == 3) {
      return <InfoContainer message="cool" setIsSelected={setItemSelected} />;
    }

    return <InfoList data={data} setIsSelected={setItemSelected} />;
  };

  return (
    <View style={{flex:1}}>
    {renderItems()}
    </View>
    );
}

export default HomeScreen;
