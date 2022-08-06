import { Platform, StatusBar } from "react-native";

export const colors = {
  main: "pink",
  secondary: "rgb(255, 102, 133)",
  background: "white",
  red: "rgb(223, 0, 0)",
  shadow: "rgba(100,100,100,0.3)",
  grey: "rgb(200,200,200)",
  darkGrey: "rgb(160,160,160)",
};

export const shadow = {
  shadowColor: "grey",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.3,
  elevation: 2,
};

export const button = {
  // width: 300,
  // height: 35,
  backgroundColor: colors.main,
  color: colors.background,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
};

export const AndroidSafeAreaStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};

export const updaterViewStyle = {
  flex: 1,
  top: 15,
  backgroundColor: "white",
  marginLeft: 20,
  marginRight: 20,
  marginBottom: 145,
  borderRadius: 15,
  shadowColor: "grey",
  shadowOffset: { height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 2,
};

export const titleFont = {
  fontSize: 27,
  fontStyle: "italic",
  fontWeight: "bold",
  color: colors.secondary,
  opacity: 0.7,
}

