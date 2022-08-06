import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { contentViewStyle, shadow } from "../../common/styles";
import ContentList from "../../components/CreatorPages/ContentList";
import LookItemUpdater from "../../components/CreatorPages/LookItemUpdater";

function LookScreen(props) {
  const [itemSelected, setItemSelected] = useState(null);

  const data = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
  ];

  const renderItems = () => {
    if (itemSelected != null) {
      return <LookItemUpdater setIsSelected={setItemSelected} number={itemSelected}/>;
    }
    return <ContentList data={data} setIsSelected={setItemSelected}/>;
  };

  return renderItems();
}

export default LookScreen;
