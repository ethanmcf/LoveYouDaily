import { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import LookItemUpdater from "../../components/CreatorPages/LookItemUpdater";
import ContentList from "../../components/CreatorPages/ContentList";
import dbManager from "../../management/database-manager";
import ProgressHeader from "../../components/CreatorPages/ProgressHeader";
import React from 'react'
import { AppContext } from "../../management/globals";

function LookScreen(props) {
  const [itemSelectedIndex, setItemSelected] = useState(null);
  const [renderItem, setRenderItem] = useState(null);
  const [data, setData] = useState(null);
  const { signing, successful, loading } = useContext(AppContext);
  const [isLoading, setIsLoading] = loading

  const refreshData = () => {
    dbManager.getLookContent().then((contentData) => {
      setData(contentData);
    });
  };

  useEffect(() => {
    if (data == null) {
      setIsLoading(true)
      setRenderItem(null);
      refreshData();
    } else {
      setIsLoading(false)
      if (itemSelectedIndex != null) {
        setRenderItem(
          <View style={{ flex: 1 }}>
            <ProgressHeader title="Look" data={data} />
            <LookItemUpdater
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
            <ProgressHeader title="Look" data={data} />
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

export default LookScreen;
