import AppNavigator from "./app/AppNavigator";

import { createContext, useState } from "react";

import { AppContext } from "./app/management/globals";

function App() {
  const [isSigned, setIsSigned] = useState(false);
  return (
    <AppContext.Provider value={[isSigned, setIsSigned]}>
      <AppNavigator />
    </AppContext.Provider>
  );
}
export default App;
