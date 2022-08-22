import { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Creator/HomeScreen";
import LookScreen from "../screens/Creator/LookScreen";
import NotesScreen from "../screens/Creator/NotesScreen";
import ListenScreen from "../screens/Creator/ListenScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../common/styles";
import ProgressHeader from "./CreatorPages/ProgressHeader";
import HomeHeader from "./CreatorPages/HomeHeader";
import dbManager from "../management/database-manager";

const Tab = createBottomTabNavigator();

function TabBar(props) {
  const tabBarIcon = (icon, name, focused) => {
    const iconColor = focused ? colors.secondary : colors.main;
    return (
      <View style={[styles.tabBarIconContainer]}>
        <Ionicons name={icon} color={iconColor} size={30} />
        <Text style={styles.iconText}>{name}</Text>
        <View
          style={[
            { position: "absolute" },
            icon == "home" ? styles.divider : null,
          ]}
        />
      </View>
    );
  };

  const data = () => {
    dbManager.getContent("notesContent").then((data) => {
      return data
    })
  }
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 0,
      borderRadius: 15,
      height: 90,
      shadowColor: "grey",
      shadowOffset: { height: 5 },
      shadowOpacity: 0.3,
      elevation: 2,
    },
    tabBarIconContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 90,
      position: "absolute",
      top: 0,
    },
    iconText: {
      fontSize: 9,
      top: 3,
      color: colors.darkGrey,
      fontWeight: "bold",
    },
    divider: {
      width: 1,
      height: 60,
      backgroundColor: colors.shadow,
      right: -30,
      opacity: 0.6,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.container,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("home", "Home", focused),
          
          header: () => <HomeHeader />,
        }}
      />
      <Tab.Screen
        name="Look"
        component={LookScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("image", "Look", focused),
          tabBarHideOnKeyboard: true,
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Love Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("reader", "Love", focused),
          tabBarHideOnKeyboard: true,
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Listen"
        component={ListenScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabBarIcon("volume-low", "Listen", focused),
            tabBarHideOnKeyboard: true,
            headerShown:false
        }}
      />
    </Tab.Navigator>
  );
}

export default TabBar;
