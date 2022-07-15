import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultLid from "./DefaultLid";

import AnimatedLottieView from "lottie-react-native";
import { colors } from "../../common/styles";

function BaseGift({
  iconName,
  timedDelay,
  isSelected,
  isPressedIn,
}) {
  const width = 70;
  const height = 60;
  const baseColor = colors.secondary
  const ribbonColor = colors.main
  const [playConfeti, setPlayConfeti] = useState(false);

  const shrinkValue = useRef(new Animated.Value(1)).current;
  const fadeIconValue = useRef(new Animated.Value(1)).current;
  const fadeGiftValue = useRef(new Animated.Value(1)).current;
  const fadeLidValue = useRef(new Animated.Value(1)).current;

  const shakeValue = useRef(new Animated.Value(1)).current;
  const shakeGiftValue = shakeValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  const iconSlideValue = useRef(new Animated.Value(0)).current;
  const iconPopValue = useRef(new Animated.Value(1)).current;

  const lidOpenValue = useRef(new Animated.Value(0)).current;
  const lidSlideValue = useRef(new Animated.Value(0)).current;
  const lidRotateValue = useRef(new Animated.Value(0)).current;
  const openLidValue = lidRotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "20deg"],
  });

  const ConfetiComponent = () => {
    if (playConfeti) {
      return (
        <AnimatedLottieView
          source={require("../../../assets/Confetti-Explode.json")}
          autoPlay
          loop={false}
          style={styles.confeti}
        />
      );
    }
  };

  const baseDesign = () => {
    if (iconName == "reader") {
      return <View style={styles.baseStripe} />;
    } else if (iconName == "image") {
      return (
        <View style={{ position: "absolute", left: 0 }}>
          <View style={[styles.diagnolStripe, { top: -25, left: 0 }]} />
          <View style={[styles.diagnolStripe, { top: -15, left: 25 }]} />
          <View style={[styles.diagnolStripe, { top: 5, left: 40 }]} />
        </View>
      );
    } else {
      return (
        <View style={{ position: "absolute", left: 0 }}>
          <View style={[styles.baseDot, { left: 3, top: 12 }]} />
          <View style={[styles.baseDot, { left: 24, top: -3 }]} />
          <View style={[styles.baseDot, { left: 60, top: 6 }]} />
          <View style={[styles.baseDot, { left: 63, top: 34 }]} />

          <View style={[styles.baseDot, { left: 5, top: 42 }]} />
          <View style={[styles.baseDot, { left: 32, top: 22 }]} />
          <View style={[styles.baseDot, { left: 40, top: 51 }]} />
        </View>
      );
    }
  };

  const openLidAnimation = () => {
    return Animated.sequence([
      Animated.timing(lidSlideValue, {
        toValue: 50,
        delay: 500,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(lidRotateValue, {
        toValue: 1,
        bounciness: 15,
        speed: 2,
        useNativeDriver: true,
      }),
    ]);
  };

  const closeLidAnimation = () => {
    return Animated.sequence([
      Animated.timing(lidRotateValue, {
        toValue: 0,
        bounciness: 15,
        speed: 2,
        useNativeDriver: true,
      }),
      Animated.timing(lidSlideValue, {
        toValue: 0,
        delay: 200,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);
  };

  const iconAnimation = () => {
    return Animated.sequence([
      Animated.timing(iconSlideValue, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(iconPopValue, {
        toValue: 1.5,
        delay: 100,
        bounciness: 20,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.spring(iconPopValue, {
        toValue: 1,
        bounciness: 10,
        speed: 20,
        useNativeDriver: true,
      }),
      Animated.timing(iconSlideValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);
  };

  const openAndShowAnimation = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.stagger(1000, [openLidAnimation(), iconAnimation()]),
        closeLidAnimation(),
      ]),
      { iterations: 1 }
    );
  };

  const shakeAnimation = (iterations) => {
    const duration = 40;
    return Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(shakeValue, {
          delay: 500,
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 2,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.spring(shakeValue, {
          toValue: 1,
          duration: duration,
          bounciness: 17,
          speed: 30,
          useNativeDriver: true,
        }),
        
      ]),
      
      { iterations: iterations }
    );
  };

  const continuousAnimation = () => {
    return Animated.sequence([
      Animated.delay(timedDelay),
      Animated.loop(
        Animated.sequence([
          shakeAnimation(2),
          openAndShowAnimation(),
          Animated.delay(20000),
        ])
      ),
    ]);
  };

  const revealAnimation = () => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(lidOpenValue, {
          duration: 1000,
          toValue: -250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeLidValue, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
      shakeAnimation(1),
      {
        start: (cb) => {
          setPlayConfeti(true);
          cb({ finished: true });
        },
      },
    ]);

  };
  
  const runSelectedAnimation = () => {
    Animated.sequence([
      revealAnimation(),
      Animated.timing(iconSlideValue, {
        delay: 500,
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(fadeGiftValue, {
          delay: 300,
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(iconPopValue, {
            toValue: 40,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeIconValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  };

  const resetAnimations = () => {
    //Shake Animation
    shakeValue.setValue(1);

    //Open and Show Animation
    iconSlideValue.setValue(0);
    iconPopValue.setValue(1);
    lidSlideValue.setValue(0);
    lidRotateValue.setValue(0);
  };

  useEffect(() => {
    if (isSelected) {
      continuousAnimation().stop();
      runSelectedAnimation()
    }
    if (!isPressedIn) {
      continuousAnimation().start();
    } else {
      resetAnimations();
      continuousAnimation().stop();
    }
  });
  const styles = StyleSheet.create({
    //Base Gift style
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      transform: [{ rotate: shakeGiftValue }, { scale: shrinkValue }],
    },
    baseContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      opacity: fadeGiftValue,
      overflow: "hidden",
    },
    baseSquare: {
      backgroundColor: baseColor,
      width: width,
      height: height,
      borderRadius: 5,
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottomColor: colors.shadow,
      borderBottomWidth: 3,
    },
    lid: {
      justifyContent: "flex-start",
      alignItems: "center",
      top: -70,
      transform: [
        { rotate: openLidValue },
        { translateX: lidSlideValue },
        { translateY: lidOpenValue },
      ],
      opacity: fadeLidValue,
    },
    //Different base design styles
    baseStripe: {
      width: 16,
      height: 60 - 2,
      backgroundColor: ribbonColor,
      position: "absolute",
    },
    diagnolStripe: {
      width: 9,
      height: 90,
      backgroundColor: ribbonColor,
      position: "absolute",
      transform: [{ rotate: "45deg" }],
    },
    baseDot: {
      width: 14,
      height: 14,
      borderRadius: 20,
      backgroundColor: ribbonColor,
      position: "absolute",
    },
    //Other
    icon: {
      position: "absolute",
      transform: [{ translateY: iconSlideValue }, { scale: iconPopValue }],
      justifyContent: "flex-start",
      opacity: fadeIconValue,
    },
    confeti: {
      transform: [{ scale: 2 }],
      top: -18,
    },
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={styles.container}>
        <Animated.View style={styles.icon}>
          <Ionicons name={iconName} size={35} color={baseColor} />
        </Animated.View>
        <Animated.View style={styles.baseContainer}>
          <View style={styles.baseSquare} />
          {baseDesign()}
        </Animated.View>
        {ConfetiComponent()}
        <Animated.View style={styles.lid}>
          <DefaultLid ribbonColor={ribbonColor} baseColor={baseColor} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default BaseGift;
