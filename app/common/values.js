import {useState, useEffect} from "react"
import { Platform, Dimensions } from 'react-native'
import DatabaseManager from '../management/database-manager';

export const translateToValue = () => {
    const windowHeight = Dimensions.get("window").height;
    const headerHeight = 140;
    const topDistance = 15;
    const marginBottom = 145;
    const centerAlign = 2;
    const platformPadding = Platform.OS === "android" ? -28 : 0
    return (
      windowHeight - headerHeight - marginBottom + topDistance - centerAlign + platformPadding
    );
  };
