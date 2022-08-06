import {useState} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { contentViewStyle, shadow } from "../../common/styles";
import NoteItemUpdater from '../../components/CreatorPages/NoteItemUpdater';
import ContentList from '../../components/CreatorPages/ContentList';
function NotesScreen(props) {
  const [itemSelected, setItemSelected] = useState(null);

  const data = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
  ];

  const renderItems = () => {
    if (itemSelected != null) {
      return <NoteItemUpdater setIsSelected={setItemSelected} number={itemSelected}/>;
    }
    return <ContentList data={data} setIsSelected={setItemSelected}/>;
  };

  return renderItems();
}

export default NotesScreen;