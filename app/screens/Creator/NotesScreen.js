import { useEffect, useState } from "react";
import { View } from "react-native";
import NoteItemUpdater from "../../components/CreatorPages/NoteItemUpdater";
import ContentList from "../../components/CreatorPages/ContentList";
import dbManager from "../../management/database-manager";
import ProgressHeader from "../../components/CreatorPages/ProgressHeader";

function NotesScreen(props) {
  const [itemSelectedIndex, setItemSelected] = useState(null);
  const [renderItem, setRenderItem] = useState(null);
  const [data, setData] = useState(null);

  const refreshData = () => {
    dbManager.getContent("notesContent").then((contentData) => {
      setData(contentData)
    });
  };


  useEffect(() => {
    if (data == null) {
      setRenderItem(null);
      refreshData()
    } else {
      if (itemSelectedIndex != null) {
        setRenderItem(
          <View style={{ flex: 1 }}>
            <ProgressHeader title="Love Notes" data={data} />
            <NoteItemUpdater
              data={data[itemSelectedIndex - 1]}
              setIsSelected={setItemSelected}
              number={itemSelectedIndex}
              refreshData={refreshData}
            />
          </View>
        );
      } else {
        setRenderItem(
          <View style={{ flex: 1 }}>
            <ProgressHeader title="Love Notes" data={data} />
            <ContentList
              data={data}
              setIsSelected={setItemSelected}
              setRender={setRenderItem}
            />
          </View>
        );
      }
    }
  }, [itemSelectedIndex, data]);

  return renderItem;
}

export default NotesScreen;
