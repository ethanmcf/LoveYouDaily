import { useState, useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import InfoList from "../../components/CreatorPages/InfoList";
import StartItem from "../../components/InfoItems/StartItem";
import PartnerItem from "../../components/InfoItems/PartnerItem";

import EditTextPopUp from "../../components/CreatorPages/EditTextPopUp";
import dbManager from "../../management/database-manager";
import ShareCodePopUp from "../../components/CreatorPages/ShareCodePopUp";

function HomeScreen(props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("error");

  const [showNamePopUp, setShowNamePopUp] = useState(false);
  const [showCodePopUp, setShowCodePopUp] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const renderItems = () => {
    if (itemSelected == 0) {
      return (
        <StartItem title="Start" height={200} setIsSelected={setItemSelected} />
      );
    } else if (itemSelected == 1) {
      return <PartnerItem setIsSelected={setItemSelected} />;
    } else if (itemSelected == 3) {
      return <InfoContainer message="cool" setIsSelected={setItemSelected} />;
    } else {
      return <InfoList setIsSelected={setItemSelected} />;
    }
  };

  handleNameUpdate = (name) => {
    dbManager.setPartnerName(name)
  };

  useEffect(() => {
    if (!showNamePopUp) {
      setItemSelected(null);
    }
  }, [showNamePopUp]);

  useEffect(() => {
    if (!showCodePopUp) {
      setItemSelected(null);
    }
  }, [showCodePopUp]);

  useEffect(() => {
    if (itemSelected == 2) {
      dbManager.getPartnerName().then((name) => {
        setName(name == ""  ? null : name);
        setShowNamePopUp(true);
      });
    } else if (itemSelected == 4) {
      dbManager.getCode().then((theCode) => {
        setCode(theCode)
        setShowCodePopUp(true);
      })
      
    }
  }, [itemSelected]);

  return (
    <View style={{ flex: 1 }}>
      {renderItems()}
      {showNamePopUp ? (
        <EditTextPopUp
          saveFunc={handleNameUpdate}
          noTextHolder={"Enter name"}
          placeholder={name}
          title="Patner's Name"
          setShowPopUp={setShowNamePopUp}
          style={{ alignSelf: "center" }}
        />
      ) : null}
      {showCodePopUp ? (
        <ShareCodePopUp
          code={code}
          setShowPopUp={setShowCodePopUp}
          style={{ alignSelf: "center" }}
        />
      ) : null}
    </View>
  );
}

export default HomeScreen;
