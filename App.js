import AppNavigator from "./app/AppNavigator";
import Check from "./app/components/Check";
import { createContext, useEffect, useState } from "react";

import { AppContext } from "./app/management/globals";

function App() {
  const [isSigned, setIsSigned] = useState(false);
  const [success, setSucces] = useState(false)

  useEffect(()=>{
    if(success == true){
      setTimeout(
        () => [setSucces(false)],
        2000
      );
    } 
  }, [success])
  
  return (
    <AppContext.Provider value={ {signing: [isSigned, setIsSigned], successful: [success, setSucces]} }>
      <AppNavigator />
      {success == true ? <Check/> : null}
    </AppContext.Provider>
  );
}
export default App;
