import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import InfoItem from "./InfoItem";

function InfoList({ data, setIsSelected, setIndex }) {
  const [selected, setSelected] = useState(false);
  const [indexToAnimate, setIndexToAnimate] = useState(null);
  const itemOpacityAnim = useRef(new Animated.Value(1)).current;
  const itemTranslateAnim = useRef(new Animated.Value(0)).current;

  let animatedValues = [];
  data.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  const animate = () => {
    let animations = [];
    data.forEach((_, i) => {
      animations[i] = Animated.timing(animatedValues[i], {
        toValue: -400,
        duration: 500,
        useNativeDriver: true,
      });
    });

    Animated.sequence([
      Animated.stagger(75, animations),

      Animated.parallel([
        Animated.timing(itemTranslateAnim, {
          toValue: 200,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(itemOpacityAnim, {
          toValue: 0.05,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIndexToAnimate(null);
      setIsSelected(indexToAnimate);
    });
  };

  useEffect(() => {
    if (indexToAnimate != null) {
      animate();
    }
  }, [indexToAnimate]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 115,
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              key={index}
              style={{
                opacity: index == indexToAnimate ? itemOpacityAnim : 1,
                transform: [
                  {
                    translateX: index == indexToAnimate ? itemTranslateAnim : 0,
                  },
                  {
                    translateX:
                      index != indexToAnimate ? animatedValues[index] : 0,
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => [setSelected(true), setIndexToAnimate(index)]}
                disabled={selected}
              >
                <InfoItem title={item.title} completed={item.completed} />
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

export default InfoList;
