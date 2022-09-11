import { createContext, useEffect, useState } from "react";
import Check from "./app/components/Check";

import AppNavigator from "./app/AppNavigator";
import { AppContext } from './app/management/globals';
import { Text, View } from 'react-native'
import React from 'react'
import LoadSpinner from "./app/components/LoadSpinner";

const App = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [success, setSucces] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (success == true) {
      setTimeout(
        () => [setSucces(false)],
        2000
      );
    }
  }, [success])

  return (
    <AppContext.Provider value={{ signing: [isSigned, setIsSigned], successful: [success, setSucces], loading: [isLoading, setIsLoading] }}>
      <AppNavigator />
      {success == true ? <Check /> : null}
      {isLoading == true ? <LoadSpinner/> : null}
    </AppContext.Provider>
  );
};


export default App;
