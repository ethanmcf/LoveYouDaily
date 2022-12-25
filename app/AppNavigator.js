import { useState, useEffect, useContext} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./components/TabBar";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
// import UserScreen from "./screens/UserScreen";
// import UserHeader from "./components/UserPage/UserHeader";
import {firebase as auth} from "@react-native-firebase/auth";
import { AppContext} from "./management/globals";
import dbManager from "./management/database-manager";
import { Text } from 'react-native'
import React from 'react'
import LoadSpinner from './components/LoadSpinner';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);

  const { signing, saving, loading } = useContext(AppContext)
  const [isSigned, setIsSigned] = signing;
  const [isLoading, setIsLoading] = loading;

  const [userState, setUserState] = useState(null)

  const uid = () => {
    if(auth.auth().currentUser == null){
      return ""
    }
    return auth.auth().currentUser.uid
    
  }

  function onStateChange(){
    //Checks type of user or if there is a user and sets user state
    dbManager.isCreatorAccount(uid()).then(function (isCreator) {
      if(!auth.auth().currentUser){
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
  if (userState == null){
    return <LoadSpinner/>
  }

  //Navigates to user page if a user is signed in
  // if (userState === "user") {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen
  //           options={{
  //             header: () => <UserHeader />,
  //           }}
  //           name="User"
  //           component={UserScreen}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }


  // //Navigates to signing pages if no user is signed in
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