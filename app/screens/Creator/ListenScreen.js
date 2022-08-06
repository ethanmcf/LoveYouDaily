import { useState } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
import { contentViewStyle, shadow } from "../../common/styles";
import ContentList from "../../components/CreatorPages/ContentList";
import ListenItemUpdater from "../../components/CreatorPages/ListenItemUpdater";
function ListenScreen(props) {
  const [itemSelected, setItemSelected] = useState(null);

  const data = [{ number: 1 }, { number: 2 }];

  const renderItems = () => {
    if (itemSelected != null) {
      return (
        <ListenItemUpdater
          setIsSelected={setItemSelected}
          number={itemSelected}
        />
      );
    }
    return <ContentList data={data} setIsSelected={setItemSelected} />;
  };

  return renderItems();
}

export default ListenScreen;
