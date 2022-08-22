import { useState, useEffect, useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import TabBar from "./components/TabBar";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";
import UserHeader from "./components/UserPage/UserHeader";
import auth from "@react-native-firebase/auth";
import { AppContext} from "./management/globals";
import dbManager from "./management/database-manager";

function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);

  const [isSigned, setIsSigned] = useContext(AppContext)

  const [userState, setUserState] = useState("sign")

  const uid = () => {
    if(auth().currentUser == null){
      return ""
    }
    return auth().currentUser.uid
  }

  function onStateChange(){
    //Checks type of user or if there is a user and sets user state
    dbManager.isCreatorAccount(uid()).then(function (isCreator) {
      if(!auth().currentUser){
        setUserState("sign")
      }else if(isCreator){
        setUserState("creator")
      }else{
        setUserState("user")
      }
    })
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    onStateChange()
  }, [isSigned]);


  //Returns no components if connecting to firebase
  if (initializing) return null;

  //Navigates to user page if a user is signed in
  if (userState === "user") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              header: () => <UserHeader />,
            }}
            name="User"
            component={UserScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  //Navigates to signing pages if no user is signed in
  if (userState == "sign") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
            name="Sign In"
            component={SignInScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
            name="Sign Up"
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  //Navigates to creator pages if user is a creator
  if (userState === "creator") {
    return (
      <NavigationContainer>
        <TabBar />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
          name="Sign In"
          component={SignInScreen}
        />
      </NavigationContainer>
    );
  }
}
export default AppNavigator;
