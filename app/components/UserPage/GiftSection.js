import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { button, colors, shadow } from "../../common/styles";
import BaseGift from "../Gifts/BaseGift";
import React from 'react'

function GiftSection({ navigation, setIsSelected, index }) {
  const [pressDisabled, setPressDisabled] = useState(false);
  const [giftsVanish, setGiftsVanish] = useState({
    notes: false,
    listen: false,
    look: false,
  });

  const [noteInteraction, setNoteInteraction] = useState({
    didSelect: false,
    didPressIn: false,
  });
  const [listenInteraction, setListenInteraction] = useState({
    didSelect: false,
    didPressIn: false,
  });
  const [lookInteraction, setLookInteraction] = useState({
    didSelect: false,
    didPressIn: false,
  });

  const backgroundOpacityValue = useRef(new Animated.Value(0)).current;
  const noteTransforms = {
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
    shrink: useRef(new Animated.Value(1)).current,
    fade: useRef(new Animated.Value(1)).current,
  };
  const lookTransforms = {
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
    shrink: useRef(new Animated.Value(1)).current,
    fade: useRef(new Animated.Value(1)).current,
  };
  const listenTransforms = {
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
    shrink: useRef(new Animated.Value(1)).current,
    fade: useRef(new Animated.Value(1)).current,
  };

  const runShrinkAnimation = (shrink, shrinkValue) => {
    if (shrink) {
      Animated.timing(shrinkValue, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(shrinkValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const NotesGift = () => {
    if (giftsVanish.notes == false) {
      return (
        <TouchableNativeFeedback
          onPressIn={() => [
            runShrinkAnimation(true, noteTransforms.shrink),
            setNoteInteraction({ didSelect: false, didPressIn: true }),
          ]}
          onPressOut={() => [
            runShrinkAnimation(false, noteTransforms.shrink),
            setNoteInteraction({ didSelect: false, didPressIn: false }),
          ]}
          onPress={() => {
            runSelectedAnimation("notes"), setPressDisabled(true);
          }}
          disabled={pressDisabled}
        >
          <Animated.View style={styles.notesGift}>
            <BaseGift
              iconName="reader"
              timedDelay={0}
              isSelected={noteInteraction.didSelect}
              isPressedIn={noteInteraction.didPressIn}
            />
          </Animated.View>
        </TouchableNativeFeedback>
      );
    }
    return null;
  };
  const LookGift = () => {
    if (giftsVanish.look == false) {
      return (
        <TouchableNativeFeedback
          onPressIn={() => [
            runShrinkAnimation(true, lookTransforms.shrink),
            setLookInteraction({ didSelect: false, didPressIn: true }),
          ]}
          onPressOut={() => [
            runShrinkAnimation(false, lookTransforms.shrink),
            setLookInteraction({ didSelect: false, didPressIn: false }),
          ]}
          onPress={() => {
            runSelectedAnimation("look"), setPressDisabled(true);
          }}
          disabled={pressDisabled}
        >
          <Animated.View style={styles.lookGift}>
            <BaseGift
              iconName="image"
              timedDelay={0}
              isSelected={lookInteraction.didSelect}
              isPressedIn={lookInteraction.didPressIn}
            />
          </Animated.View>
        </TouchableNativeFeedback>
      );
    }
    return null;
  };
  const ListenGift = () => {
    if (giftsVanish.listen == false) {
      return (
        <TouchableNativeFeedback
          onPressIn={() => [
            runShrinkAnimation(true, listenTransforms.shrink),
            setListenInteraction({ didSelect: false, didPressIn: true }),
          ]}
          onPressOut={() => [
            runShrinkAnimation(false, listenTransforms.shrink),
            setListenInteraction({ didSelect: false, didPressIn: false }),
          ]}
          onPress={() => {
            runSelectedAnimation("listen"), setPressDisabled(true);
          }}
          disabled={pressDisabled}
        >
          <Animated.View style={styles.listenGift}>
            <BaseGift
              iconName="volume-low"
              timedDelay={0}
              isSelected={listenInteraction.didSelect}
              isPressedIn={listenInteraction.didPressIn}
            />
          </Animated.View>
        </TouchableNativeFeedback>
      );
    }
    return null;
  };

  const runSelectedAnimation = (gift) => {
    let interaction;
    let transforms;
    if (gift == "notes") {
      interaction = setNoteInteraction;
      transforms = noteTransforms;
      interaction({ didPressIn: true, didSelect: false });
      setGiftsVanish({
        notes: false,
        listen: true,
        look: true,
      });
    } else if (gift == "listen") {
      transforms = listenTransforms;
      interaction = setListenInteraction;
      interaction({ didPressIn: true, didSelect: false });
      setGiftsVanish({
        notes: true,
        listen: false,
        look: true,
      });
    } else if (gift == "look") {
      transforms = lookTransforms;
      interaction = setLookInteraction;
      interaction({ didPressIn: true, didSelect: false });
      setGiftsVanish({
        notes: true,
        listen: true,
        look: false,
      });
    }
    //Animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(transforms.y, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(transforms.x, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      {
        start: (cb) => {
          interaction({ didPressIn: true, didSelect: true });
          cb({ finished: true });
        },
      },
      Animated.timing(backgroundOpacityValue, {
        toValue: 0.8,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 70,
      top: 25,
    },
    background: {
      alignItems: "center",
      paddingTop: 40,
      justifyContent: "space-around",
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      shadowColor: "grey",
      shadowOffset: { height: 1 },
      shadowOpacity: 0.2,
      borderRadius: 15,
      shadowRadius: 5,
      elevation: 2,
    },
  
    notesGift: {
      transform: [
        { scale: noteTransforms.shrink },
        { translateX: noteTransforms.x },
        { translateY: noteTransforms.y },
      ],
      opacity: noteTransforms.fade,
      width: 60,
      height: 70,
    },

    listenGift: {
      transform: [
        { scale: listenTransforms.shrink },
        { translateX: listenTransforms.x },
        { translateY: listenTransforms.y },
      ],
      opacity: listenTransforms.fade,
      width: 60,
      height: 70,
    },

    lookGift: {
      transform: [
        { scale: lookTransforms.shrink },
        { translateX: lookTransforms.x },
        { translateY: lookTransforms.y },
      ],
      opacity: lookTransforms.fade,
      width: 60,
      height: 70,
    },
    
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.background}>

          {NotesGift()}

          {ListenGift()}

          {LookGift()}
        </View>
      </View>
      
    </View>
  );
}

export default GiftSection;
