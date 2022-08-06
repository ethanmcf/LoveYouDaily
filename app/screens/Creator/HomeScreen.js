import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { contentViewStyle, shadow } from "../../common/styles";
import InfoList from "../../components/CreatorPages/InfoList";
import StartItem from "../../components/InfoItems/StartItem";
import CompleteItem from "../../components/InfoItems/CompleteItem";
import BaseInfoItem from "../../components/InfoItems/BaseInfoItem";

function HomeScreen(props) {
  const [itemSelected, setItemSelected] = useState(null);

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

  return renderItems();
}

export default HomeScreen;
