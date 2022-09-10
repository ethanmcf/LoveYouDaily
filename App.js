import { createContext, useEffect, useState } from "react";
import Check from "./app/components/Check";

import AppNavigator from "./app/AppNavigator";
import { AppContext } from './app/management/globals';
import { Text, View } from 'react-native'
import React from 'react'

const App = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [success, setSucces] = useState(false)

  useEffect(() => {
    if (success == true) {
      setTimeout(
        () => [setSucces(false)],
        2000
      );
    }
  }, [success])

  return (
    <AppContext.Provider value={{ signing: [isSigned, setIsSigned], successful: [success, setSucces] }}>
      <AppNavigator />
      {success == true ? <Check /> : null}
    </AppContext.Provider>
  );
};


export default App;
