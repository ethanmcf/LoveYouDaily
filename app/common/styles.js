import { Platform, StatusBar } from "react-native";

export const colors = {
  main: "pink",
  secondary: "rgb(255, 102, 133)",
  background:"white",
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
  width: 300,
  height: 35,
  backgroundColor: colors.main,
  color: colors.background,
  borderRadius: 20,

  justifyContent: "center",
  alignItems: "center",
};

export const AndroidSafeAreaStyle = {
  flex:1,
  backgroundColor:colors.background,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
}
